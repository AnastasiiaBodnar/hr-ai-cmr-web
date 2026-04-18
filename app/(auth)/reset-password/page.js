"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuthLayout from "@/app/components/auth/AuthLayout";
import ResetPasswordForm from "@/app/components/auth/ResetPasswordForm";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  return (
    <ResetPasswordForm email={email} token={token} />
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout hideHeader={true}>
      <Suspense fallback={
        <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-xl border border-gray-100 min-w-[300px]">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading...</p>
        </div>
      }>
        <ResetPasswordContent />
      </Suspense>
    </AuthLayout>
  );
}
