"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  const { data: session} =  useSession()
  // console.log(session)

  
  return (
    
    <>
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
     {session?.role === "ADMIN" || session?.role === "SUPERVISOR"  ?  <Link
        href="/profiles/user/adduser"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        add user
      </Link>:  null}
      <Link
        href="/profiles/user"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </Link>
      <Link
        href="/product"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Products
      </Link>
      {/* <Link
        href="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link> */}
    </nav>
    </>
  )
}
