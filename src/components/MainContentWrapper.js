// components/MainContentWrapper.jsx
'use client'; // This makes it a Client Component

import { usePathname } from 'next/navigation';

export default function MainContentWrapper({ children }) {
  const pathname = usePathname();
  // Check if the current path is the login page
  const isLoginPage = pathname === '/login';

  // Apply padding unless it's the login page
  const paddingClass = isLoginPage ? '' : 'p-6';

  return (
    <main className={`flex-1 overflow-y-auto ${paddingClass}`}>
      {children}
    </main>
  );
}