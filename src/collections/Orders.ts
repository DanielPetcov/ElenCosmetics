import { CollectionConfig } from "payload";

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
    }
};
