"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Smartphone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, WEEKS } from "@/lib/constants";
import { LoginButton } from "@/components/layout/LoginButton";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roadmapOpen, setRoadmapOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Smartphone className="h-5 w-5 text-green-600" />
          <span className="hidden sm:inline">Android Zero to Hero</span>
          <span className="sm:hidden">A0→Hero</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) =>
            link.items ? (
              <div key={link.title} className="relative group">
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md",
                    "hover:bg-accent hover:text-accent-foreground transition-colors"
                  )}
                >
                  {link.title}
                  <ChevronDown className="h-3 w-3" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-56 rounded-lg border bg-popover p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {link.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors"
                    >
                      <div className="font-medium">{item.title}</div>
                      {item.description && (
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.title}
                href={link.href}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {link.title}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Toggle + Login */}
        <div className="flex items-center gap-2">
          <LoginButton />
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) =>
              link.items ? (
                <div key={link.title}>
                  <button
                    onClick={() => setRoadmapOpen(!roadmapOpen)}
                    className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
                  >
                    {link.title}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        roadmapOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {roadmapOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm rounded-md hover:bg-accent text-muted-foreground"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
                >
                  {link.title}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
