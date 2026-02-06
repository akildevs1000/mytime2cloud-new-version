"use client";

import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation'; // Or 'next/navigation' for App Router

import axios from 'axios';
import { Input } from '@/components/ui/input';

import {
    RefreshCw,
    User,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
    LayoutDashboard,
    Users,
    UserCircle
} from 'lucide-react';

const isBrowser = typeof window !== 'undefined';

const savedEmail = isBrowser ? localStorage.getItem('rememberedEmail') || 'demo@gmail.com' : 'demo@gmail.com';
const savedPassword = isBrowser ? localStorage.getItem('rememberedPassword') || 'demo' : 'demo';
const rememberPref = isBrowser ? localStorage.getItem('rememberMe') === 'true' : false;


// Main Login Component
const Login = () => {

    const router = useRouter(); // Initialize router

    const [credentials, setCredentials] = useState({
        email: savedEmail,
        password: savedPassword,
        rememberMe: rememberPref,
        source: 'admin'
    });

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [role, setRole] = useState('company');
    const [showPassword, setShowPassword] = useState(false);


    const validateForm = () => {
        // Basic validation
        if (!credentials.email || !credentials.password) {
            setMsg('Email and Password are required.');
            return false;
        }
        // Simple email format check
        if (!/.+@.+\..+/.test(credentials.email)) {
            setMsg('E-mail must be valid.');
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setMsg('');
        setLoading(true);

        try {
            let payload = { user_type: role, ...credentials };
            let endpoint = `${process.env.NEXT_PUBLIC_API_URL || "https://backend.mytime2cloud.com/api"}/login`;

            const { data } = await axios.post(endpoint, payload);
            const token = data?.token;

            if (token) {
                // --- REMEMBER ME (WITH PASSWORD) ---
                if (credentials.rememberMe) {
                    localStorage.setItem('rememberedEmail', credentials.email);
                    localStorage.setItem('rememberedPassword', credentials.password); // Stored as plain text
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    localStorage.removeItem('rememberedEmail');
                    localStorage.removeItem('rememberedPassword');
                    localStorage.setItem('rememberMe', 'false');
                }

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(data?.user));

                window.location.href = "/";
            }
        } catch (error) {
            setMsg('Login failed.');
        } finally {
            setLoading(false);
        }
    };


    const handleInputChange = (e) => {

        const { id, value, type, checked } = e.target;
        setCredentials(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="flex flex-col lg:flex-row w-full overflow-hidden font-sans dark:bg-slate-50 dark:bg-slate-950 text-slate-900 antialiased">

            {/* Left Side: Branding & Visual (40%) */}
            <div className="relative hidden lg:flex w-full lg:w-[40%] flex-col justify-between p-12 overflow-hidden bg-slate-900">
                {/* Background Image - Using object-cover for better scaling */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9quZCvIjVlQL6X_XAulwnuRzVyiwbnVR0FcONLLQ8OVwVYYTVchCvz8Ly60e-BJf_M327SvaKt3bdgrlEdwXWS7oTFRCYoCUjbepAD5azOW3E8sB133d9e34HdlPfTdWUkZxjDc5WlnGdIKz0sHIM-wM1Qz8s0BNVtVaajnOpQIl2ETK0Q4xQDvw26aFuZFHxCIaen3w_tPtd_ZEHru--lGDSO1cc788CnFDRReCpwY3LW7L8kOzxqF7nISMVZMEbxZ8t4pNkqhIa"
                        alt="Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    {/* Refined Gradient: Deep at the bottom/left, clearer at the top/right */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/70 to-transparent" />
                </div>

                {/* Logo Area */}
                <div className="relative z-10 flex items-center gap-4">
                    <div className="flex items-center justify-center">
                        <img
                            src="https://mytime2cloud.com/logo22.png"
                            alt="MyTime Cloud Logo"
                            className="h-12 w-auto object-contain brightness-110"
                        // If the logo has a white background you want to hide, 
                        // add: className="mix-blend-screen"
                        />
                    </div>
                </div>

                {/* Value Proposition */}
                <div className="relative z-10 mb-12 max-w-md">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]"></span>
                        Enterprise Intelligence
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Empower your workforce with <span className="text-emerald-400">next-gen</span> intelligence.
                    </h2>
                    <p className="text-slate-300 text-lg font-medium leading-relaxed">
                        Streamline attendance, optimize complex scheduling, and gain real-time insights with our award-winning platform.
                    </p>
                </div>

                {/* Bottom Decorative Element */}
                <div className="relative z-10 flex items-center gap-4 text-white/40 text-xs tracking-wide uppercase">
                    <ShieldCheck className="w-5 h-5 text-emerald-500/50" />
                    <span className="font-semibold">Bank-grade security encryption active</span>
                </div>
            </div>

            {/* Right Side: Login Workspace (60%) */}
            <div className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-white dark:bg-[#131022] relative">

                {/* Mobile Header */}
                <div className="lg:hidden p-6 flex items-center justify-between bg-white dark:bg-[#131022] border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <RefreshCw className="text-[#3713ec] w-6 h-6" />
                        <h1 className="text-slate-900 dark:text-white text-lg font-bold">MYTIME CLOUD</h1>
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-1 bg-white dark:bg-slate-900 flex items-center justify-center p-6 sm:p-12 lg:p-24">
                    <div className="w-full max-w-[440px] flex flex-col gap-10">

                        {/* Header */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                Welcome Back
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-base">
                                Securely log in to your enterprise dashboard.
                            </p>
                        </div>

                        {/* Login Form */}
                        <form className="flex flex-col gap-6" onSubmit={handleLogin}>

                            {/* Role Selector */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] ml-1">
                                    Access Level
                                </label>
                                <div className="grid grid-cols-3 p-1.5 bg-slate-100 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                                    {[
                                        { id: 'company', label: 'Admin', icon: LayoutDashboard },
                                        { id: 'manager', label: 'Manager', icon: Users },
                                        { id: 'employee', label: 'Staff', icon: UserCircle }
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setRole(item.id)}
                                            className={`
                        flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-300
                        ${role === item.id
                                                    ? 'bg-white dark:bg-slate-800 text-[#3713ec] dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'
                                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}
                      `}
                                        >
                                            <item.icon className="w-4 h-4" />
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Inputs */}
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2.5">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300" htmlFor="email">
                                        Username or Email
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="text-slate-400 group-focus-within:text-[#3713ec] transition-colors w-5 h-5" />
                                        </div>
                                        <input
                                            id="email"
                                            type="text"
                                            required
                                            value={credentials.email}
                                            onChange={handleInputChange}
                                            className="w-full h-14 pl-12 pr-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#3713ec]/10 focus:border-[#3713ec] transition-all text-base font-medium"
                                            placeholder="e.g. j.doe@company.com"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="flex flex-col gap-2.5">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300" htmlFor="password">
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="text-slate-400 group-focus-within:text-[#3713ec] transition-colors w-5 h-5" />
                                        </div>
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={credentials.password}
                                            onChange={handleInputChange}
                                            className="w-full h-14 pl-12 pr-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#3713ec]/10 focus:border-[#3713ec] transition-all text-base font-medium"
                                            placeholder="••••••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    <div className="text-center pt-4 mb-5 pb-1">
                                        {msg && <span className="text-red-500 block mb-3">{msg}</span>}
                                    </div>

                                </div>
                            </div>

                            {/* Actions Row */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            id="rememberMe"
                                            type="checkbox"
                                            checked={credentials.rememberMe}
                                            onChange={handleInputChange}
                                            className="peer h-5 w-5 rounded-lg border-slate-300 dark:border-slate-700 text-[#3713ec] focus:ring-[#3713ec]/20 cursor-pointer transition-all"
                                        />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors select-none">
                                        Remember me
                                    </span>
                                </label>
                                <a href="#" className="text-sm font-bold text-[#3713ec] hover:text-[#2c0fb8] transition-colors">
                                    Forgot Password?
                                </a>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full h-14 bg-[#3713ec] hover:bg-[#2c0fb8] text-white font-bold rounded-2xl shadow-xl shadow-[#3713ec]/20 hover:shadow-[#3713ec]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group mt-4"
                            >
                                <span> {loading ? 'Logging in...' : 'Login'} </span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>


                        <div className="lg:hidden text-center">
                            <p className="text-sm font-medium text-slate-500">
                                Facing issues? <a href="#" className="text-[#3713ec] font-bold hover:underline">Support Center</a>
                            </p>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="w-full p-8 lg:px-24 bg-white bg-white dark:bg-slate-900">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            © 2024 MYTIME CLOUD SYSTEMS
                        </span>
                        <div className="flex gap-8">
                            <a href="#" className="text-xs font-bold text-slate-400 hover:text-[#3713ec] transition-colors uppercase tracking-widest">Privacy</a>
                            <a href="#" className="text-xs font-bold text-slate-400 hover:text-[#3713ec] transition-colors uppercase tracking-widest">Terms</a>
                            <a href="#" className="text-xs font-bold text-slate-400 hover:text-[#3713ec] transition-colors uppercase tracking-widest">Help</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Login;