import { login } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-sm">
        <form
          className="bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl shadow-md space-y-4"
        >
          <h1 className="text-xl font-bold text-center">Login</h1>
          <div className="space-y-2">
            <label htmlFor="email">Email:</label>
            <input className="w-full border p-2 rounded" id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Password:</label>
            <input className="w-full border p-2 rounded" id="password" name="password" type="password" required />
          </div>
          <button
            formAction={login}
            className="w-full bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black p-2 rounded hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors"
          >
            Log in
          </button>
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <a href="/signup" className="underline text-blue-500">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}