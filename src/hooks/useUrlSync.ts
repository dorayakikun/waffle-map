import { useEffect, useRef } from "react";
import { useMeshcodesInputStore } from "../stores/useMeshcodesInputStore";
import { generateMeshcodesUrl, parseMeshcodesFromUrl } from "../utils/meshcodeUrl";

export function useUrlSync(): void {
  const meshcodes = useMeshcodesInputStore((state) => state.meshcodes);
  const separator = useMeshcodesInputStore((state) => state.separator);

  const isUpdatingFromUrl = useRef(false);

  const previousUrl = useRef(window.location.pathname);

  useEffect(() => {
    if (isUpdatingFromUrl.current) {
      isUpdatingFromUrl.current = false;
      return;
    }

    const newUrl = generateMeshcodesUrl(meshcodes, separator);

    if (newUrl !== window.location.pathname) {
      window.history.replaceState(null, "", newUrl);
      previousUrl.current = newUrl;
    }
  }, [meshcodes, separator]);

  useEffect(() => {
    const handlePopState = () => {
      const currentPath = window.location.pathname;

      if (currentPath === previousUrl.current) {
        return;
      }

      isUpdatingFromUrl.current = true;
      previousUrl.current = currentPath;

      const { meshcodes: parsedMeshcodes, separator: parsedSeparator } =
        parseMeshcodesFromUrl(currentPath);

      useMeshcodesInputStore.getState().setMeshcodesFromUrl(parsedMeshcodes, parsedSeparator);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
}
