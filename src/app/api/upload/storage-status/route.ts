import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // مؤقتاً نرجع بيانات وهمية لحد ما نوصل Cloudflare R2
    const data = {
      used: 0,
      limit: 1073741824,
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error checking storage:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check storage' },
      { status: 500 }
    );
  }
}