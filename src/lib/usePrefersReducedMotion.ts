"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    function syncPreference() {
      setPrefersReducedMotion(query.matches);
    }

    syncPreference();
    query.addEventListener("change", syncPreference);

    return () => {
      query.removeEventListener("change", syncPreference);
    };
  }, []);

  return prefersReducedMotion;
}
