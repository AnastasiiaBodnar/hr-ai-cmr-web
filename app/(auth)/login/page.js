import { redirect } from "next/navigation";
import AuthLayout from "@/app/components/auth/AuthLayout";
import LoginForm from "@/app/components/auth/LoginForm";

export default async function LoginPage(props) {
  const searchParams = await props.searchParams;

  if (searchParams?.token && searchParams?.email) {
    redirect(`/verify-email?token=${searchParams.token}&email=${searchParams.email}`);
  }

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}