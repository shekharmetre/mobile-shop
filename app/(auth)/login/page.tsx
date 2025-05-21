import Link from "next/link";
import { LogIn, Mail, Lock, Github } from "lucide-react";
import Form from "next/form"
import { login } from "../action";
import { GoogleSubmitButton } from "@/lib/client-component";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block">
            <Link href="/" className="inline-block">
              <LogIn className="h-12 w-12 text-blue-500" />
            </Link>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-400">Please sign in to your account</p>
        </div>

        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
          <Form action={login} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="checkbox"
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-500 hover:text-blue-400"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center space-x-2"
            >
              <LogIn className="h-5 w-5" />
              <span>Sign in</span>
            </button>

          <GoogleSubmitButton />
          </Form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Dont have an account?
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-400 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;