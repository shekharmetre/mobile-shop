'use client';

import Link from "next/link";
import { LogIn, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import axios from "axios";
import { showToast } from "@/hooks/filtered-toast";
import {  useRouter,usePathname } from "next/navigation";
import { GoogleSubmitButton } from "@/lib/client-component";
import { supabse } from "@/config/supbase-client";

const LoginPage = () => {
  const pathname = usePathname()
  const router = useRouter();
  const redirect = pathname || "/"
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/api/auth/login', form);
      return res.data;
    },
    onSuccess: async (data) => {
      if (data.session) {
        // Set session on client so Supabase knows you're logged in
        const { error } = await supabse.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });

        if (error) {
          showToast({
            title: "Session Error",
            description: error.message,
          });
          return;
        }
      }

      showToast({
        title: "Success",
        description: data.message,
      });

      router.push(redirect || "/");
    },
    onError: (error: any) => {
      if (error?.response?.data?.message === "Email not confirmed") {
        showToast({
          title: "Error",
          description: "Please check mail Inbox and Verify login ",
        });
      }
      showToast({
        title: "Error",
        description: error?.response?.data?.message || "Login failed",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="h-full bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md h-full">
        <div className="text-center mb-20">
          <Link href="/" className="inline-block">
            <LogIn className="h-12 w-12 text-blue-500" />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-400">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-400">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 mr-2"
              />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-400">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center space-x-2"
          >
            <LogIn className="h-5 w-5" />
            <span>{isPending ? 'Signing in...' : 'Sign in'}</span>
          </button>
        </form>
        <div className="mt-6">
          <GoogleSubmitButton />
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Dont have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:text-blue-400 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
