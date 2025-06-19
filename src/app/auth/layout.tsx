'use client';
import bg from '@/assets/images/login_background.jpg';
import { usePathname, useRouter } from 'next/navigation';

import React, { useEffect } from 'react';
import { RegisterProvider } from './context/register.context';
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (pathname === '/auth') {
      router.push('/auth/login');
    }
  }, [pathname, router]);
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm z-0 backdrop-opacity-85"
        style={{ backgroundImage: `url(${bg.src})` }}
        aria-hidden="true"
      />
      <RegisterProvider>{children}</RegisterProvider>
    </div>
  );
}
