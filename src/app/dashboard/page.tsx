"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { translations } from "@/lib/translations";
import { inlineContent, useContentOverrides } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, ExternalLink, PencilLine, RefreshCcw, Search, Sparkles } from "lucide-react";

const isArrayValue = (value: string | string[]) => Array.isArray(value);

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const { overrides, updateOverride, clearOverride, resetOverrides } = useContentOverrides();

  const entries = useMemo(() => {
    const baseEntries = Object.entries({
      ...translations.en,
      ...inlineContent,
    });
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) {
      return baseEntries;
    }
    return baseEntries.filter(([key, value]) => {
      const valueText = Array.isArray(value) ? value.join(" ") : value;
      return (
        key.toLowerCase().includes(normalizedSearch) ||
        valueText.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-6 rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                <Sparkles className="h-3.5 w-3.5" />
                Live Content Studio
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white">Dashboard</h1>
              <p className="max-w-2xl text-sm text-slate-300">
                Control every English copy line instantly. Updates apply in real time to the live site and are stored locally
                for future visits.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild className="gap-2 rounded-full" variant="secondary">
                <Link href="/">
                  Open Website
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                className="gap-2 rounded-full border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                variant="outline"
                onClick={resetOverrides}
              >
                Reset All
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/60 px-3 py-1 text-xs text-slate-200">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
              Live edits enabled
            </div>
            <Badge variant="secondary" className="rounded-full bg-slate-800 text-slate-200">
              English only
            </Badge>
          </div>
        </header>

        <Card className="border-slate-800 bg-slate-900/70 text-slate-100 shadow-2xl">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Content Controls</CardTitle>
                <CardDescription className="text-slate-400">
                  Search for any copy key and edit it instantly. Click reset to restore the default value.
                </CardDescription>
              </div>
              <div className="relative w-full max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by key or text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="border-slate-800 bg-slate-950 pl-9 text-slate-100 focus-visible:ring-emerald-500"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-3">
              <div className="space-y-6">
                {entries.map(([key, defaultValue]) => {
                  const overrideValue = overrides[key];
                  const value = overrideValue ?? defaultValue;
                  const isArray = isArrayValue(defaultValue as string | string[]);
                  const displayValue = isArray ? (value as string[]).join("\n") : (value as string);

                  return (
                    <div key={key} className="space-y-3 rounded-2xl border border-slate-800/70 bg-slate-950/70 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm font-semibold text-white">
                            <PencilLine className="h-4 w-4 text-emerald-300" />
                            {key}
                          </div>
                          <p className="text-xs text-slate-400">Default: {isArray ? "List" : "Text"}</p>
                        </div>
                        <Button
                          variant="ghost"
                          className="h-8 rounded-full text-xs text-slate-200 hover:bg-slate-800"
                          onClick={() => clearOverride(key)}
                          disabled={overrideValue === undefined}
                        >
                          Restore default
                        </Button>
                      </div>
                      <Separator className="bg-slate-800" />
                      {isArray ? (
                        <Textarea
                          value={displayValue}
                          onChange={(event) =>
                            updateOverride(
                              key,
                              event.target.value
                                .split("\n")
                                .map((line) => line.trim())
                                .filter(Boolean)
                            )
                          }
                          className="min-h-[140px] border-slate-800 bg-slate-950 text-slate-100 focus-visible:ring-emerald-500"
                        />
                      ) : (
                        <Input
                          value={displayValue}
                          onChange={(event) => updateOverride(key, event.target.value)}
                          className="border-slate-800 bg-slate-950 text-slate-100 focus-visible:ring-emerald-500"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
import { translations } from "@/lib/translations";
import {
  clearStoredOverrides,
  getStoredOverrides,
  updateStoredOverride,
} from "@/lib/text-overrides";
import { useTextOverrides } from "@/hooks/useTextOverrides";

type TextEntry = {
  key: string;
  defaultValue: string;
  currentValue: string;
  isOverridden: boolean;
};

const buildEntries = (overrides: Record<string, string>) => {
  const list: TextEntry[] = [];

  Object.entries(translations.en).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const entryKey = `${key}[${index}]`;
        list.push({
          key: entryKey,
          defaultValue: item,
          currentValue: overrides[entryKey] ?? item,
          isOverridden: entryKey in overrides,
        });
      });
      return;
    }

    if (typeof value === "string") {
      list.push({
        key,
        defaultValue: value,
        currentValue: overrides[key] ?? value,
        isOverridden: key in overrides,
      });
    }
  });

  return list;
};

export default function DashboardPage() {
  const overrides = useTextOverrides();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    return () => {
      root.classList.remove("dark");
    };
  }, []);

  const entries = useMemo(() => buildEntries(overrides), [overrides]);
  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return entries;
    }
    return entries.filter((entry) =>
      [entry.key, entry.defaultValue, entry.currentValue].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [entries, searchQuery]);

  const appliedCount = useMemo(
    () => Object.keys(getStoredOverrides()).length,
    [overrides]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card/70 text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-card/60 p-8 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.65)] backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="secondary" className="w-fit">
                Text Control Center
              </Badge>
              <h1 className="text-3xl font-semibold tracking-tight">
                Website Copy Dashboard
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground">
                Edit any English text on your website and see changes applied
                instantly. Overrides are stored locally and can be reset at any
                time.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" className="border-white/20">
                <Link href="/">Back to website</Link>
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  clearStoredOverrides();
                }}
              >
                Reset all overrides
              </Button>
            </div>
          </div>
          <Separator className="bg-white/10" />
          <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Search text keys or phrases
              </label>
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by key or text..."
                className="h-11 rounded-xl border-white/10 bg-background/40"
              />
            </div>
            <Card className="border-white/10 bg-background/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Live status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Overrides applied</span>
                  <Badge variant="secondary">{appliedCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total editable strings</span>
                  <Badge variant="outline">{entries.length}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  English-only editing for now. Arabic copy remains unchanged.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <ScrollArea className="h-[70vh] rounded-3xl border border-white/10 bg-card/40 p-6">
          <div className="grid gap-4">
            {filteredEntries.map((entry) => (
              <Card
                key={entry.key}
                className="border-white/10 bg-background/40 shadow-none"
              >
                <CardHeader className="flex flex-row items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-sm font-semibold">
                      {entry.key}
                    </CardTitle>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Default: {entry.defaultValue}
                    </p>
                  </div>
                  {entry.isOverridden ? (
                    <Badge className="bg-emerald-500/20 text-emerald-200">
                      Live override
                    </Badge>
                  ) : (
                    <Badge variant="outline">Using default</Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    value={entry.currentValue}
                    onChange={(event) =>
                      updateStoredOverride(entry.key, event.target.value)
                    }
                    className="min-h-[90px] rounded-xl border-white/10 bg-background/40"
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground"
                      onClick={() => updateStoredOverride(entry.key, "")}
                    >
                      Reset field
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredEntries.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-muted-foreground">
                No matching text found. Try a different keyword.
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
