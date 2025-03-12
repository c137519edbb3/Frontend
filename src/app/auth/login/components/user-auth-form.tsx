// src/app/auth/login/components/user-auth-form.tsx
"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader } from "lucide-react"
import { IconBrandGoogle } from "@tabler/icons-react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { loginUser } from "@/utils/auth-api"
import { useAuth } from "@/context/authContext"
import { getRedirectPath } from "@/utils/auth-utils";
 
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // First get the token from your API
      const response = await loginUser(credentials.username, credentials.password);

      if (response.token) {
        // Store the token in your auth context
        login(response.token);
        
        // Get the appropriate redirect path based on user role in the token
        const redirectPath = getRedirectPath();
        
        // Use Next Auth for session management
        const result = await signIn('credentials', {
          redirect: false,
          username: credentials.username,
          password: credentials.password,
          callbackUrl: redirectPath, // Use the role-based redirect path instead of hardcoded '/admin'
        });

        if (result?.error) {
          console.log("signIn error:", result.error);
          setError(result.error)
          setIsLoading(false)
          return
        } 
        
        if (result?.url) {
          router.push(redirectPath); // Use our determined redirectPath instead of result.url
        } else {
          setError("Login failed. Please try again.");
          setIsLoading(false);
        }
      } else {
        setError("Invalid credentials");
        setIsLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
      setIsLoading(false)
    }
  }


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="ahmed@gmail.com"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              value={credentials.username}
              onChange={onChange}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          <Button disabled={isLoading}>
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <IconBrandGoogle className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}