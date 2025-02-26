import { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
    slug: 'orders',
    fields: [
        {
            name: 'orderNumber',
            label: 'Order Number',
            type: 'text',
            unique: true,
            required: true
        },
        {
            name: 'customer',
            label: 'Customer',
            type: 'relationship',
            relationTo: 'users',
            required: true
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
                    name: 'price',
                    type: 'number',
                    required: true
                }
            ]
        },
        {
            name: "subtotal",
            label: "Subtotal",
            type: "number",
            required: true,
        },
        {
            name: "shippingCost",
            label: "Shipping Cost",
            type: "number",
            required: true,
        },
        {
            name: "totalAmount",
            label: "Total Amount",
            type: "number",
            required: true,
        },
        {
            name: "status",
            label: "Order Status",
            type: "select",
            required: true,
            defaultValue: "pending",
            options: ["pending", "shipped", "delivered", "cancelled"],
        },
        {
            name: "shippingAddress",
            label: "Shipping Address",
            type: "group",
            fields: [
              { name: "fullName", type: "text", required: true },
              { name: "street", type: "text", required: true },
              { name: "city", type: "text", required: true },
              { name: "zipCode", type: "text", required: true },
              { name: "phone", type: "text", required: true },
            ],
        },
        {
            name: "trackingNumber",
            label: "Tracking Number",
            type: "text",
        },
        {
            name: "createdAt",
            label: "Created At",
            type: "date",
            admin: { position: "sidebar" },
            defaultValue: () => new Date().toISOString(),
          },
    ]
}