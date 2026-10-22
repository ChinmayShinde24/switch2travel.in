"use client"

import { useState } from "react"
import { CategoriesPanel } from "@/components/admin/categories-panel"
import { CitiesPanel } from "@/components/admin/cities-panel"
import { cn } from "@/lib/utils"

type TaxonomyTab = "categories" | "cities"

export function TaxonomyPanel() {
  const [tab, setTab] = useState<TaxonomyTab>("categories")

  return (
    <div>
      <div className="page-padding-x mx-auto mb-1 w-full max-w-4xl px-0">
        <div className="inline-flex rounded-2xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
          <button
            type="button"
            onClick={() => setTab("categories")}
            className={cn(
              "font-display rounded-xl px-4 py-2 text-sm font-medium transition-colors",
              tab === "categories"
                ? "bg-sky-600 text-white"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            Categories
          </button>
          <button
            type="button"
            onClick={() => setTab("cities")}
            className={cn(
              "font-display rounded-xl px-4 py-2 text-sm font-medium transition-colors",
              tab === "cities"
                ? "bg-sky-600 text-white"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            Cities
          </button>
        </div>
      </div>

      {tab === "categories" ? <CategoriesPanel /> : <CitiesPanel />}
    </div>
  )
}
