'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import Link from 'next/link'

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React from 'react'

const formSchema = z.object({
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
    }).max(50),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }).max(50),
})

const LoginForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                router.push('/account')
            } else {
                console.log('bad')
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex flex-col gap-5 md:gap-8'>
            <h1 className='text-gray-700 text-2xl font-bold uppercase text-center'>Login</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 flex flex-col items-center'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-700'>Email</FormLabel>
                                <FormControl>
                                    <Input type='email' placeholder='email@gmail.com' className='text-gray-700 w-full md:w-96' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-700'>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder='Super secret' className='text-gray-700 w-full md:w-96' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            <div className='flex gap-2 items-baseline justify-center flex-wrap'>
                <span className='text-gray-500 text-sm md:text-base'>Don&apos;t have an account?</span><Link href="/signup" className='text-gray-500 underline text-sm md:text-base'>Signup</Link>
            </div>
        </div>
    )
}

export default LoginForm;