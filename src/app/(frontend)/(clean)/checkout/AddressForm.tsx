'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
    Form,
} from "@/components/ui/form"

import InputField from './InputField'

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }).max(50),
    phone: z.string().min(2, {
        message: "Phone must be at least 2 characters.",
    }).max(50),
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
    }).max(50),
    address: z.string().min(2, {
        message: "Address must be at least 2 characters.",
    }).max(50),
    city: z.string().min(2, {
        message: "City must be at least 2 characters.",
    }).max(50),
    zipCode: z.string().min(2, {
        message: "Zip Code must be at least 2 characters.",
    }).max(50),
})

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

const AddressForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            zipCode: ''
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 flex flex-col items-start'>
                {formFields.map((field, index) => (
                    <InputField
                        key={index}
                        form={form}
                        name={field.name}
                        type={field.type}
                        label={field.label}
                    />
                ))}
            </form>
        </Form>
    )
}

export default AddressForm;