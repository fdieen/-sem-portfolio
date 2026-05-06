"use client";

import dynamic from "next/dynamic";

const StarField = dynamic(() => import("./StarField"), { ssr: false });

export default function StarFieldWrapper() {
  return <StarField />;
}
