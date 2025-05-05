import { NextRequest, NextResponse } from 'next/server';
import blogs from '@/data/blogs.json';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    
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
    
    try {
        // Convert the title to a slug format for finding the markdown file
        const slug = blog.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
        
        const contentPath = path.join(process.cwd(), 'src', 'content', `${slug}.md`);
        
        // Read the markdown file
        const content = await fs.readFile(contentPath, 'utf8');
        
        // Return the blog with the content
        return NextResponse.json({
            ...blog,
            content
        });
    } catch (error) {
        console.error('Error reading blog content:', error);
        return NextResponse.json(blog);
    }
}