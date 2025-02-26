'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "FirstName must be at least 2 characters.",
    }).max(50),
    secondName: z.string().min(2, {
        message: "SecondName must be at least 2 characters.",
    }).max(50),
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }).max(100, {
        message: "Password cannot exceed 100 characters"
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }).max(100, {
        message: "Password cannot exceed 100 characters"
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
});

const SignUpPage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            secondName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="flex flex-1 justify-center items-center">
            <div className='flex flex-col gap-10'>
                <h1 className='text-gray-700 text-2xl font-bold uppercase text-center'>Signup</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 flex flex-col items-center'>
                        <FormField
                            control={form.control}
                            name='firstName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-gray-700'>FirstName</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Petcov' className='text-gray-700 w-full md:w-96' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='secondName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-gray-700'>SecondName</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Daniel' className='text-gray-700 w-full md:w-96' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                        <Input type='password' placeholder='Super secret' className='text-gray-700 w-full md:w-96' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-gray-700'>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder='' className='text-gray-700 w-full md:w-96' {...field} />
                                    </FormControl>
                                    <FormMessage className='text-wrap' />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default SignUpPage;