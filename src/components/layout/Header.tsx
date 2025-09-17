"use client";
import Link from "next/link";
import { SignOutButton } from "../buttons/SignOutButton";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      prefetch={true}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "bg-primary text-white"
          : "text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
      }`}
    >
      {children}
    </Link>
  );
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center p-4 border-b border-primary-dark">
      <h1 className="text-xl font-bold text-primary">HealthTrack</h1>
      <nav className="hidden md:flex gap-4">
        <NavItem href="/dashboard">Dashboard</NavItem>
        <NavItem href="/goals">Goals</NavItem>
        <NavItem href="/history">History</NavItem>
      </nav>
      <div className="hidden md:block">
        <SignOutButton />
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <svg
            data-testid="menu-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-menu ${isMenuOpen ? "text-primary" : ""}`}
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-container-background p-4 rounded-md shadow-lg md:hidden z-60">
          <nav className="flex flex-col gap-4">
            <Link href="/dashboard" prefetch={true}>Dashboard</Link>
            <Link href="/goals" prefetch={true}>Goals</Link>
            <Link href="/history" prefetch={true}>History</Link>
            <SignOutButton />
          </nav>
        </div>
      )}
    </header>
  );
};
