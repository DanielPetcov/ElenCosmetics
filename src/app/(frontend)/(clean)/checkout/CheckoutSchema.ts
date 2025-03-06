import { z } from 'zod';

export const formSchema = z.object({
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

export type CheckoutFormValues = z.infer<typeof formSchema>;
