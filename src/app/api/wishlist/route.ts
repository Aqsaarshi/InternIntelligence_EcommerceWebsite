import { NextResponse } from 'next/server';

type Order = {
    productId: string;
    quantity: number;
    // Add other fields as needed
};

const orders: Order[] = []; // Use const and proper type

export async function POST(req: Request) {
    const data = await req.json();
    orders.push(data);
    return NextResponse.json({ message: 'Order saved successfully!', success: true });
}

export async function GET() {
    return NextResponse.json({ orders });
}
