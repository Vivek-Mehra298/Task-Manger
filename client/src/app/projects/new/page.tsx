"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewProject() {
  const { user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== 'Admin') {
    if (typeof window !== "undefined") {
      router.push('/projects');
    }
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post('/projects', {
        name,
        description
      });
      router.push(`/projects/${res.data._id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">Create New Project</h2>
            <Link href="/projects" className="text-slate-400 hover:text-white transition-colors text-sm">
              Cancel
            </Link>
          </div>
          
          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-md mb-4 text-sm">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-1">Project Name</label>
              <input 
                required
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="E.g., Website Redesign"
              />
            </div>
            
            <div>
              <label className="block text-slate-400 text-sm mb-1">Description</label>
              <textarea 
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="What is this project about?"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition-colors mt-6 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Project"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
