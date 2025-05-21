"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/macros", label: "Macros" },
  { href: "/weight", label: "Weight" },
  { href: "/activities", label: "Activities" },
  { href: "/settings", label: "Settings" }, // optional future route
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-border bg-background w-full border-b p-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          🏋️ Shan’s Health Dashboard
        </h1>
        <nav className="flex gap-4 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "hover:text-foreground/80 transition-colors",
                pathname === href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
