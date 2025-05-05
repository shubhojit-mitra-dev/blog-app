"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import contactIllustration from '@/assets/contact-me.svg';
import { motion } from 'motion/react';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactPage = () => {
  // Active field state for floating label animation
  const [activeField, setActiveField] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  // Watch form fields to check if they have content
  const watchFields = watch();

  const onSubmit = async (data: ContactFormValues) => {
    console.log('Form data submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('Thanks for your message! We will get back to you soon.');
  };

  // Check if a field has content or is active
  const isFieldActive = (fieldName: keyof ContactFormValues) => {
    return activeField === fieldName || (watchFields[fieldName] && watchFields[fieldName]?.length > 0);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-foreground">Get in Touch</h1>
        <p className="text-lg mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
          Have a question or want to work together? Fill out the form below, and I&apos;ll get back to you as soon as possible.
        </p>
        
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Contact Form Section */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 shadow-lg bg-card">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field with Floating Label */}
                <div className="relative">
                  <label 
                    htmlFor="name" 
                    className={`absolute transition-all duration-300 pointer-events-none ${
                      isFieldActive('name')
                        ? 'text-xs text-primary -translate-y-5'
                        : 'text-base text-muted-foreground translate-y-2 left-3'
                    }`}
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    className="pt-4 pb-2 bg-background/50 border-muted"
                    {...register("name")}
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field with Floating Label */}
                <div className="relative">
                  <label 
                    htmlFor="email" 
                    className={`absolute transition-all duration-300 pointer-events-none ${
                      isFieldActive('email')
                        ? 'text-xs text-primary -translate-y-5'
                        : 'text-base text-muted-foreground translate-y-2 left-3'
                    }`}
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    className="pt-4 pb-2 bg-background/50 border-muted"
                    {...register("email")}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Message Field with Floating Label */}
                <div className="relative">
                  <label 
                    htmlFor="message" 
                    className={`absolute transition-all duration-300 pointer-events-none ${
                      isFieldActive('message')
                        ? 'text-xs text-primary -translate-y-5'
                        : 'text-base text-muted-foreground translate-y-2 left-3'
                    }`}
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    className="pt-4 pb-2 min-h-[150px] bg-background/50 border-muted"
                    {...register("message")}
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField(null)}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/80 transition-colors duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2 inline-block h-4 w-4 border-2 border-t-transparent border-white rounded-full"></span>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Illustration Section */}
          <motion.div 
            className="w-full lg:w-1/2 hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full h-[600px]">
              <Image
                src={contactIllustration}
                alt="Contact Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
        
        {/* Additional Contact Info */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-foreground">Connect With Me</h2>
          <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-primary">📧</span>
              <a href="mailto:mitrashubhojit2005@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                mitrashubhojit2005@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">🔗</span>
              <a href="https://shubhojit-mitra-dev.vercel.app/portfolio" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                Portfolio
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;