import { NextResponse } from 'next/server';

let orders: any[] = []; // Temporary in-memory storage

export async function POST(req: Request) {
    const data = await req.json();
    orders.push(data); // In real-world, save to DB
    return NextResponse.json({ message: 'Order saved successfully!', success: true });
}

export async function GET() {
    return NextResponse.json({ orders }); // Return inside an object
}
