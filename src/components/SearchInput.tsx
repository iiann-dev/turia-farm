"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Command, Keyboard } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  resultCount?: number;
  totalCount?: number;
  isSearching?: boolean;
  className?: string;
  "aria-label"?: string;
}

const SHORTCUT_KEY = "k";
const SHORTCUT_MODIFIER = "meta"; // ⌘ on Mac, Ctrl on Windows

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = "Cari varietas...",
  resultCount,
  totalCount,
  isSearching = false,
  className = "",
  "aria-label": ariaLabel = "Cari varietas bibit",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showShortcut, setShowShortcut] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Handle keyboard shortcut (⌘K / Ctrl+K) to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === SHORTCUT_KEY &&
        !e.shiftKey &&
        !e.altKey
      ) {
        // Don't intercept if user is typing in another input
        const active = document.activeElement;
        if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) {
          if (active === inputRef.current) return; // Already focused
        }
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Show shortcut hint after a delay on first visit
  useEffect(() => {
    const timer = setTimeout(() => setShowShortcut(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    setHasInteracted(true);
    setShowShortcut(false); // Hide hint once focused
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setHasInteracted(true);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClear();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onClear();
      inputRef.current?.blur();
    }
  };

  const isFilled = value.length > 0;
  const hasResults = resultCount !== undefined && resultCount > 0;
  const noResults = resultCount !== undefined && resultCount === 0 && isFilled;

  return (
    <motion.div
      ref={containerRef}
      className={`relative w-full max-w-xl mx-auto ${className}`}
      whileHover={{ scale: isFocused ? 1 : 1.005 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Outer glow ring - appears on focus */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-[-3px] rounded-[1.25rem] bg-gradient-to-r from-[#2d6953]/30 via-[#2d6953]/10 to-[#2d6953]/30 blur-[24px] -z-10 pointer-events-none"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Main input container - glass morphic */}
      <div
        className={`
          relative flex items-center gap-3
          rounded-2xl
          bg-white/80 backdrop-blur-xl
          border-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          shadow-[0_2px_8px_-2px_rgba(0,37,29,0.08),0_0_0_1px_rgba(193,200,196,0.4)]
          ${isFocused
            ? "border-[#2d6953]/60 shadow-[0_0_0_3px_rgba(45,105,83,0.15),0_8px_32px_-8px_rgba(0,37,29,0.12)]"
            : isFilled
            ? "border-[#c1c8c4]/80 hover:border-[#2d6953]/40"
            : "border-[#c1c8c4]/60 hover:border-[#c1c8c4]/80"
          }
        `}
      >
        {/* Leading: Search Icon */}
        <div
          className={`
            absolute left-4 flex items-center justify-center
            transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isFocused ? "text-[#2d6953]" : isFilled ? "text-[#414845]" : "text-[#717975]"}
          `}
          aria-hidden="true"
        >
          <motion.div
            initial={false}
            animate={{
              scale: isFocused ? 1.1 : 1,
              rotate: isFocused ? 3 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Search size={20} strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`
            flex-1 w-full pl-12 pr-12 py-3.5
            bg-transparent
            text-[#00251d] placeholder:text-[#a8cfc2]
            text-sm sm:text-base
            font-[var(--font-sans)]
            outline-none
            selection:bg-[#2d6953]/30
            [&::-webkit-search-cancel-button]:appearance-none
            [&::-webkit-search-cancel-button]:display-none
          `}
          aria-label={ariaLabel}
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={isFilled}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />

        {/* Trailing: Loading spinner or Clear button */}
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-4 flex items-center justify-center text-[#2d6953]"
              aria-live="polite"
              aria-atomic="true"
            >
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </motion.div>
          ) : isFilled ? (
            <motion.button
              key="clear"
              type="button"
              onClick={handleClear}
              initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7, rotate: 15 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 flex items-center justify-center w-8 h-8 rounded-xl text-[#717975] hover:text-[#00251d] hover:bg-[#efeee8] transition-colors duration-150"
              aria-label="Hapus pencarian"
            >
              <X size={18} strokeWidth={2.5} />
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Bottom row: Result badge + Shortcut hint */}
      <AnimatePresence>
        {(hasResults || noResults || showShortcut) && (
          <motion.div
            initial={{ opacity: 0, y: 6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between mt-3 px-1"
          >
            {/* Result count badge */}
            {(hasResults || noResults) && (
              <motion.span
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`
                  inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                  transition-colors duration-200
                  ${noResults
                    ? "bg-red-50 text-red-600 border border-red-100"
                    : "bg-[#c4ebde]/80 text-[#00251d] border border-[#a8cfc2]/60"
                  }
                `}
                aria-live="polite"
                aria-atomic="true"
              >
                {noResults ? (
                  <>
                    <span className="relative top-[1px]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                    </span>
                    Tidak ditemukan &ldquo;{value}&rdquo;
                  </>
                ) : (
                  <>
                    <span className="relative top-[1px]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    {resultCount} dari {totalCount} varietas
                  </>
                )}
              </motion.span>
            )}

            {/* Keyboard shortcut hint */}
            {showShortcut && !isFocused && !hasInteracted && (
              <motion.kbd
                key="shortcut"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className={`
                  inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg
                  bg-[#e3e3dd]/60 text-[#717975] text-[11px] font-medium
                  border border-[#c1c8c4]/40
                  backdrop-blur-sm
                `}
                aria-hidden="true"
              >
                <Command size={11} className="opacity-60" />
                <span>Cari cepat</span>
              </motion.kbd>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen reader only announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {isSearching && "Sedang mencari..."}
        {noResults && `Tidak ditemukan varietas untuk ${value}`}
        {hasResults && `Menampilkan ${resultCount} dari ${totalCount} varietas`}
      </div>
    </motion.div>
  );
};

// Helper component for sr-only
const srOnlyStyles = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};