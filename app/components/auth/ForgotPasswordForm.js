"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import { requestPasswordReset } from "@/lib/auth";
import StatusCard from "./StatusCard";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await requestPasswordReset(email);
      setIsSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isSent) {
    return (
      <StatusCard
        type="success"
        title="Reset link sent!"
        description={`We've sent a password reset link to:\n${email}\n\nPlease check your inbox and follow the instructions.`}
        actions={[
          { label: "Back to Log In", href: "/login", variant: "outline-success" },
        ]}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 lg:p-8 w-full">
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-12 h-10 mb-4">
          <Image
            src="/images/logo.png"
            alt="HR Logo"
            fill
            sizes="48px"
            className="object-contain"
          />
        </div>
        <h2 className="text-xl font-bold text-primary mb-2">Reset your password</h2>
        <p className="text-sm text-gray-500 text-center px-4">
          Enter your email address below and we'll send you a link to reset your password.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <Input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="pt-2">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </Button>
        </div>
      </form>

      {/* Divider */}
      <div className="flex items-center justify-center py-2">
        <hr className="w-full border-gray-100" />
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-sm">
        <span className="text-gray-700">
          Back to Log In?{" "}
          <Link href="/login" className="text-accent hover:underline font-medium">
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
}
