import { NextRequest, NextResponse } from 'next/server';
import blogs from '@/data/blogs.json';

export async function GET(request: NextRequest) {
    // Sort blogs by updatedAt date in descending order and take the latest 3
    console.log(request);
    const latestBlogs = [...blogs]
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 3);

    return NextResponse.json(latestBlogs);
}
