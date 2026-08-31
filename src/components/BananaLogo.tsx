import React from "react";

interface BananaLogoProps {
  className?: string;
  size?: number;
  /** Background color for the circular badge (default deep green #00251d). */
  bg?: string;
  /**
   * When true, uses the transparent-background logo asset so the container's
   * `bg` colour shows through the badge — lets the logo blend seamlessly into
   * a matching footer/navbar surface instead of showing its own baked-in bg.
   */
  transparent?: boolean;
}

export const BananaLogo: React.FC<BananaLogoProps> = ({
  className = "w-10 h-10",
  size = 40,
  bg = "#00251d",
  transparent = false,
}) => {
  return (
    <div
      className={`rounded-full overflow-hidden flex items-center justify-center shadow-xs ${className}`}
      style={{ width: size, height: size, backgroundColor: bg }}
    >
      <img
        src={transparent ? "/logo-transparent.png" : "/logo.png"}
        alt="Turia Farm logo"
        className="w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
};
