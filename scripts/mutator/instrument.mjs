import { createHash } from "node:crypto";
import { parseSync } from "oxc-parser";

const BINARY_MUTATIONS = {
  "+": ["-"],
  "-": ["+"],
  "*": ["/"],
  "/": ["*"],
  "**": ["*"],
  "%": ["*"],
  "===": ["!=="],
  "!==": ["==="],
  "==": ["!="],
  "!=": ["=="],
  "<": ["<=", ">="],
  "<=": ["<", ">"],
  ">": [">=", "<="],
  ">=": [">", "<"],
};

const LOGICAL_MUTATIONS = {
  "&&": ["||"],
  "||": ["&&"],
  "??": ["||"],
};

const REACT_HOOKS_WITH_DEPS = new Set([
  "useEffect",
  "useLayoutEffect",
  "useCallback",
  "useMemo",
]);

function sha256(text) {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}

function buildLineStarts(code) {
  const starts = [0];
  for (let i = 0; i < code.length; i++) {
    if (code.charCodeAt(i) === 10) {
      starts.push(i + 1);
    }
  }
  return starts;
}

function offsetToLineCol(lineStarts, offset) {
  let lo = 0;
  let hi = lineStarts.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (lineStarts[mid] <= offset) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  const lineIdx = Math.max(0, lo - 1);
  return { line: lineIdx + 1, column: offset - lineStarts[lineIdx] + 1 };
}

function isAstNode(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.type === "string" &&
    typeof value.start === "number" &&
    typeof value.end === "number"
  );
}

function getFunctionScopeName(node, parent) {
  if (node.id?.name) return node.id.name;
  if (parent?.type === "VariableDeclarator" && parent.id?.name) return parent.id.name;
  if (parent?.type === "Property" && parent.key?.name) return parent.key.name;
  if (parent?.type === "MethodDefinition" && parent.key?.name) return parent.key.name;
  return "anonymous";
}

function isFunctionNode(node) {
  return (
    node.type === "FunctionDeclaration" ||
    node.type === "FunctionExpression" ||
    node.type === "ArrowFunctionExpression"
  );
}

function isReactHookDepsArray(node, parent) {
  if (node.type !== "ArrayExpression" || parent?.type !== "CallExpression") {
    return false;
  }
  const args = parent.arguments;
  if (!Array.isArray(args) || args[args.length - 1] !== node) {
    return false;
  }
  const callee = parent.callee;
  if (callee?.type === "Identifier" && REACT_HOOKS_WITH_DEPS.has(callee.name)) {
    return true;
  }
  if (
    callee?.type === "MemberExpression" &&
    !callee.computed &&
    callee.property?.type === "Identifier" &&
    REACT_HOOKS_WITH_DEPS.has(callee.property.name)
  ) {
    return true;
  }
  return false;
}

/**
 * Pure oxc-based mutation switcher (extracted from mizchi/mutator concept):
 * - Parses once with oxc-parser
 * - Assigns position-independent mutant identity (file + scopePath + fnHash + astPath + mutator + replacement)
 * - Compiles all mutants into the module once via bottom-up span stitching
 */
