'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react'

import {
    Form,
    FormMessage,
} from "@/components/ui/form"

import InputField from './InputField'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { useCartStore } from '../../useCartStore'

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be at most 50 characters."),
    phone: z.string().min(2, "Phone number must be at least 2 characters.").max(50, "Phone number must be at most 50 characters."),
    email: z.string().email("Invalid email address."),
    address: z.string().min(2, "Address must be at least 2 characters.").max(100, "Address must be at most 100 characters."),
    city: z.string().min(2, "City must be at least 2 characters.").max(50, "City must be at most 50 characters."),
    zipCode: z.string().min(2, "Zip Code must be at least 2 characters.").max(20, "Zip Code must be at most 20 characters."),
    terms: z.boolean().refine(value => value === true, {
        message: "You must accept the terms.",
    }),
    numerar: z.boolean().refine(value => value === true, {
        message: "You must select a payment method.",
    }),
    customer: z.string().optional().nullable(),
    guestInfo: z.object({
        name: z.string().max(50),
        email: z.string().email(),
        phone: z.string().max(50),
    }).optional(),
    subtotal: z.number(),
    totalAmount: z.number(),
    shippingCost: z.number(),
    items: z.array(z.object({
        product: z.string(),
        quantity: z.number(),
        totalPrice: z.number(),
    }))
});

type FormFieldConfig = {
    name: string,
    label: string,
    type: string,
}

const formFields: FormFieldConfig[] = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'zipCode', label: 'Zip Code', type: 'text' },
];

const CheckoutForm = ({ userId }: { userId: string | null }) => {
    const items = useCartStore(state => state.items);

    const defaultValues = {
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        terms: false,
        numerar: false,
        customer: userId,
        guestInfo: {
            name: '',
            email: 'danielpetcov@gmail.com',
            phone: '',
        },
        subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
        totalAmount: items.reduce((total, item) => total + item.price * item.quantity, 0),
        shippingCost: 0,
        items: items.map(item => ({
            product: item.productId,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
        }))
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    useEffect(() => {
        form.reset({
            ...defaultValues, // Keep other values intact
            items: items.map(item => ({
                product: item.productId,
                quantity: item.quantity,
                totalPrice: item.price * item.quantity,
            })),
            subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
            totalAmount: items.reduce((total, item) => total + item.price * item.quantity, 0),
        });
    }, [items]);

    if (items.length === 0) {
        return <p>Your cart is empty</p>
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const orderData = {
            orderNumber: Math.floor(Math.random() * 1000000),
            customer: values.customer,
            guestInfo: userId ?
                {
                    name: '',
                    email: '',
                    phone: ''
                } : {
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                },
            items: values.items,
            shippingAddress: {
                fullName: values.name,
                street: values.address,
                city: values.city,
                zipCode: values.zipCode,
                phone: values.phone,
            },
            subtotal: values.subtotal,
            shippingCost: values.shippingCost,
            totalAmount: values.totalAmount,
            status: 'pending'
        }

        console.log(orderData);

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            })

            if (response.ok) {
                console.log('Order created successfully'); // Debugging statement
            } else {
                console.error('Failed to create order', response); // Debugging statement
            }
        } catch (error) {
            console.error('Failed to create order', error); // Debugging statement
        };
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-10 md:gap-20'>
                <div className='flex flex-col gap-5'>
                    <h2 className="text-gray-700 text-3xl md:text-4xl font-semibold uppercase">Livrare</h2>
                    <div className='space-y-4 flex flex-col items-start '>
                        {formFields.map((field, index) => (
                            <InputField
                                key={index}
                                form={form}
                                name={field.name}
                                type={field.type}
                                label={field.label}
                            />
                        ))}
                    </div>
                    <Controller
                        name="terms"
                        control={form.control}
                        render={({ field }) => (
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                                <Label htmlFor="terms" className='text-xs md:text-sm'>Am luat la cunoștință despre politica de confidentialitate privind prelucrarea datelor cu caracter personal</Label>
                            </div>
                        )}
                    />
                    {form.formState.errors.terms && (
                        <FormMessage>{form.formState.errors.terms.message}</FormMessage>
                    )}
                </div>
                <div className='flex flex-col gap-5'>
                    <h2 className="text-gray-700 text-3xl md:text-4xl font-semibold uppercase">Plată</h2>
                    <Controller
                        name="numerar"
                        control={form.control}
                        render={({ field }) => (
                            <div className="flex items-center space-x-2 border border-gray-300 p-5 rounded-lg">
                                <Checkbox id="numerar" checked={field.value} onCheckedChange={field.onChange} className='rounded-full' />
                                <Label htmlFor="numerar" className='text-gray-500'>Numerar la primire</Label>
                            </div>
                        )}
                    />
                    {form.formState.errors.numerar && (
                        <FormMessage>{form.formState.errors.numerar.message}</FormMessage>
                    )}
                    <Button onClick={() => (
                        console.log(form.formState.errors)
                    )} type="submit" className='bg-custompink hover:bg-pink-400 focus:bg-pink-500 py-6'>Submit</Button>
                </div>
            </form>
        </Form>
    )
}

export default CheckoutForm;