'use client'; // This directive must be at the very top

import Link from "next/link";
import { usePathname,useRouter  } from "next/navigation";
import { useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

export default function Header() {

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }
    }, []);

    const pathname = usePathname();

    // Define the navigation links and their paths
    const navLinks = [
        { name: 'DASHBOARD', href: '/' },
        { name: 'EMPLOYEES', href: '/employees' },
        { name: 'ATTENDANCE', href: '/attendance' }, // Assuming these paths for example
        { name: 'PAYROLL', href: '/payroll' },
        { name: 'ACCESS CONTROL', href: '/access-control' },
        { name: 'VISITORS', href: '/visitors' },
        { name: 'REPORTS', href: '/reports' },
        { name: 'SETTINGS', href: '/settings' },
    ];

    if (pathname == "/login") return;

    return (
        <header className="flex items-center justify-between p-4 shadow-sm bg-white dark:bg-gray-800">
            <div className="flex items-center space-x-4">
                <button className="text-gray-600 dark:text-gray-300">
                    <span className="material-icons">menu</span>
                </button>
                <div className="flex items-center">
                    <img alt="MyTime Cloud logo" className="h-10" src="/logo22.png" />
                </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
                {navLinks.map((link) => {
                    // Check if the link's href matches the current pathname
                    const isActive = link.href === pathname;

                    // Determine the classes based on active state
                    const baseClasses = "text-sm font-medium";
                    const activeClasses = "text-primary dark:text-purple-400 rounded-md";
                    // Using text-gray-600/text-gray-300 as placeholders for text-nav-text-light/dark
                    const inactiveClasses = "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400";

                    // Fallback to original classes for non-existent ones:
                    // const inactiveClasses = "text-nav-text-light dark:text-nav-text-dark hover:text-purple-600 dark:hover:text-purple-400";

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                        >
                            {link.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">search</span>
                    <input className="pl-10 pr-4 py-2 text-sm rounded-md border border-border-light dark:border-border-dark bg-background-light dark:bg-gray-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Search" type="text" />
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400 focus:outline-none">
                            <img alt="User profile" className="w-full h-full object-cover" src="https://backend.mytime2cloud.com/upload/1752909672.png" />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2">
                        <div className="flex flex-col">
                            <button
                                onClick={() => {
                                    if (typeof window !== 'undefined') {
                                        localStorage.removeItem('token');
                                    }
                                    router.push('/login');
                                }}
                                className="text-left px-3 py-2 rounded hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </header>
    );
}