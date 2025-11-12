'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { getUser } from "@/config/index";
import MultiStepDialog from "./Wizard/Page";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState(null);

    // ✅ Load user using the same helper everywhere
    const loadUser = async () => {
        try {
            const userData = await getUser();
            setUser(userData);
        } catch (error) {
            console.error("Failed to load user:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        loadUser();

        // Listen for user updates (optional but useful)
        const handleUserUpdate = () => loadUser();
        window.addEventListener("userUpdated", handleUserUpdate);

        return () => {
            window.removeEventListener("userUpdated", handleUserUpdate);
        };
    }, [router]);

    if (pathname === "/login") return null;

    const navLinks = [
        { name: 'DASHBOARD', href: '/' },
        { name: 'EMPLOYEES', href: '/employees' },
        { name: 'ATTENDANCE', href: '/attendance' },
        { name: 'PAYROLL', href: '/payroll-tabs' },
        { name: 'ACCESS CONTROL', href: '/access_control_logs' },
        { name: 'VISITORS', href: '/visitors' },
        { name: 'REPORTS', href: '/attendance' },
        { name: 'SETTINGS', href: '/setup' },
    ];

    const restrictedNames = ['SETTINGS', 'PAYROLL', 'ACCESS CONTROL', 'VISITORS'];

    const filteredLinks =
        user && Array.isArray(user.departments) && user.departments.length > 0
            ? navLinks.filter(link => !restrictedNames.includes(link.name))
            : navLinks;

    return (
        <>
            {/* <MultiStepDialog /> */}
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
                    {filteredLinks.map((link) => {
                        const isActive = link.href === pathname;
                        const baseClasses = "text-sm font-medium";
                        const activeClasses = "text-primary dark:text-purple-400 rounded-md";
                        const inactiveClasses = "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400";

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
                        <input
                            className="pl-10 pr-4 py-2 text-sm rounded-md border border-border-light dark:border-border-dark bg-background-light dark:bg-gray-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Search"
                            type="text"
                        />
                    </div>

                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="w-10 h-10 rounded-full overflow-hidden focus:outline-none">
                                <img
                                    alt="User profile"
                                    className="w-full h-full object-cover"
                                    src="default.png"
                                />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-40 p-2">
                            <div className="flex flex-col">
                                <button
                                    onClick={() => {
                                        if (typeof window !== 'undefined') {
                                            localStorage.removeItem('token');
                                            localStorage.removeItem('user');
                                            window.dispatchEvent(new Event("userUpdated"));
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
        </>
    );
}
