'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { leftNavLinks } from '../lib/menuData';
import { LogOutIcon } from "lucide-react";

export default function LeftMenu() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/login") return null;

  const primaryPath = '/' + pathname.split('/')[1];
  const links = leftNavLinks[primaryPath] || leftNavLinks['/'];

  return (
    <aside
      className="group relative w-20 hover:w-56 dark:border-r dark:border-gray-700  bg-white dark:bg-slate-900 
                 flex flex-col py-4 transition-all duration-300 ease-in-out overflow-hidden"
    >
      <nav className="flex flex-col items-center gap-3 mt-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center w-14 group-hover:w-[90%] rounded-xl px-0 group-hover:px-4 py-3 
                           transition-all duration-300 ease-in-out
                ${isActive
                  ? "bg-primary text-white rounded-xl"
                  : "text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white"
                }`}
            >
              {/* Icon container stays centered in collapsed state */}
              <div className="flex justify-center w-full group-hover:w-8 group-hover:justify-start transition-all duration-300">
                <Icon size={22} strokeWidth={1.8} />
              </div>

              {/* Label only appears when hovered */}
              <span
                className="overflow-hidden w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 
             transition-all duration-300 whitespace-nowrap text-sm font-medium ml-0 group-hover:ml-2"
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}

      <button
        href="#"
        className={`ml-3 mt-auto mb-18 flex items-center w-14 group-hover:w-[90%] rounded-xl px-0 group-hover:px-4 py-3 
                           transition-all duration-300 ease-in-out text-gray-500 dark:text-gray-100 hover:bg-gray-700 hover:text-white
             `}
        onClick={() => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.dispatchEvent(new Event("userUpdated"));
          }
          router.push('/login');
        }}
      >
        {/* Icon container stays centered in collapsed state */}
        <div className="flex justify-center w-full group-hover:w-8 group-hover:justify-start transition-all duration-300">
          <LogOutIcon size={22} strokeWidth={1.8} />
        </div>

        {/* Label only appears when hovered */}
        <span
          className="overflow-hidden w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 
             transition-all duration-300 whitespace-nowrap text-sm font-medium ml-0 group-hover:ml-2"
        >
          LogOut
        </span>
      </button>


    </aside>
  );
}
