'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { leftNavLinks } from '../lib/menuData';
import { LogInIcon } from "lucide-react";

export default function LeftMenu() {
  const pathname = usePathname();

  if (pathname === "/login") return null;

  const primaryPath = '/' + pathname.split('/')[1];
  const links = leftNavLinks[primaryPath] || leftNavLinks['/'];

  return (
    <aside
      className="group relative w-20 hover:w-56 bg-gray-800 dark:bg-surface-dark border-r border-gray-700 
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
              className={`flex items-center w-14 group-hover:w-full px-0 group-hover:px-4 py-3 
                           transition-all duration-300 ease-in-out
                ${isActive
                  ? "bg-primary/30 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
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
      <div className="mt-auto flex items-center justify-center group-hover:justify-start w-full px-0 group-hover:px-4 mb-2 transition-all duration-300">
        <a
          className="flex items-center w-14 group-hover:w-full py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white 
                     transition-all duration-200"
          href="#"
        >
          <div className="flex justify-center w-full group-hover:w-8 group-hover:justify-start transition-all duration-300">
            <LogInIcon size={22} strokeWidth={1.8} />
          </div>
          <span
            className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 
                       transform -translate-x-2 transition-all duration-300 ease-in-out 
                       whitespace-nowrap text-sm font-medium"
          >
            Login
          </span>
        </a>
      </div>
    </aside>
  );
}
