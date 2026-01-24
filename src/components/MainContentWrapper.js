// components/MainContentWrapper.jsx
'use client'; // This makes it a Client Component

import { usePathname } from 'next/navigation';

export default function MainContentWrapper({ children }) {
  const pathname = usePathname();
  // Check if the current path is the login page
  const isLoginPage = pathname === '/login';

  // Apply padding unless it's the login page
  const paddingClass = isLoginPage ? '' : '';

  return (
    <main className={`flex-1 flex flex-col h-screen relative z-10 ${paddingClass}`}>
      {children}
    </main>
  );
}