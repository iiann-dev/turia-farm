"use client";

import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  type ChangeEvent,
} from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Stable filter ID to avoid SSR hydration mismatch
const FILTER_ID = "gooey-filter-search";

function GooeyFilter({ blur }: { blur: number }) {
  return (
    <svg className="absolute hidden h-0 w-0" aria-hidden>
      <defs>
        <filter id={FILTER_ID} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="size-4 shrink-0"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

const transition = {
  duration: 0.4,
  type: "spring" as const,
  bounce: 0.25,
};

const iconBubbleVariants = {
  collapsed: { x: 0, scale: 0, opacity: 0, y: "-50%" },
  expanded: { x: 50, scale: 1, opacity: 1, y: "-50%" },
};

export interface GooeyInputClassNames {
  root?: string;
  filterWrap?: string;
  buttonRow?: string;
  trigger?: string;
  input?: string;
  bubble?: string;
  bubbleSurface?: string;
}

export interface GooeyInputProps {
  placeholder?: string;
  className?: string;
  classNames?: GooeyInputClassNames;
  /** Collapsed control width in px */
  collapsedWidth?: number;
  /** Expanded control width in px */
  expandedWidth?: number;
  /** Horizontal offset when expanded (px), aligns detached bubble */
  expandedOffset?: number;
  /** Gaussian blur amount for the gooey SVG filter */
  gooeyBlur?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

export function GooeyInput({
  placeholder = "Type to search...",
  className,
  classNames,
  collapsedWidth = 115,
  expandedWidth = 200,
  expandedOffset = 50,
  gooeyBlur = 5,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onOpenChange,
  disabled = false,
}: GooeyInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const prevExpandedRef = useRef(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [isClient, setIsClient] = useState(false);

  const isControlled = valueProp !== undefined;
  const searchText = isControlled ? valueProp : uncontrolledValue;

  const setSearchText = useCallback(
    (next: string) => {
      if (!isControlled) {
        setUncontrolledValue(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const setExpanded = useCallback(
    (next: boolean) => {
      setIsExpanded(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  // Mark client-side hydration complete
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isExpanded && isClient) {
      inputRef.current?.focus();
    } else if (prevExpandedRef.current && !searchText) {
      setSearchText("");
    }
    prevExpandedRef.current = isExpanded;
  }, [isExpanded, isClient, searchText, setSearchText]);

  const buttonVariants = useMemo(
    () => ({
      collapsed: { width: collapsedWidth, marginLeft: 0 },
      expanded: { width: expandedWidth, marginLeft: expandedOffset },
    }),
    [collapsedWidth, expandedWidth, expandedOffset],
  );

  const handleExpand = useCallback(() => {
    if (!disabled) setExpanded(true);
  }, [disabled, setExpanded]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    [setSearchText],
  );

  const handleBlur = useCallback(() => {
    if (!searchText) setExpanded(false);
  }, [searchText, setExpanded]);

  const surfaceClass =
    "bg-foreground text-background shadow-sm ring-1 ring-border/60";

  // Don't render the gooey filter wrapper until client-side to avoid SSR mismatch
  if (!isClient) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center",
          className,
          classNames?.root,
        )}
      >
        <div className="relative flex h-10 items-center justify-center">
          <div className="flex h-10 items-center justify-center" style={{ width: collapsedWidth }}>
            <button
              type="button"
              disabled={disabled}
              onClick={handleExpand}
              className={cn(
                "flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 text-sm font-medium outline-none transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
                surfaceClass,
                classNames?.trigger,
              )}
            >
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        className,
        classNames?.root,
      )}
    >
      <GooeyFilter blur={gooeyBlur} />

      <div
        className={cn(
          "relative flex h-10 items-center justify-center",
          classNames?.filterWrap,
        )}
        style={{ filter: `url(#${FILTER_ID})` }}
      >
        <motion.div
          className={cn("flex h-10 items-center justify-center", classNames?.buttonRow)}
          variants={buttonVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          transition={transition}
        >
          {/* Trigger button - separate from input wrapper */}
          <button
            type="button"
            disabled={disabled}
            onClick={handleExpand}
            className={cn(
              "flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 text-sm font-medium outline-none transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
              surfaceClass,
              classNames?.trigger,
            )}
          >
            <SearchIcon />
          </button>

          {/* Input wrapper - separate from button, positioned absolutely when expanded */}
          <div
            className={cn(
              "absolute left-0 top-0 h-10 w-full items-center justify-center px-4",
              classNames?.input,
            )}
            style={{
              width: isExpanded ? expandedWidth : collapsedWidth,
              marginLeft: isExpanded ? expandedOffset : 0,
              transition: "width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), margin-left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <input
              ref={inputRef}
              type="search"
              enterKeyHint="search"
              autoComplete="off"
              value={searchText}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  handleBlur();
                  (e.target as HTMLInputElement).blur();
                }
              }}
              disabled={disabled || !isExpanded}
              placeholder={placeholder}
              className={cn(
                "h-full w-full bg-transparent text-sm text-background outline-none",
                isExpanded
                  ? "placeholder:text-background/50 dark:placeholder:text-background/45"
                  : "pointer-events-none opacity-0 placeholder:text-background/80 dark:placeholder:text-background/70",
                classNames?.input,
              )}
            />
          </div>
        </motion.div>

        <motion.div
          className={cn(
            "absolute top-1/2 left-0 flex size-10 -translate-y-1/2 items-center justify-center",
            classNames?.bubble,
          )}
          variants={iconBubbleVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          transition={transition}
        >
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-full",
              surfaceClass,
              classNames?.bubbleSurface,
            )}
          >
            <SearchIcon />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
