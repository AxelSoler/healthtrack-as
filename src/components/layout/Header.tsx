import Link from "next/link";
import { SignOutButton } from "../buttons/SignOutButton";

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-neutral-200 dark:border-neutral-800">
      <h1 className="text-xl font-bold text-primary">HealthTrack</h1>
      <nav className="flex gap-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/goals">Goals</Link>
        <Link href="/feedback">Feedback</Link>
      </nav>
      <SignOutButton />
    </header>
  );
};
