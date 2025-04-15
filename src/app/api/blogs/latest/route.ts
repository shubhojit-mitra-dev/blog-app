import { NextRequest, NextResponse } from 'next/server';
import blogs from '@/data/blogs.json';

export async function GET(request: NextRequest) {
    // Sort blogs by createdAt date in descending order and take the latest 3
    console.log(request);
    const latestBlogs = [...blogs]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3);

    return NextResponse.json(latestBlogs);
}
