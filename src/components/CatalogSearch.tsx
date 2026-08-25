"use client";

import React from "react";
import { motion } from "framer-motion";
import { GooeyInput } from "@/components/ui/gooey-input";

export type CatalogCategory = "all" | "pisang" | "sengon";

interface CatalogSearchProps {
  query: string;
  onQueryChange: (value: string) => void;
  category: CatalogCategory;
  onCategoryChange: (value: CatalogCategory) => void;
  total: number;
  resultCount: number;
}

const CATEGORIES: { id: CatalogCategory; label: string; icon: string }[] = [
  { id: "all", label: "Semua", icon: "🌿" },
  { id: "pisang", label: "Pisang", icon: "🍌" },
  { id: "sengon", label: "Sengon", icon: "🌳" },
];

export const CatalogSearch: React.FC<CatalogSearchProps> = ({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  total,
  resultCount,
}) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Search input - left aligned on desktop, centered on mobile */}
      <div className="flex justify-center lg:justify-start">
        <GooeyInput
          placeholder="Cari bibit, misal: keripik, karpet, sengon..."
          value={query}
          onValueChange={onQueryChange}
          collapsedWidth={48}
          expandedWidth={300}
          expandedOffset={0}
        />
      </div>

      {/* Right cluster: category pills + result count */}
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center lg:justify-end">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "bg-[#00251d] text-[#faf9f3] shadow-sm"
                    : "bg-white text-[#414845] border border-[#c1c8c4]/60 hover:border-[#2d6953]/50 hover:text-[#00251d]"
                }`}
              >
                <span aria-hidden>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <motion.span
          key={resultCount}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-xs font-medium text-[#717975]"
        >
          {resultCount === total
            ? `Menampilkan ${total} bibit`
            : `${resultCount} dari ${total} bibit`}
        </motion.span>
      </div>
    </div>
  );
};
