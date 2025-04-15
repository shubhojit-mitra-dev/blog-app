import { NextRequest, NextResponse } from 'next/server';
import blogs from '@/data/blogs.json';

export async function GET(
    request: NextRequest,
    {params}: {params: Promise<{ id: string }>}
) {
    const {id} = await params;
    
    if (!id) {
        return NextResponse.json(
            { message: 'Invalid blog ID' },
            { status: 400 }
        );
    }

    // Find the blog with the matching ID
    const blog = blogs.find(blog => blog.id === parseInt(id, 10));

    if (!blog) {
        return NextResponse.json(
            { message: 'Blog not found' },
            { status: 404 }
        );
    }

    return NextResponse.json(blog);
}
