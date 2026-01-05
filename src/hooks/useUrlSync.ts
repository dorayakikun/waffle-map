/**
 * Hook for bidirectional URL synchronization with meshcodes state.
 *
 * This hook provides:
 * - State -> URL sync: Updates URL when meshcodes change
 * - URL -> State sync: Updates state when browser back/forward is used
 */

import { useEffect, useRef } from "react";
import { useMeshcodesInputStore } from "../stores/useMeshcodesInputStore";
import { generateMeshcodesUrl, parseMeshcodesFromUrl } from "../utils/meshcodeUrl";
import type { Separator } from "../types";

/**
 * Enables bidirectional synchronization between the meshcodes store and the URL.
 *
 * Call this hook at the top level of your app (e.g., in AppContainer).
 */
export function useUrlSync(): void {
  const meshcodes = useMeshcodesInputStore((state) => state.meshcodes);
  const separator = useMeshcodesInputStore((state) => state.separator);

  // Flag to prevent infinite loops when updating from URL
  const isUpdatingFromUrl = useRef(false);
  // Track the previous URL to avoid unnecessary updates
  const previousUrl = useRef(window.location.pathname);

  // State -> URL sync
  useEffect(() => {
    // Skip if we're currently processing a URL change
    if (isUpdatingFromUrl.current) {
      isUpdatingFromUrl.current = false;
      return;
    }

    const newUrl = generateMeshcodesUrl(meshcodes, separator);

    // Only update URL if it actually changed
    if (newUrl !== window.location.pathname) {
      window.history.replaceState(null, "", newUrl);
      previousUrl.current = newUrl;
    }
  }, [meshcodes, separator]);

  // URL -> State sync (for browser back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const currentPath = window.location.pathname;

      // Only process if URL actually changed
      if (currentPath === previousUrl.current) {
        return;
      }

      isUpdatingFromUrl.current = true;
      previousUrl.current = currentPath;

      const { meshcodes: parsedMeshcodes, separator: parsedSeparator } =
        parseMeshcodesFromUrl(currentPath);

      useMeshcodesInputStore.getState().setMeshcodesFromUrl(
        parsedMeshcodes,
        parsedSeparator as Separator,
      );
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
}
