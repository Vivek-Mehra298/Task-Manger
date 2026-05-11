import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center p-24 text-center">
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Manage Your Tasks with Ease
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mb-10">
          A powerful, role-based project and task management solution to keep your team organized and productive.
        </p>
        <div className="flex gap-4">
          <Link href="/login" className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-lg transition-all border border-slate-700">
            Login
          </Link>
          <Link href="/signup" className="bg-primary hover:bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg shadow-primary/30 transition-all">
            Get Started Free
          </Link>
        </div>
      </div>
    </main>
  );
}
