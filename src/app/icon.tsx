import { ImageResponse } from "next/og";

/**
 * Next.js 16 favicon icon route (served at /icon).
 * Returns a 32x32 PNG rendered from SVG data.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="32"
        height="32"
      >
        <circle cx="16" cy="16" r="16" fill="#00251d" />
        <path
          d="M9 18c0-4.5 3-8 7-9 1.2-.3 2.2.2 2.8 1 .5.7.5 1.6-.1 2.4-.5.6-1.4 1-2.3 1"
          fill="none"
          stroke="#a8c4b4"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M19 10v10M19 14h4"
          fill="none"
          stroke="#a8c4b4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 10c0 0 2.2-4 6-4.5"
          fill="none"
          stroke="#c4ebde"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M16 10c0 0-1-4-4.5-4.5"
          fill="none"
          stroke="#c4ebde"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M15 11c-3-1-5.5-4-5.5-4"
          fill="none"
          stroke="#c4ebde"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M17 10.5c2.5-.5 5-3 5-3"
          fill="none"
          stroke="#c4ebde"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M15.5 9c-.5-2.5-.5-4.5-.5-4.5"
          fill="none"
          stroke="#c4ebde"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    ),
    { ...size }
  );
}
