// src/app/providers.tsx
'use client'

import { SessionProvider } from "next-auth/react"
import { AuthProvider as CustomAuthProvider } from "@/context/authContext"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CustomAuthProvider>
        {children}
      </CustomAuthProvider>
    </SessionProvider>
  )
}