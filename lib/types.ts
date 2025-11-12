// Prisma-like TypeScript types for database tables

export type Product = {
    id: string;
    name: string;
    description: string;
    price: string; // Decimal stored as string
    image_url?: string | null;
    category: string;
    stock: number;
    created_at: Date | string;
    updated_at: Date | string;
};

export type Comment = {
    id: string;
    product_id: string;
    author_name: string;
    author_email: string;
    content: string;
    rating?: number | null;
    created_at: Date | string;
};

export type ContactMessage = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: Date | string;
};

export type Testimonial = {
    id: string;
    author_name: string;
    content: string;
    rating?: number | null;
    is_featured: boolean;
    created_at: Date | string;
};

export type Profile = {
    id: string;
    email: string;
    role: string;
    created_at: Date | string;
};
