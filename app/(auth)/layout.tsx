
import AnimatedBackground from '@/components/AnimatedBackground';
import Logo from '@/components/Logo';
import React from 'react';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <main className="w-full max-w-6xl mx-auto flex min-h-svh flex-col items-center justify-center p-6 md:p-10 space-y-5">
      <AnimatedBackground />
      <Logo/>
      {children}
    </main>
  );
}
