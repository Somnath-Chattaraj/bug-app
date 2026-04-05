import { NextResponse } from 'next/server';

export async function GET() {
  const delay = 10000;
  console.log(`[${new Date().toISOString()}] Received request for /api/slow, delaying for ${delay}ms...`);

  await new Promise((resolve) => setTimeout(resolve, delay));

  return NextResponse.json({
    success: true,
    message: 'This data was delayed due to high latency implementation.',
    latency: delay,
  });
}