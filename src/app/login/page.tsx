"use client";

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
// import { FcGoogle } from "react-icons/fc";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";
import illustration from '@/assets/login-illustration.svg';
import Link from 'next/link';

// Validation schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);
    // Add your login logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  };

  return (
    <div className="flex min-h-screen">
      {/* Form Section */}
      <div className="flex items-center justify-center w-full lg:w-1/2 px-4 py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Log in</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="johndoe"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <FaGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <FaMicrosoft className="mr-2 h-4 w-4" />
                Microsoft
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
            <div>Don&apos;t have an account? <Link href="/signup" className="underline underline-offset-4 hover:text-primary">Sign up</Link></div>
            <div><Link href="/forgot-password" className="underline underline-offset-4 hover:text-primary">Forgot password?</Link></div>
          </CardFooter>
        </Card>
      </div>

      {/* Image Section - Hidden on mobile */}
      <div className="hidden lg:flex items-center justify-center w-1/2">
        <div className="max-w-lg p-8">
          <Image
            src={illustration}
            alt="Login illustration"
            width={500}
            height={500}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Login;