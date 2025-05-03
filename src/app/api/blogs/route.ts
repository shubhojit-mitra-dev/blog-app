import { NextRequest, NextResponse } from 'next/server';
import blogs from '@/data/blogs.json';

export async function GET(request: NextRequest) {
  // Sort blogs by updatedAt date in descending order (newest first)
  console.log(request);
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  
  return NextResponse.json(sortedBlogs);
}
