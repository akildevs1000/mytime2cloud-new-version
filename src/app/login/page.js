"use client";

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/navigation'; // Or 'next/navigation' for App Router

// Placeholder components (You would replace these with actual modal/otp/snackbar components)
const WhatsappVerificationDialog = ({ open, onClose, mobileNumber, onVerify }) => {
    const [otp, setOtp] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerify = () => {
        if (otp.length !== 6) {
            setMsg('Enter 6 Digit Security Code');
            return;
        }
        setLoading(true);
        // In a real app, you'd call an API here
        onVerify(otp).finally(() => setLoading(false));
    };

    return (
        <div
            className={`fixed inset-0 z-50 overflow-y-auto ${open ? 'block' : 'hidden'}`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-[#6946dd] text-white px-4 py-3 flex justify-between items-center">
                        <h3 className="text-lg leading-6 font-medium">Whatsapp Verification</h3>
                        <button onClick={onClose} className="text-white hover:text-gray-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4">MyTime2Cloud</h2>
                            <h5 className="text-lg font-semibold mb-2">
                                Two Step Whatsapp OTP Verification <span className="text-green-500">✅</span>
                            </h5>
                            <p className="text-gray-600 mb-4">
                                We sent a verification code to your mobile number. Enter the Code from the mobile in the field below
                            </p>
                            <h2 className="text-2xl font-bold mb-6">{mobileNumber}</h2>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="otp-input" className="block text-lg font-bold mb-2">Type your 6 Digit Security Code</label>
                            <input
                                id="otp-input"
                                type="text"
                                maxLength="6"
                                value={otp}
                                onChange={(e) => {
                                    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                                    setMsg('');
                                }}
                                className="w-full text-center border-2 border-gray-300 rounded-lg p-3 text-2xl tracking-widest focus:ring-[#6946dd] focus:border-[#6946dd]"
                            />
                        </div>
                        <div className="text-center">
                            {msg && <span className="text-red-500 block mb-3">{msg}</span>}
                            <button
                                onClick={handleVerify}
                                className={`w-full py-3 mt-1 mb-3 text-white font-bold rounded-lg transition duration-200 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#6946dd] hover:bg-[#5237b6]'
                                    }`}
                                disabled={loading}
                            >
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Simplified/Placeholder Snackbar
const Snackbar = ({ open, message, onClose }) => {
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // Auto-hide after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 p-3 bg-red-500 text-white rounded-lg shadow-lg z-[60] transition-opacity duration-300">
            {message}
        </div>
    );
};


// Main Login Component
const Login = () => {

    const router = useRouter(); // Initialize router

    const [credentials, setCredentials] = useState({ email: 'demo@gmail.com', password: 'demo', source: 'admin' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [dialogWhatsapp, setDialogWhatsapp] = useState(false);
    const [maskMobileNumber, setMaskMobileNumber] = useState('');
    const [userId, setUserId] = useState('');
    const [dialogForgotPassword, setDialogForgotPassword] = useState(false);

    const maskMobileNumberFn = (inputString) => {
        if (typeof inputString !== 'string' || inputString.length < 5) return inputString;
        // Mask all but the last 5 digits
        const prefixLength = inputString.length - 5;
        const prefix = inputString.substring(0, prefixLength);
        const lastDigits = inputString.substring(prefixLength);
        return '*'.repeat(prefix.length) + lastDigits;
    };

    const validateForm = () => {
        // Basic validation
        if (!credentials.email || !credentials.password) {
            setSnackbarMessage('Email and Password are required.');
            setSnackbar(true);
            return false;
        }
        // Simple email format check
        if (!/.+@.+\..+/.test(credentials.email)) {
            setSnackbarMessage('E-mail must be valid.');
            setSnackbar(true);
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        setMsg('');
        setLoading(true);

        try {


            // Simulating a successful login delay
            await new Promise(resolve => setTimeout(resolve, 500));

            console.log("Login successful. Redirecting to /");

            // 👇 REDIRECT HERE
            router.push('/');
        } catch (error) {
            console.error(error);
            setMsg('Login failed. Please try again.');
            setLoading(false);
        }
        setLoading(false); // Ensure loading is stopped if an error occurs before the final login
    };

    const performAuthLogin = (user) => {

        if (user.branch_id === 0 && user.is_master === false) {
            setSnackbarMessage("You do not have Permission to access this page");
            setSnackbar(true);
            return false;
        }

        if (user.role_id === 0 && user.user_type === "employee") {
            // window.location.href = process.env.EMPLOYEE_APP_URL;
            // In Next.js, use router.push or redirect in a server component
            console.log("Redirecting to Employee App URL");
            return;
        }

        // Successful login - Redirect to dashboard or home page
        // router.push('/dashboard');
        console.log('Login successful. Redirecting...');
    }


    const handleCheckOTP = async (otp) => {
        // **Placeholder for OTP API call**
        // Replace with actual API call (e.g., axios.post(`/api/check_otp/${otp}`, { userId }))
        console.log(`Checking OTP: ${otp} for user: ${userId}`);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

        const otpValid = otp === '123456'; // Mock check

        if (otpValid) {
            setDialogWhatsapp(false);
            // OTP successful, perform the main login (re-call handleLogin or a separate function)
            // Since we're mocking, let's assume successful OTP leads to the final login step:
            performAuthLogin({ // Mock user data after OTP success
                branch_id: 1,
                is_master: true,
                role_id: 1,
                user_type: 'admin'
            });
        } else {
            alert("Invalid OTP. Please try again");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen pt-[5%] bg-cover bg-center bg-no-repeat lg:bg-[url('/login/bgimage3.png')]">
            <div className="flex flex-col lg:flex-row h-full">
                {/* Login Form Column */}
                <div className="w-full lg:w-5/12 p-6">
                    <div className="p-8 max-w-lg mx-auto text-center">
                        <div className="min-h-[100px]">
                            <div className="w-full text-center mb-4">
                                <Image
                                    src="/logo22.png" // Update with the correct path to your logo
                                    alt="Mytime2Cloud Logo"
                                    width={200}
                                    height={50}
                                    className="mx-auto"
                                />
                            </div>
                            <h3 className="pb-7 pt-10 text-xl font-medium">
                                Welcome To <span className="text-2xl font-bold"> Mytime2Cloud </span>
                            </h3>
                        </div>
                        <div>
                            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} autoComplete="off" className="space-y-4">
                                {/* Email Field */}
                                <div className="form-outline">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={credentials.email}
                                            onChange={handleChange}
                                            required
                                            autoComplete="off"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6946dd] focus:border-[#6946dd] pl-10"
                                        />
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 material-icons">person</span>
                                        <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-400">@</span>

                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="form-outline">
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            value={credentials.password}
                                            onChange={handleChange}
                                            required
                                            autoComplete="off"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6946dd] focus:border-[#6946dd] pl-10 pr-10"
                                        />
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 material-icons">lock</span>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(prev => !prev)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 material-icons">{showPassword ? 'visibility' : 'visibility_off'}</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setDialogForgotPassword(false)}
                                        className="text-sm font-normal text-gray-600 hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <div className="text-center pt-4 mb-5 pb-1">
                                    {msg && <span className="text-red-500 block mb-3">{msg}</span>}
                                    <button
                                        type="submit"
                                        className={`w-full py-3 text-white font-bold rounded-lg transition duration-200 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#6946dd] hover:bg-[#5237b6]'
                                            }`}
                                        disabled={loading}
                                    >
                                        {loading ? 'Logging in...' : 'Login'}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="text-center text-sm mt-4">
                            Don't Have an Account? Contact Admin
                        </div>

                        <div className="text-center text-sm pt-4">

                            {/* WhatsApp Link with Icon and Number */}
                            <div className="flex justify-center p-1">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://wa.me/971529048025?text=Hello MyTime2Cloud. I need your support."
                                    className="text-black flex items-center"
                                    aria-label="Contact via WhatsApp"
                                >
                                    {/* WhatsApp Icon - Using 'chat' as a standard placeholder or mdi-whatsapp if using a specific library */}
                                    For Technical Support : <span className="material-icons text-gray-600 text-base ml-2">
                                        phone
                                    </span>
                                    <span className="text-black hover:underline text-sm">
                                        +971 52 904 8025
                                    </span>
                                </a>
                            </div>

                            {/* Email Link */}
                            <div className="flex justify-center p-1">
                                <a
                                    href="mailto:support@mytime2cloud.com"
                                    className="text-black hover:underline flex items-center"
                                    aria-label="Email technical support"
                                >
                                    {/* Mail Icon */}
                                    <span className="material-icons text-gray-600 text-base mr-1">
                                        mail
                                    </span>
                                    support@mytime2cloud.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Content Column (Hidden on small screens) */}
                <div className="hidden lg:flex lg:w-7/12 pl-80  text-white about-content relative overflow-hidden">
                    <div className='relative z-10'>
                        <h4 className="text-2xl font-bold mb-4">About Mytime2Cloud</h4>
                        <p className="font-light mb-5">
                            MyTime2Cloud is an innovative and comprehensive platform meticulously crafted to redefine how organizations approach workforce management. By combining time attendance management with facial recognition access control, MyTime2Cloud simplifies and provides a streamlined experience for both employees and HR professionals.
                        </p>
                        <p className="font-light mb-5">
                            Customization and Reporting: The platform offers customizable settings to fit the specific needs of different organizations. It generates comprehensive reports and analytics based on attendance data, enabling informed decision-making and efficient resource allocation.
                        </p>
                        <h3 className="text-2xl font-bold pt-3 mb-4">Features</h3>
                        <ul className="font-light list-disc list-inside space-y-1">
                            <li>Employees management</li>
                            <li>Time Attendance</li>
                            <li>Leave management</li>
                            <li>Payroll management</li>
                            <li>Access Controll</li>
                            <li>Visitor management</li>
                            <li>Face Recognisation Integration</li>
                            <li>Custom Reports</li>
                            <li>Custom Dashboards</li>
                            <li>Email and Whatsapp Notifications</li>
                        </ul>
                        <div className="pt-8">
                            <div className="text-xl font-bold mb-5">Technical Support</div>


                            <p className="font-light flex items-center mb-2 text-sm">
                                <a
                                    href="tel:+971529048025"
                                    className="text-white hover:underline flex items-center"
                                    aria-label="Call technical support"
                                >
                                    {/* Phone Icon */}
                                    <span className="material-icons text-white text-lg mr-1">
                                        phone
                                    </span>
                                    +971 52 904 8025
                                </a>
                            </p>

                            {/* Email Link */}
                            <p className="font-light flex items-center text-sm">
                                <a
                                    href="mailto:support@mytime2cloud.com"
                                    className="text-white hover:underline flex items-center"
                                    aria-label="Email technical support"
                                >
                                    {/* Mail Icon */}
                                    <span className="material-icons text-white text-lg mr-1">
                                        mail
                                    </span>
                                    support@mytime2cloud.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals and Notifications */}
            <WhatsappVerificationDialog
                open={dialogWhatsapp}
                onClose={() => setDialogWhatsapp(false)}
                mobileNumber={maskMobileNumber}
                onVerify={handleCheckOTP}
            />
            {/* Forgot Password Dialog Placeholder - Replace with a real modal component */}
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${dialogForgotPassword ? 'block' : 'hidden'}`} onClick={() => setDialogForgotPassword(false)}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center pb-4 border-b">
                        <h4 className="text-xl font-bold">Forgot Password</h4>
                        <button onClick={() => setDialogForgotPassword(false)}>✖</button>
                    </div>
                    <div className="mt-4">
                        {/* Replace with actual ForgotPassword component logic */}
                        <p>Forgot Password Component Placeholder</p>
                    </div>
                </div>
            </div>


            <Snackbar
                open={snackbar}
                message={snackbarMessage}
                onClose={() => setSnackbar(false)}
            />
        </div>
    );
};

export default Login;