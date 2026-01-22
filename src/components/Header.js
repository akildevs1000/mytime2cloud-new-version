'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "@/config/index";
import MultiStepDialog from "./Wizard/Page";
import { useDarkMode } from "@/context/DarkModeContext";


export default function Header() {

    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000); // update every second

        return () => clearInterval(interval);
    }, []);

    const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const date = now.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    }).toUpperCase();

    // Initialize state based on the current presence of the 'dark' class
    const { isDark, setIsDark } = useDarkMode();

    // Sync state with document class on mount and when changed
    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [isDark]);

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
        { name: 'VISITORS', href: '/visitor' },
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
            <header className="flex items-center justify-between bg-white dark:bg-obsidian p-4 dark:border-b dark:border-gray-200 dark:border-gray-700  shadow-sm z-20">
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
                    <div className="flex items-center gap-4">
                        <button
                            className="relative p-2 text-slate-500 hover:text-red-600 transition-colors"
                            title="Watch Tutorial"
                        >
                            <span className="material-symbols-outlined">
                                smart_display
                            </span>
                        </button>
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="relative p-2 text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-gold-glow transition-all duration-300 active-pop"
                            title={
                                isDark ? "Switch to Light Mode" : "Switch to Dark Mode"
                            }
                        >
                            <span className="material-symbols-outlined transition-transform duration-500 rotate-0 dark:rotate-[360deg]">
                                {isDark ? "light_mode" : "dark_mode"}
                            </span>

                            {/* Optional: Subtle indicator dot */}
                            <span
                                className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full transition-colors ${isDark ? "bg-gold-glow shadow-[0_0_8px_#fbbf24]" : "bg-transparent"}`}
                            ></span>
                        </button>
                        <div className="text-right hidden sm:block">
                            <h2 className="text-sm font-bold text-gray-600 dark:text-gray-300 font-display">
                                {time}
                            </h2>
                            <p className="text-[10px] text-gray-600 dark:text-gray-300 font-mono">
                                {date}
                            </p>
                        </div>
                    </div>


                </div>
            </header>
        </>
    );
}
