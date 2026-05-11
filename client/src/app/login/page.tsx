"use client";

import { useState } from "react";
import { useForm } from "react-form-hook"; // Will use standard React state for simplicity to avoid extra hook library setups if not fully configured, wait I added react-hook-form
import { useForm as useReactHookForm } from "react-hook-form";
import Navbar from "@/components/Navbar";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useReactHookForm();
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const res = await api.post('/auth/login', data);
      login(res.data);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">Welcome Back</h2>
          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-md mb-4 text-sm">{error}</div>}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-1">Email</label>
              <input 
                {...register("email", { required: "Email is required" })}
                type="email" 
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="you@example.com"
              />
              {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message as string}</span>}
            </div>
            
            <div>
              <label className="block text-slate-400 text-sm mb-1">Password</label>
              <input 
                {...register("password", { required: "Password is required" })}
                type="password" 
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="••••••••"
              />
              {errors.password && <span className="text-red-400 text-xs mt-1 block">{errors.password.message as string}</span>}
            </div>

            <button type="submit" className="w-full bg-primary hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition-colors mt-6">
              Sign In
            </button>
          </form>

          <p className="text-center text-slate-400 mt-6 text-sm">
            Don't have an account? <Link href="/signup" className="text-primary hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
