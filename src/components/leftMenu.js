// LeftMenu.jsx
'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { leftNavLinks } from '../lib/menuData'; // Import your data

export default function LeftMenu() {
  const pathname = usePathname();

  if (pathname == "/login") return;

  // Determine the primary route segment (e.g., /employees from /employees/add)
  // This is a simple logic; you might need a more robust check for complex paths.
  const primaryPath = '/' + pathname.split('/')[1];

  // Get the links for the current primary path
  const links = leftNavLinks[primaryPath] || leftNavLinks['/']; // Default to dashboard links if path isn't found

  return (
    <aside
      className="w-20 bg-gray-700 dark:bg-surface-dark border-border-light dark:border-border-dark flex flex-col items-center py-4"
    >
      <nav className="flex flex-col space-y-4">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            // Logic for active link: is the current pathname exactly the link's href?
            className={`p-2 rounded-lg ${pathname === link.href
                ? "text-white" // Active styling
                : "text-gray-100 dark:text-subtext-dark" // Default styling
              }`}
          >
            <span className="material-icons">{link.icon}</span>
          </Link>
        ))}
      </nav>
      {/* Settings remains at the bottom, so it can be outside the map */}
      <div className="mt-auto">
        <a
          className="p-2 rounded-lg text-subtext-light dark:text-subtext-dark hover:bg-primary/10 hover:text-primary"
          href="#"
        >
          <span className="material-icons">settings</span>
        </a>
      </div>
    </aside>
  );
}