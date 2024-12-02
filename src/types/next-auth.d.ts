

import "next-auth"
import { User as UserType } from "@/types/user"

declare module "next-auth" {
  interface User {
    id: string
    username: string
    role: string
  }

  interface Session {
    user: User & {
      id: string
      username: string
      role: string
    }
  }
}