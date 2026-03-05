"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/origen", label: "Visualización" },
  { href: "/origen/crear", label: "Crear Ruta" },
  { href: "/origen/localizacion", label: "Localización" },
];

export default function OrigenNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-1 border-b border-border pb-2">
      {navLinks.map(({ href, label }) => {
        const isActive =
          href === "/origen"
            ? pathname === "/origen"
            : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={`px-4 py-1.5 rounded-sm text-sm font-mono transition-colors ${
              isActive
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/40"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
