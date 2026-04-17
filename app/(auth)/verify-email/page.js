"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { verifyEmail } from '../../../lib/auth';
import StatusLayout from '../../components/auth/StatusLayout';
import StatusCard from '../../components/auth/StatusCard';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('loading'); // loading, success, error

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      setStatus('error');
      return;
    }

    const verify = async () => {
      const isSuccess = await verifyEmail(email, token);
      setStatus(isSuccess ? 'success' : 'error');
    };

    verify();
  }, [searchParams]);

  if (status === 'loading') {
    return (
      <StatusLayout>
        <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-xl border border-gray-100 min-w-[300px]">
           <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
           <p className="mt-6 text-gray-600 font-medium">Verifying your email...</p>
        </div>
      </StatusLayout>
    );
  }

  if (status === 'success') {
    return (
      <StatusLayout>
        <StatusCard 
          type="success"
          title="Email verification successful!"
          description="Your email has been verified successfully.&#10;You can now log in."
          actions={[
            { label: 'Back to Log In', href: '/login', variant: 'outline-success' }
          ]}
        />
      </StatusLayout>
    );
  }

  return (
    <StatusLayout>
      <StatusCard 
        type="error"
        title="Email verification failed"
        description="The verification link is invalid or has expired.&#10;Please request a new link and try again."
        actions={[
          { label: 'Back to Log In', href: '/login', variant: 'outline-warning' },
          { label: 'Request new link', href: '/register', variant: 'outline-success' }
        ]}
      />
    </StatusLayout>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
        <StatusLayout>
            <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-xl border border-gray-100 min-w-[300px]">
               <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
               <p className="mt-6 text-gray-600 font-medium">Loading...</p>
            </div>
        </StatusLayout>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
