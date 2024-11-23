"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader } from "lucide-react"
import { IconBrandGoogle } from "@tabler/icons-react"
import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { isAuthenticated, login } = useAuth()
  const router = useRouter()
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin")
    }
  }, [isAuthenticated, router])

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    login('adfadsfs');
    setIsLoading(false)
    
    // try {
    //   const response = await fetch("http://localhost:8000/api/v1/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(credentials),
    //   })

    //   if (response.ok) {
    //     const data = await response.json()
    //     localStorage.setItem("access_token", data.access_token)
    //     setError(null)
    //     login(data.access_token)
    //   } else {
    //     const errorData = await response.json()
    //     setError(errorData.detail || "Login failed. Please check your credentials.")
    //   }
    // } catch (error) {
    //   setError("Invalid credentials")
    //   console.log(error)
    // } finally {
    //   setIsLoading(false)
    // }
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
              placeholder="admin"
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