'use client'
import { ContactFormValues } from "./ContactSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { contactSchema } from "./ContactSchema";
import ContactInput from "./ContactInput";
import { useState } from 'react';

// ui
import {
    Form,
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dialog } from '@radix-ui/react-dialog';
import SuccessDialog from "../../../components/Dialogs/SuccesDialog";
import FailedDialog from "../../../components/Dialogs/FaildedDialog";
const ContactForm = () => {
    const [orderStatus, setOrderStatus] = useState<'success' | 'error' | null>(null);

    const defaultValues: ContactFormValues = {
        name: '',
        secondName: '',
        phone: '',
        email: '',
        message: '',
        terms: false,
    };

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues
    });

    const fields: { name: "name" | "secondName" | "email" | "phone" | "message"; type: string; placeholder: string; columns: 1 | 2 }[] = [
        { name: "name", type: "text", placeholder: "First Name", columns: 1 },
        { name: "secondName", type: "text", placeholder: "Last Name", columns: 1 },
        { name: "email", type: "email", placeholder: "Email", columns: 1 },
        { name: "phone", type: "tel", placeholder: "Phone", columns: 1 },
        { name: "message", type: "text", placeholder: "Message", columns: 2 },
    ];

    async function onSubmit(values: ContactFormValues) {
        console.log(values);
        setOrderStatus('success');
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="text-gray-700 flex flex-col gap-4" >
                <div className="grid grid-cols-2 gap-4">
                    {fields.map((field, index) => (
                        <ContactInput
                            key={index}
                            form={form}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            columns={field.columns}
                        />
                    ))}
                </div>
                <div>
                    <Controller
                        name="terms"
                        control={form.control}
                        render={({ field }) => (
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                                <Label htmlFor="terms" className='text-gray-500 text-xs md:text-sm'>Am luat la cunoștință despre politica de confidentialitate privind prelucrarea datelor cu caracter personal</Label>
                            </div>
                        )}
                    />
                    {form.formState.errors.terms && <FormMessage>{form.formState.errors.terms.message}</FormMessage>}
                </div>
                <Button type="submit" className="bg-custompink hover:bg-pink-400 focus:bg-pink-500 py-6 text-sm md:text-base">submit</Button>
                <Dialog open={orderStatus === 'success' || orderStatus === 'error'}>
                    {orderStatus === 'success' ?
                        <SuccessDialog
                            title='Felicitări! mesajul dvs. a fost trimis'
                        /> :
                        <FailedDialog
                            title='Ceva nu a mers bine.'
                            description='Vă rugăm să încercați din nou.'
                        />}
                </Dialog>
            </form>
        </Form>
    );
}

export default ContactForm;