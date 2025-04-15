import { NextRequest, NextResponse } from 'next/server';
import blogs from '@/data/blogs.json';

export async function GET(request: NextRequest) {
    // Return all blogs
    console.log(request);
    return NextResponse.json(blogs);
}