export function instrumentFile(relPath, code, startId = 1) {
  const { program, errors } = parseSync(relPath, code, {
    sourceType: "module",
    lang: relPath.endsWith(".tsx") ? "tsx" : "ts",
  });
  if (errors.length > 0) {
    throw new Error(`Failed to parse ${relPath}: ${errors[0].message}`);
  }

  const lineStarts = buildLineStarts(code);
  const mutants = [];
  let nextId = startId;

  function registerMutant(node, mutator, replacement, scopeStack, astPath) {
    const id = nextId++;
    const loc = offsetToLineCol(lineStarts, node.start);
    const scope = scopeStack[scopeStack.length - 1];
    const original = code.slice(node.start, node.end);
    const identity = sha256(
      `${relPath}::${scope.path}::${scope.hash}::${astPath}::${mutator}::${replacement}`,
    );
    mutants.push({
      id,
      identity,
      file: relPath,
      line: loc.line,
      column: loc.column,
      scopePath: scope.path,
      fnHash: scope.hash,
      mutator,
      original,
      replacement,
    });
    return { id, replacement };
  }

  /**
   * Recursively transform a node's span into instrumented code.
   * Child mutations are embedded inside the "original" branch while mutant alternatives
   * use clean unmutated child text, guaranteeing single-mutant isolation.
   */
  function visit(node, parent, propKey, scopeStack, astPath) {
    // Skip TypeScript type-only syntax and module import/export specifiers
    if (
      node.type.startsWith("TS") ||
      node.type === "ImportDeclaration" ||
      node.type === "ExportAllDeclaration"
    ) {
      return code.slice(node.start, node.end);
    }

    // Track enclosing function scope & content hash for function-level cache reuse
    let nextScopeStack = scopeStack;
    if (isFunctionNode(node)) {
      const fnName = getFunctionScopeName(node, parent);
      const prevScope = scopeStack[scopeStack.length - 1];
      const fnSource = code.slice(node.start, node.end);
      nextScopeStack = [
        ...scopeStack,
        { path: `${prevScope.path}>${fnName}`, hash: sha256(fnSource) },
      ];
    }

    // Collect direct AST child spans in source order
    const childEntries = [];
    for (const [key, value] of Object.entries(node)) {
      if (key === "type" || key === "start" || key === "end") continue;
      // Never mutate non-expression identifier/key positions or export source literals
      if (node.type === "ExportNamedDeclaration" && key === "source") continue;
      if (node.type === "Property" && key === "key" && !node.computed) continue;
      if (node.type === "MethodDefinition" && key === "key" && !node.computed) continue;
      if (node.type === "PropertyDefinition" && key === "key" && !node.computed) continue;
      if (node.type === "MemberExpression" && key === "property" && !node.computed) continue;
      if (node.type === "SwitchCase" && key === "test") continue;

      if (isAstNode(value)) {
        childEntries.push({ key, child: value, subPath: `${astPath}.${key}` });
      } else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          if (isAstNode(value[i])) {
            childEntries.push({ key, child: value[i], subPath: `${astPath}.${key}[${i}]` });
          }
        }
      }
    }

    childEntries.sort((a, b) => a.child.start - b.child.start);

    // Build instrumented version of this node by stitching transformed child spans
    let cursor = node.start;
    let stitched = "";
    for (const entry of childEntries) {
      if (entry.child.start < cursor) continue; // Defensive against overlapping synthetic spans
      stitched += code.slice(cursor, entry.child.start);

      // Special case: IfStatement test condition gets mutated directly in place
      if (node.type === "IfStatement" && entry.key === "test") {
        const innerOrig = visit(entry.child, node, entry.key, nextScopeStack, entry.subPath);
        const mTrue = registerMutant(
          entry.child,
          "ConditionalExpression",
          "true",
          nextScopeStack,
          `${entry.subPath}#if-true`,
        );
        const mFalse = registerMutant(
          entry.child,
          "ConditionalExpression",
          "false",
          nextScopeStack,
          `${entry.subPath}#if-false`,
        );
        stitched += wrapSwitch([mTrue, mFalse], innerOrig);
      } else {
        stitched += visit(entry.child, node, entry.key, nextScopeStack, entry.subPath);
      }
      cursor = entry.child.end;
    }
    stitched += code.slice(cursor, node.end);

    // Check if this node itself is a mutable expression
    const nodeMutants = createNodeMutants(node, parent, propKey, nextScopeStack, astPath);
    if (nodeMutants.length === 0) {
      return stitched;
    }
    return wrapSwitch(nodeMutants, stitched);
  }

  function createNodeMutants(node, parent, propKey, scopeStack, astPath) {
    // Do not wrap left-hand side of assignments or update expressions
    if (
      (parent?.type === "AssignmentExpression" && propKey === "left") ||
      parent?.type === "UpdateExpression" ||
      (parent?.type === "VariableDeclarator" && propKey === "id")
    ) {
      return [];
    }

    const result = [];

    if (node.type === "BinaryExpression") {
      const replacements = BINARY_MUTATIONS[node.operator];
      if (replacements) {
        const leftSrc = code.slice(node.left.start, node.left.end);
        const rightSrc = code.slice(node.right.start, node.right.end);
        for (const op of replacements) {
          result.push(
            registerMutant(
              node,
              "BinaryOperator",
              `(${leftSrc} ${op} ${rightSrc})`,
              scopeStack,
              `${astPath}#bin:${op}`,
            ),
          );
        }
      }
    } else if (node.type === "LogicalExpression") {
      const replacements = LOGICAL_MUTATIONS[node.operator];
      if (replacements) {
        const leftSrc = code.slice(node.left.start, node.left.end);
        const rightSrc = code.slice(node.right.start, node.right.end);
        for (const op of replacements) {
          result.push(
            registerMutant(
              node,
              "LogicalOperator",
              `(${leftSrc} ${op} ${rightSrc})`,
              scopeStack,
              `${astPath}#log:${op}`,
            ),
          );
        }
      }
    } else if (node.type === "UnaryExpression" && node.operator === "!") {
      const argSrc = code.slice(node.argument.start, node.argument.end);
      result.push(
        registerMutant(
          node,
          "UnaryOperator",
          `(${argSrc})`,
          scopeStack,
          `${astPath}#un:not`,
        ),
      );
    } else if (node.type === "Literal" && typeof node.value === "boolean") {
      const flipped = node.value ? "false" : "true";
      result.push(
        registerMutant(node, "BooleanLiteral", flipped, scopeStack, `${astPath}#bool:${flipped}`),
      );
    } else if (node.type === "Literal" && typeof node.value === "string") {
      // Skip object property keys and template-like directives
      if (parent?.type === "ExpressionStatement") return [];
      const replacement = node.value === "" ? '"__mutated__"' : '""';
      result.push(
        registerMutant(node, "StringLiteral", replacement, scopeStack, `${astPath}#str`),
      );
    } else if (node.type === "ConditionalExpression") {
      const consSrc = code.slice(node.consequent.start, node.consequent.end);
      const altSrc = code.slice(node.alternate.start, node.alternate.end);
      result.push(
        registerMutant(
          node,
          "ConditionalExpression",
          `(${consSrc})`,
          scopeStack,
          `${astPath}#tern:true`,
        ),
      );
      result.push(
        registerMutant(
          node,
          "ConditionalExpression",
          `(${altSrc})`,
          scopeStack,
          `${astPath}#tern:false`,
        ),
      );
    } else if (node.type === "ArrayExpression" && !isReactHookDepsArray(node, parent)) {
      const replacement = node.elements.length === 0 ? '["__mutated__"]' : "[]";
      result.push(
        registerMutant(node, "ArrayDeclaration", replacement, scopeStack, `${astPath}#arr`),
      );
    }

    return result;
  }

  function wrapSwitch(nodeMutants, origExpr) {
    const ids = nodeMutants.map((m) => m.id).join(",");
    const branches = nodeMutants
      .map((m) => `globalThis.__MUTATOR__?.a===${m.id}?(${m.replacement})`)
      .join(":");
    return `(globalThis.__MUTATOR__?.c(${ids}),${branches}:(${origExpr}))`;
  }

  const rootScope = [{ path: "<module>", hash: sha256(code) }];
  const instrumentedCode = visit(program, null, "program", rootScope, "P");

  return {
    code: instrumentedCode,
    mutants,
    nextId,
  };
}
