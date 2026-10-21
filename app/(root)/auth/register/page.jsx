"use client"

import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, registerSchema } from '@/lib/zodScehma'
import z from 'zod'
import { WEBSITE_LOGIN } from '@/app/routes/websiteRoutes'

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const formSchema = registerSchema.pick({
        name: true, email: true, password: true
    }).extend({
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Password and Confirm Password must be same",
        path: ["confirmPassword"]
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "", password: "", name: "", confirmPassword: ""
        }
    })

    const RegisterHandler = async (value) => {
        setLoading(true)
        try {
            console.log(value)
            // Add your login API call here
            form.reset();
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-10">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                        <Lock size={26} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create an account</h1>
                    <p className="mt-2 text-sm text-slate-500">Register to get started</p>
                </div>

                <Card className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
                    <CardContent className="p-6 sm:p-8">
                        <form className="space-y-5" onSubmit={form.handleSubmit(RegisterHandler)}>
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-slate-700">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Muhammad Mustafa"
                                        autoComplete="name"
                                        {...form.register('name')}
                                        aria-invalid={!!form.formState.errors.name}
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>
                                {form.formState.errors.name && (
                                    <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                    Email address
                                </label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        {...form.register('email')}
                                        aria-invalid={!!form.formState.errors.email}
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>
                                {form.formState.errors.email && (
                                    <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                    Password
                                </label>

                                <div className="relative">
                                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        autoComplete="new-password"
                                        {...form.register('password')}
                                        aria-invalid={!!form.formState.errors.password}
                                        className={`h-12 w-full rounded-xl border bg-slate-50/50 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 ${form.formState.errors.password
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-slate-200 focus:border-indigo-500'
                                            }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-slate-700"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {form.formState.errors.password && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                                    Confirm Password
                                </label>

                                <div className="relative">
                                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="confirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Confirm your password"
                                        autoComplete="new-password"
                                        {...form.register('confirmPassword')}
                                        aria-invalid={!!form.formState.errors.confirmPassword}
                                        className={`h-12 w-full rounded-xl border bg-slate-50/50 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 ${form.formState.errors.confirmPassword
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-slate-200 focus:border-indigo-500'
                                            }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-slate-700"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {form.formState.errors.confirmPassword && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    className="h-4 w-4 rounded cursor-pointer border-slate-300 accent-indigo-600"
                                />
                                <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                                    Remember me
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-12 w-full items-center cursor-pointer justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading ? (
                                    <>
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Registering....
                                    </>
                                ) : (
                                    <>
                                        Register <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="my-6 flex items-center gap-4">
                            <div className="h-px flex-1 bg-slate-200" />
                            <span className="text-xs text-slate-400">SECURE REGISTER</span>
                            <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        <p className="text-center text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link
                                href={WEBSITE_LOGIN}
                                className="font-semibold text-indigo-600 transition hover:text-indigo-700"
                            >
                                Sign in
                            </Link>
                        </p>
                    </CardContent>
                </Card>

                <p className="mt-6 text-center text-xs text-slate-400">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    )
}

export default RegisterPage
