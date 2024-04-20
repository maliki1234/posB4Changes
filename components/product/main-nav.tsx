import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/product/addproduct"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        add product
      </Link>
      <Link
        href="/product/category"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
         category
      </Link>
      <Link
        href="/product/category/addcategory"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        add category
      </Link>
      <Link
        href="/stock"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        stock
      </Link>
      
    </nav>
  )
}
