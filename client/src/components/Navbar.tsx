"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, LogOut, CheckSquare } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <CheckSquare className="w-6 h-6" />
          TaskManager
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-slate-300 text-sm">Hello, {user.name}</span>
              <Link href="/dashboard" className="text-slate-300 hover:text-white flex items-center gap-1">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <button 
                onClick={logout}
                className="text-slate-300 hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-slate-300 hover:text-white">Login</Link>
              <Link href="/signup" className="bg-primary hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
