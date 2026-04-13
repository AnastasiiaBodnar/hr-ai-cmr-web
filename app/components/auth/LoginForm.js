"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import { login } from "@/lib/api/auth";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("Attempting login with:", email);

    try {
      const result = await login(email, password);
      console.log("Login successful! Result:", result);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login error detected:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 lg:p-8 w-full">
      {/* Header Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-12 h-10 shrink-0">
          <Image
            src="/images/logo.png"
            alt="HR Logo"
            fill
            sizes="48px"
            className="object-contain"
          />
        </div>

        <div className="flex items-center space-x-6 text-sm font-medium">
          <span className="text-primary cursor-default border-b-2 border-primary pb-1">Sign In</span>
          <Link href="/register" className="text-gray-400 hover:text-gray-600 transition-colors pb-1">
            Create account
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-2">
        <Input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="pt-1">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </Button>
        </div>
      </form>

      {/* Divider */}
      <div className="flex items-center justify-center py-3">
        <hr className="w-3/4 border-gray-200" />
      </div>

      {/* Social Logins */}
      <div className="space-y-2.5">
        <Button type="button" variant="outline">
          Log In with Google
          <Image src="/images/LogoGoogle.png" alt="Google" width={20} height={20} className="ml-1" />
        </Button>
        <Button type="button" variant="outline">
          Log In with LinkedIn
          <Image src="/images/LogoLinkedIn.png" alt="LinkedIn" width={20} height={20} className="ml-1" />
        </Button>
      </div>

      {/* Footer Links */}
      <div className="mt-5 text-center text-sm">
        <Link href="#" className="text-gray-700 hover:underline block mb-1">
          Forgot password?
        </Link>
        <span className="text-gray-700">
          Don't have an account?{" "}
          <Link href="/register" className="text-accent hover:underline">
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
}