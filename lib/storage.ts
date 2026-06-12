"use client";

export function readList(key: string) {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function toggleListValue(key: string, value: string) {
  const current = readList(key);
  const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
  window.localStorage.setItem(key, JSON.stringify(next));
  window.dispatchEvent(new Event(`${key}:updated`));
  return next;
}

export function writeRecentProduct(slug: string) {
  if (typeof window === "undefined") return;
  const current = readList("recent-products").filter((item) => item !== slug);
  window.localStorage.setItem("recent-products", JSON.stringify([slug, ...current].slice(0, 6)));
  window.dispatchEvent(new Event("recent-products:updated"));
}
