"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function BackgroundPattern() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only render after component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const isDark = theme === "dark" || resolvedTheme === "dark";
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{
        backgroundImage: isDark 
          ? "radial-gradient(rgba(255, 255, 255, 0.05) 2px, transparent 2px)"
          : "radial-gradient(rgba(0, 0, 0, 0.05) 2px, transparent 2px)",
        backgroundSize: "24px 24px"
      }}
    />
  );
}