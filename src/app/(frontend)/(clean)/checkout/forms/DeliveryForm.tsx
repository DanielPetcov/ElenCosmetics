import { Controller, UseFormReturn } from 'react-hook-form';
import { FormMessage } from "@/components/ui/form";
import InputField from "../components/InputField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckoutFormValues } from "../CheckoutSchema";

const formFields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'zipCode', label: 'Zip Code', type: 'text' },
];

const DeliveryForm = ({ form }: { form: UseFormReturn<CheckoutFormValues> }) => (
    <div className='flex flex-col gap-5'>
        <h2 className="text-gray-700 text-3xl md:text-4xl font-semibold uppercase">Livrare</h2>
        <div className='space-y-4 flex flex-col items-start'>
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
        {form.formState.errors.terms && <FormMessage>{form.formState.errors.terms.message}</FormMessage>}
    </div>
);

export default DeliveryForm;
