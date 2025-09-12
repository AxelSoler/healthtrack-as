"use client";

import Link from "next/link";

const Home = () => {
  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen p-8 gap-16">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-4xl sm:text-5xl font-bold text-center sm:text-left">
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-primary-dark">
            HEALTH TRACK - AS
          </span>
        </h1>
        <p>
          Your personal health tracking app. Monitor your well-being and stay on
          top of your health goals with ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 text-lg sm:text-xl sm:justify-end w-full">
          <Link
            href="/signup"
            className="bg-neutral-200 dark:bg-neutral-800 p-2 rounded hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
          >
            Create account
          </Link>
          <Link
            href="/login"
            className="bg-primary p-2 rounded hover:bg-primary-dark transition-colors"
          >
            Login
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
