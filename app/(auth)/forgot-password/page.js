import AuthLayout from "@/app/components/auth/AuthLayout";
import ForgotPasswordForm from "@/app/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password | AICRM",
  description: "Request a password reset link for your AICRM account.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout hideHeader={true}>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
