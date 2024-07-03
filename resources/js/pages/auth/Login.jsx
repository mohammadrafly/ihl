import React, { useState, useEffect } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import { Head, router } from '@inertiajs/react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [csrf, setCsrf] = useState('');
    const [showError, setShowError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberToken, setRememberToken] = useState(false);

    useEffect(() => {
        const csrfToken = document.querySelector('meta[name="csrf"]').getAttribute('content');
        setCsrf(csrfToken);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf
                },
                body: JSON.stringify({ email, password, rememberToken }),
            });

            const data = await response.json();

            if (data.code === 200) {
                router.visit(data.redirect, { method: 'get' });
            } else {
                setError(data.message);
                setShowError(true);
                setTimeout(() => setShowError(false), 5000);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred. Please try again later.');
            setShowError(true);
            setTimeout(() => setShowError(false), 5000);
        }
    };

    return (
        <AuthLayout>
            {showError && (
                <div className="animate-slide-top-to-bottom bg-red-500 text-white text-center py-2 fixed top-0 left-0 right-0 z-50">
                    {error}
                </div>
            )}
            <Head title="Login" />
            <div className="lg:w-[500px] w-full px-5">
                <form onSubmit={handleSubmit} className="bg-white lg:shadow-md lg:p-8 rounded">
                    <h2 className="text-2xl font-bold mb-6 text-center uppercase">Login</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center px-5 text-gray-600"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remember">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={rememberToken}
                                onChange={(e) => setRememberToken(e.target.checked)}
                                className="mr-2 leading-tight"
                            />
                            Remember me
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
