"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "../layout/theme/modeToggle";

export default function Header() {
  // links nav
  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "A propos", href: "#features" },
    { name: "Inscription", href: "/signup" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full flex justify-between items-center gap-5 px-12 py-4 border-b fixed bg-white top-0 z-50">
        {/* LOGO */}
        <div className="flex items-center gap-7">
          <Link href="/">
            <h1 className="text-xl text-black font-bold">Campus Master 2</h1>
          </Link>
          {/* ModeToggle */}
          <ModeToggle />
        </div>

        {/* Menu button */}
        <div className="flex items-center gap-4">
          <Button
            variant={"link"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hidden max-lg:block text-black"
          >
            {isMenuOpen ? <X className="text-red-500" /> : <Menu />}
          </Button>
        </div>

        {/* NAVIGATION */}
        <nav className="max-lg:hidden  text-black">
          <ul className="flex items-center gap-5">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="lg:hidden fixed top-16 left-0 right-0 px-12 bg-white text-black shadow-md z-50">
          <ul className="flex flex-col items-center py-4">
            {navLinks.map((link) => (
              <li key={link.name} className="w-full py-2">
                <Link href={link.href} onClick={() => setIsMenuOpen(false)}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
