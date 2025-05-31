'use client';

import Link from "next/link";
import { LogIn, Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { useMutation } from '@tanstack/react-query';
import { useState } from "react";
import axios from "axios";
import { showToast } from "@/hooks/filtered-toast";
import { useRouter } from "next/navigation"

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLocationFetch = () => {
    if (!navigator.geolocation) {
      return alert("Geolocation not supported.");
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setForm((prev) => ({
          ...prev,
          address: `Lat: ${latitude}, Lng: ${longitude}`,
        }));
      },
      () => {
        alert("Failed to fetch location.");
      }
    );
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/auth/register", {
        ...form,
        useLocation: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      showToast({
        title: "success",
        description: data.message,
      });
      router.push("/")

    },
    onError: (error: any) => {
      showToast({
        title: "error",
        description:
          error?.response?.data?.message || "Something went wrong",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <LogIn className="h-12 w-12 text-blue-500" />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">Create an Account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign up to start your journey
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 space-y-6"
        >
          <div className="space-y-4">
            {/* First and Last Name */}
            <div className="flex gap-4">
              <InputWithIcon
                icon={<User />}
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
              <InputWithIcon
                icon={<User />}
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>

            <InputWithIcon
              icon={<Mail />}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
            />

            <InputWithIcon
              icon={<Phone />}
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
            />

            <InputWithIcon
              icon={<Lock />}
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
            />

            <InputWithIcon
              icon={<MapPin />}
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address or auto location"
            />

            <button
              type="button"
              onClick={handleLocationFetch}
              className="text-sm text-blue-500 hover:underline"
            >
              Use My Location
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                required
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                I agree to the terms
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
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            {isPending ? "Creating..." : "Create Account"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-400 font-medium"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

// 🧩 Small reusable input with icon component
const InputWithIcon = ({
  icon,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="relative w-full">
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
      required
    />
  </div>
);

export default RegisterPage;
