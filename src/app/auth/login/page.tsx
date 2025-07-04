import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "./components/user-auth-form"
import { Suspense } from "react"
import { useSession } from "next-auth/react"
import Loading from "@/components/common/Loading"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRedirectPath, TOKEN_KEY } from '@/utils/auth-utils';



export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <>
      {/* Mobile/Tablet: Show only the form, hide side image */}
      <div className="flex flex-col min-h-screen w-full md:hidden justify-center items-center bg-background px-4 py-8">
        <div className="w-full max-w-sm flex flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login to your account</h1>
            <p className="text-sm text-muted-foreground">Enter your email below to login to your account</p>
          </div>
          <Suspense fallback={<Loading />}>
            <UserAuthForm />
          </Suspense>
          <p className="px-2 text-center text-xs text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">Terms of Service</Link>{' '}and{' '}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">Privacy Policy</Link>.
          </p>
        </div>
      </div>
      {/* Desktop: Two-column layout */}
      <div className="container relative hidden min-h-screen w-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Side image and quote */}
        <div className="relative hidden h-full flex-col bg-muted p-8 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img
              src="/favicon.svg"
              alt='Icon'
              className="mr-4 h-6 w-6"
            />
            <p className="text-2xl">Eyecon AI</p>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This system allows me to manage critical anomalies effectively by offering real-time monitoring, simple editing, and easy scheduling—all through a user-friendly platform.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        {/* Form section */}
        <div className="flex items-center justify-center h-full lg:p-8 bg-background">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] px-4 py-8">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login to your account</h1>
              <p className="text-sm text-muted-foreground">Enter your email below to login to your account</p>
            </div>
            <Suspense fallback={<Loading />}>
              <UserAuthForm />
            </Suspense>
            <p className="px-2 text-center text-xs text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link href="/terms" className="underline underline-offset-4 hover:text-primary">Terms of Service</Link>{' '}and{' '}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}