import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 text-xs text-[#717975]"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight size={12} className="text-[#c1c8c4]" />}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-[#2d6953] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-semibold text-[#00251d]" : ""}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
};