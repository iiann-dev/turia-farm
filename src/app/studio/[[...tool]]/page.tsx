"use client";

import dynamic from "next/dynamic";
import { Studio } from "sanity";
import config from "../../../../sanity.config";

const StudioComponent = dynamic(() => import("sanity").then((mod) => mod.Studio), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-[#101014]">
      <div className="text-center text-white">
        <div className="w-12 h-12 border-4 border-[#2d6953] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#c4ebde]">Memuat Sanity Studio...</p>
      </div>
    </div>
  ),
});

export default function StudioPage() {
  return (
    <div className="sanity-studio-root min-h-screen w-full" style={{ height: "100vh", overflow: "hidden" }}>
      <StudioComponent config={config} />
    </div>
  );
}