import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import hypothetical from 'rollup-plugin-hypothetical'

const env = process.env.NODE_ENV

export default {
  entry: 'src/index.js',
  dest: 'public/bundle.js',
  format: 'iife',
  plugins: [
    nodeResolve(),
    replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
    hypothetical({
      allowRealFiles: true,
      files: {
        'node_modules/core-js/library/modules/es6.object.to-string.js':
          'export default null'
      }
    }),
    commonjs({
      namedExports: {
        'node_modules/react/react.js': [
          'Children',
          'Component',
          'isValidElement',
          'cloneElement',
          'createElement'
        ]
      }
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    env === 'production' && uglify()
  ]
}
