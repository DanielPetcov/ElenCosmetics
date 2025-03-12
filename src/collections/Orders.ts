import { CollectionConfig, PayloadRequest } from "payload";
import { Order } from "@/payload-types";
import path from 'path';
import ejs from 'ejs';


export const Orders: CollectionConfig = {
    slug: 'orders',
    fields: [
        {
            name: 'orderNumber',
            label: 'Order Number',
            type: 'number',
            unique: true,
            required: true
        },
        {
            name: 'customer',
            label: 'Customer (User ID)',
            type: 'relationship',
            relationTo: 'users',
            required: false
        },
        {
            name: 'guestInfo',
            label: 'Guest Information',
            type: 'group',
            fields: [
                { name: 'name', type: 'text' },
                { name: 'email', type: 'text' },
                { name: 'phone', type: 'text' },
            ],
        },
        {
            name: 'items',
            label: 'Ordered Items',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'product',
                    type: 'relationship',
                    relationTo: 'products',
                    required: true
                },
                {
                    name: 'quantity',
                    type: 'number',
                    min: 1,
                    required: true
                },
                {
                    name: 'totalPrice',
                    type: 'number',
                    required: true
                }
            ]
        },
        {
            name: 'shippingAddress',
            label: 'Shipping Address',
            type: 'group',
            fields: [
                { name: 'fullName', type: 'text', required: true },
                { name: 'street', type: 'text', required: true },
                { name: 'city', type: 'text', required: true },
                { name: 'zipCode', type: 'text', required: true },
                { name: 'phone', type: 'text', required: true },
            ],
        },
        {
            name: 'subtotal',
            type: 'number',
            required: true,
        },
        {
            name: 'shippingCost',
            type: 'number',
            required: true,
        },
        {
            name: 'totalAmount',
            type: 'number',
            required: true,
        },
        {
            name: 'discount',
            label: 'Discount',
            type: 'group',
            fields: [
                { name: 'code', type: 'text', required: false },
                {
                    name: 'type',
                    type: 'select',
                    options: ['fixed', 'percent'],
                    required: false
                },
                { name: 'value', type: 'number', required: false },
            ],
        },
        {
            name: 'status',
            type: 'select',
            required: true,
            defaultValue: 'pending',
            options: ['pending', 'shipped', 'delivered', 'cancelled'],
        },
        {
            name: 'createdAt',
            type: 'date',
            defaultValue: () => new Date().toISOString(),
        },
    ],
    access: {
        create: () => true
    },
    hooks: {
        // Trigger this after an order is created
        afterChange: [
            async ({ doc, operation, req }: { doc: Order, operation: any, req: PayloadRequest }) => {
                if (operation === 'create') {
                    const currentDate = new Date();
                    const month = currentDate.toLocaleString('default', { month: 'long' });
                    const year = currentDate.getFullYear();

                    // Replace with actual recipient email and subject
                    let recipientEmail = ''
                    if (doc.customer && typeof doc.customer === 'string') {
                        try {
                            const customer = await req.payload.findByID({
                                collection: 'users',
                                id: doc.customer,
                                depth: 1
                            })

                            if (customer && customer.email) {
                                recipientEmail = customer.email
                            }
                        } catch (error) {
                            console.error('Error fetching customer:', error);
                        }

                    }
                    if (!recipientEmail && doc.guestInfo && doc.guestInfo.email) {
                        recipientEmail = doc.guestInfo.email;
                    }

                    if (!recipientEmail) {
                        console.error('No email found for the order');
                        return; // Don't send email if no recipient email is found
                    }

                    const items = await Promise.all(doc.items.map(async (item) => {
                        const product = await req.payload.findByID({
                            collection: 'products',
                            id: typeof item.product === 'string' ? item.product : item.product.id,
                            locale: 'ro', // specify the locale
                        });

                        return {
                            productName: product.title, // assuming `title` is localized
                            quantity: item.quantity,
                            totalPrice: item.totalPrice,
                        };
                    }));

                    const templatePath = path.resolve(process.cwd(), 'src', 'app', 'utils', 'orderConfirmation', 'orderConfirmation.html');
                    const htmlContent = await ejs.renderFile(templatePath, {
                        month,
                        year,
                        items,
                        totalAmount: doc.totalAmount,
                    });

                    const subject = 'Order Confirmation';

                    try {
                        req.payload.sendEmail({
                            from: 'noreply@elencosmetic.com',
                            to: recipientEmail,
                            subject: subject,
                            html: htmlContent,
                        });
                        console.log('Order confirmation email sent!');
                    } catch (error) {
                        console.error('Error sending email:', error);
                    }
                }
            },
        ],
    },
};
