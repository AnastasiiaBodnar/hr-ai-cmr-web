"use client";

import Link from "next/link";
import Image from "next/image";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

export default function RegisterForm() {
  return (
    <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-7 w-full">
      {/* Header Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-12 h-8 shrink-0">
          <Image
            src="/images/logo.png"
            alt="HR Logo"
            fill
            sizes="48px"
            className="object-contain"
          />
        </div>

        <div className="flex items-center space-x-2 text-sm font-medium">
          <Link href="/login" className="text-gray-400 hover:text-gray-600 transition-colors">
            Sign In
          </Link>
          <span className="text-primary cursor-default">Create account</span>
        </div>
      </div>

      {/* Form Fields */}
      <form className="space-y-2 mb-2">
        <Input type="text" placeholder="FullName" required />
        <Input type="email" placeholder="Email address" required />
        <Input type="password" placeholder="Password" required />
        <Input type="password" placeholder="Repeat password" required />

        <div className="pt-2">
          <Button type="submit" variant="primary">
            Register
          </Button>
        </div>
      </form>

      {/* Divider */}
      <div className="flex items-center justify-center py-3">
        <hr className="w-3/4 border-gray-200" />
      </div>

      {/* Social Logins */}
      <div className="space-y-2">
        <Button type="button" variant="outline">
          Register with Google
          <Image src="/images/LogoGoogle.png" alt="Google" width={20} height={20} className="ml-1" />
        </Button>
        <Button type="button" variant="outline">
          Register with LinkedIn
          <Image src="/images/LogoLinkedIn.png" alt="LinkedIn" width={20} height={20} className="ml-1" />
        </Button>
      </div>

      {/* Footer Links */}
      <div className="mt-4 text-center text-sm">
        <Link href="#" className="text-gray-500 hover:text-gray-700 hover:underline block mb-1">
          Forgot password?
        </Link>
        <span className="text-gray-700">
          Do you have an account?{" "}
          <Link href="/login" className="text-accent hover:underline">
            Log In
          </Link>
        </span>
      </div>
    </div>
  );
}