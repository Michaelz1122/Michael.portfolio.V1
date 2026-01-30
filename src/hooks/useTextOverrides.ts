"use client";

import { useEffect, useState } from "react";
import { getStoredOverrides, type TextOverrides } from "@/lib/text-overrides";

export const useTextOverrides = () => {
  const [overrides, setOverrides] = useState<TextOverrides>({});

  useEffect(() => {
    const updateOverrides = () => {
      setOverrides(getStoredOverrides());
    };

    updateOverrides();

    window.addEventListener("text-overrides-updated", updateOverrides);
    window.addEventListener("storage", updateOverrides);

    return () => {
      window.removeEventListener("text-overrides-updated", updateOverrides);
      window.removeEventListener("storage", updateOverrides);
    };
  }, []);

  return overrides;
};
