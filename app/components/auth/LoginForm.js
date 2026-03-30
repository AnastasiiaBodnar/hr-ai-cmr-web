"use client";

import Link from "next/link";
import Image from "next/image";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

export default function LoginForm() {
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
          <span className="text-primary cursor-default">Sign In</span>
          <Link href="/register" className="text-gray-400 hover:text-gray-600 transition-colors">
            Create account
          </Link>
        </div>
      </div>

      {/* Form Fields */}
      <form className="space-y-3 mb-5">
        <Input type="email" placeholder="Email address" required />
        <Input type="password" placeholder="Password" required />
        
        <div className="pt-1">
          <Button type="submit" variant="primary">
            Log In
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
          Don`t have an account?{" "}
          <Link href="/register" className="text-accent hover:underline">
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
}