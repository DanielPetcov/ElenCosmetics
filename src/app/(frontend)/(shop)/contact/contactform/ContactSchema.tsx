import { z } from 'zod';

export const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be at most 50 characters."),
    secondName: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be at most 50 characters."),
    email: z.string().email("Invalid email address."),
    phone: z.string().min(5, "Phone number must be at least 10 characters.").max(15, "Phone number must be at most 15 characters."),
    message: z.string().min(10, "Message must be at least 10 characters.").max(500, "Message must be at most 500 characters."),
    terms: z.boolean().refine(value => value === true, { message: "You must agree to the terms." }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
