'use client';

import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { createHighlighter } from 'shiki';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  const [highlighter, setHighlighter] = React.useState<import('shiki').Highlighter | null>(null);

  React.useEffect(() => {
    const loadHighlighter = async () => {
      const highlighter = await createHighlighter({
        themes: ['github-dark'],
        langs: ['javascript', 'typescript', 'jsx', 'tsx', 'html', 'css', 'json', 'markdown', 'bash', 'python'],
      });
      setHighlighter(highlighter);
    };

    loadHighlighter();
  }, []);

  if (!content) return <div>No content available</div>;
  
  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // Adds support for GitHub Flavored Markdown (tables, strikethrough, etc.)
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeSlug]} // Ensures HTML is safe and adds IDs to headings
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (!highlighter || !match) {
              // Fallback for when highlighter isn't loaded or no language specified
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }

            try {
              const code = String(children).replace(/\n$/, '');
              const html = highlighter.codeToHtml(code, { lang: language, theme: 'github-dark' });
              
              return (
                <div className="overflow-x-auto rounded-md" dangerouslySetInnerHTML={{ __html: html }} />
              );
            } catch (error) {
              console.error('Error highlighting code:', error);
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          },
          
          // Improved table styling
          table({ children }) {
            return (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border rounded-md border">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-muted/50">{children}</thead>;
          },
          th({ children }) {
            return (
              <th
                className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider"
              >
                {children}
              </th>
            );
          },
          td({ children }) {
            return <td className="px-6 py-4 whitespace-nowrap">{children}</td>;
          },
          
          // Image styling
          img({ src, alt }) {
            return (
              <Image 
                src={src || ''} 
                alt={alt || ''} 
                className="rounded-md mx-auto my-6 shadow-md max-w-full h-auto"
                width={800} // Replace with appropriate width
                height={600} // Replace with appropriate height
                layout="responsive"
              />
            );
          },
          
          // Heading styling with anchor links
          h1({ children }) {
            return <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{children}</h1>;
          },
          h2({ children, id }) {
            return (
              <h2 id={id} className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-10 first:mt-0">
                <a href={`#${id}`} className="no-underline hover:text-primary">{children}</a>
              </h2>
            );
          },
          h3({ children, id }) {
            return (
              <h3 id={id} className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8">
                <a href={`#${id}`} className="no-underline hover:text-primary">{children}</a>
              </h3>
            );
          },
          
          // Blockquote styling
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-primary pl-4 italic">
                {children}
              </blockquote>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;