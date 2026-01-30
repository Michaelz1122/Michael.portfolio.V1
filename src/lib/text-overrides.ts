export type TextOverrides = Record<string, string>;

const STORAGE_KEY = "portfolio-text-overrides";

export const getStoredOverrides = (): TextOverrides => {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed as TextOverrides;
    }
  } catch (error) {
    console.error("Failed to parse text overrides.", error);
  }

  return {};
};

export const setStoredOverrides = (overrides: TextOverrides) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  window.dispatchEvent(new Event("text-overrides-updated"));
};

export const updateStoredOverride = (key: string, value: string) => {
  const current = getStoredOverrides();
  if (value.trim().length === 0) {
    delete current[key];
  } else {
    current[key] = value;
  }
  setStoredOverrides(current);
};

export const clearStoredOverrides = () => {
  setStoredOverrides({});
};

export const applyTextOverrides = <T extends Record<string, unknown>>(
  base: T,
  overrides: TextOverrides,
) => {
  const updated = { ...base } as T;

  Object.entries(overrides).forEach(([key, value]) => {
    const arrayMatch = key.match(/^(.+)\[(\d+)\]$/);
    if (arrayMatch) {
      const [, arrayKey, index] = arrayMatch;
      const currentValue = updated[arrayKey as keyof T];
      if (Array.isArray(currentValue)) {
        const cloned = [...currentValue];
        cloned[Number(index)] = value;
        updated[arrayKey as keyof T] = cloned as T[keyof T];
      }
      return;
    }

    if (key in updated) {
      updated[key as keyof T] = value as T[keyof T];
    }
  });

  return updated;
};
