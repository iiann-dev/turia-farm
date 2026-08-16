import React from "react";

export const BananaLogo: React.FC<{ className?: string; size?: number }> = ({
  className = "w-10 h-10",
  size = 40,
}) => {
  return (
    <div
      className={`rounded-full bg-[#00251d] text-[#c4ebde] flex items-center justify-center shadow-xs border border-[#2d6953]/30 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3/5 h-3/5 text-[#c4ebde]"
      >
        {/* Main curved banana leaf / seedling sprout */}
        <path
          d="M16 28V12C16 12 16 6 23 4C23 10 20 18 16 20"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Secondary left leaf */}
        <path
          d="M16 17C16 17 11 12 9 8C14 8 16 13 16 17Z"
          fill="#b1f0d4"
          fillOpacity="0.85"
        />
        {/* Main leaf blade */}
        <path
          d="M16 12C16 12 21 7 24 5C24 11 20 17 16 19"
          fill="#c4ebde"
          fillOpacity="0.4"
        />
        {/* Soil base line */}
        <path
          d="M10 28C13 27.5 19 27.5 22 28"
          stroke="#80a599"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
