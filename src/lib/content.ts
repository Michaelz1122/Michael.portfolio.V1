"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { translations } from "@/lib/translations";

const STORAGE_KEY = "portfolio-content-overrides";

type ContentValue = string | string[];
export type ContentOverrides = Record<string, ContentValue>;

const readOverrides = (): ContentOverrides => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {};
    }
    const parsed = JSON.parse(stored) as ContentOverrides;
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  } catch (error) {
    console.warn("Unable to read content overrides", error);
  }

  return {};
};

const writeOverrides = (overrides: ContentOverrides) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
};

const notifyOverridesUpdated = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new Event("content-overrides"));
};

export const useContentOverrides = () => {
  const [overrides, setOverrides] = useState<ContentOverrides>(() => readOverrides());

  useEffect(() => {
    const handleUpdate = () => setOverrides(readOverrides());
    window.addEventListener("content-overrides", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("content-overrides", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const updateOverride = useCallback((key: string, value: ContentValue) => {
    setOverrides((prev) => {
      const next = { ...prev, [key]: value };
      writeOverrides(next);
      notifyOverridesUpdated();
      return next;
    });
  }, []);

  const clearOverride = useCallback((key: string) => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[key];
      writeOverrides(next);
      notifyOverridesUpdated();
      return next;
    });
  }, []);

  const resetOverrides = useCallback(() => {
    setOverrides({});
    writeOverrides({});
    notifyOverridesUpdated();
  }, []);

  return {
    overrides,
    updateOverride,
    clearOverride,
    resetOverrides,
  };
};

export const useContent = (lang: "en" | "ar") => {
  const { overrides } = useContentOverrides();

  const content = useMemo(() => {
    const base = translations[lang];
    if (lang !== "en") {
      return base;
    }
    return {
      ...base,
      ...overrides,
    } as typeof base;
  }, [lang, overrides]);

  return content;
};
