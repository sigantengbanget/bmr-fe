'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, LoaderCircleIcon } from "lucide-react";
import Link from 'next/link'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const formSchema = z.object({
    email: z.string().email({ message: 'Email is not valid' }),
    password: z.string().min(6, { message: 'Password min 6 characters' }),
})

type FormValues = z.infer<typeof formSchema>

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    })

    const router = useRouter()

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });
            if (response?.ok) {
                toast.success("Login success")
                router.push(`/dashboard`)
            }else{
                toast.error(response?.error || "Login failed")
            }
        } catch (error:any) {
            toast.error("Login failed")
        }
    }

      const [showPassword, setShowPassword] = useState(false)

    return (

        <Card className="w-full max-w-sm shadow-2xl border-none bg-white/10 backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-white text-center text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            {...register('email')}
                            className={cn(
                                'mt-1 text-white !placeholder-white',
                                errors.email && 'border-red-500 focus-visible:ring-red-500'
                            )}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="relative">
                        <Label htmlFor="password" className="text-white">Password</Label>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            {...register('password')}
                            className={cn(
                                'mt-1 text-white pr-10 !placeholder-white',
                                errors.password && 'border-red-500 focus-visible:ring-red-500'
                            )}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-300 hover:text-white"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {errors.password && (
                            <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:brightness-110 transition duration-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <LoaderCircleIcon className='animate-spin text-white' /> : 'Login'}
                    </Button>
                </form>
                <div className="text-center mt-4 text-gray-100">
                    <p className='text-sm'>{`Don't have an account?`} <Link href={"/register"}> <span className='text-white font-semibold text-sm cursor-pointer'>Register</span> </Link></p>
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginForm
