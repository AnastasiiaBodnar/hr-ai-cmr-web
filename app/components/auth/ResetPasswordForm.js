"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import { setPassword } from "@/lib/auth";
import StatusCard from "./StatusCard";

export default function ResetPasswordForm({ email, token }) {
  const [password, setPasswordState] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errors = {};
    const passwordErrors = [];
    
    if (password.length < 8) passwordErrors.push("min 8 characters");
    if (!/[A-Z]/.test(password)) passwordErrors.push("uppercase letter");
    if (!/[0-9]/.test(password)) passwordErrors.push("number");
    if (!/[!@#$%^&*]/.test(password)) passwordErrors.push("special character (!@#$...)");
    
    if (passwordErrors.length > 0) {
      errors.password = `Missing: ${passwordErrors.join(", ")}`;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      await setPassword({ email, token, password });
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to reset password. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <StatusCard
        type="success"
        title="Password updated!"
        description="Your password has been reset successfully. You can now use your new password to log in."
        actions={[
          { label: "Back to Log In", href: "/login", variant: "outline-success" },
        ]}
      />
    );
  }

  if (!token) {
    return (
      <StatusCard
        type="error"
        title="Invalid link"
        description="This password reset link is invalid or has expired. Please request a new one."
        actions={[
          { label: "Request new link", href: "/forgot-password", variant: "outline-warning" },
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
        <h2 className="text-xl font-bold text-primary mb-2">Set new password</h2>
        <p className="text-sm text-gray-500 text-center px-4">
          Please enter and confirm your new password below.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <Input
            type="password"
            placeholder="New password"
            required
            value={password}
            onChange={(e) => {
              setPasswordState(e.target.value);
              setFieldErrors((f) => ({ ...f, password: null }));
            }}
            error={!!fieldErrors.password}
          />
          {fieldErrors.password && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Confirm new password"
            required
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setFieldErrors((f) => ({ ...f, confirmPassword: null }));
            }}
            error={!!fieldErrors.confirmPassword}
          />
          {fieldErrors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        <div className="pt-2">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Updating..." : "Reset password"}
          </Button>
        </div>
      </form>

      {/* Footer */}
      <div className="text-center text-sm">
        <Link href="/login" className="text-gray-500 hover:underline">
          Cancel and return to login
        </Link>
      </div>
    </div>
  );
}
