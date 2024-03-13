"use client";

import { SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { BsMoon } from "react-icons/bs";


const ThemeButton = () => {
  const {  setTheme,theme,resolvedTheme } = useTheme();

console.log({theme:theme==="dark"})
  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex items-center justify-center rounded-lg p-2 transition-colors "
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        // <SunIcon className="h-5 w-5 text-white" />
        <span>Sun</span>
      ) : (
        <BsMoon className="h-5 w-5 text-slate-800" />
      )}
    </button>
  );
};

export default ThemeButton;
