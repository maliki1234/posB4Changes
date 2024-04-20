"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}
export type Product = {
    message: any
    id: number ,
    name: string,
    price: number,
    desc: string

}
export type User ={
    id: string,
    role: string,
    firstName: string,
    lastName: string,
    active: boolean,
}


const activeLambda = async (e: string)=>{
console.log(e)



    try {
      const respond = await fetch(
        process.env.NEXT_PUBLIC_URL + `/api/user/activate/${e}`,
        { cache: "no-store", method: "GET" }
      );
  
      if (!respond.ok) {
        throw new Error("failed to fetch error");
      }
  
    //   return window.location.reload()
    } catch (error) {
      return error
    }
  

location.reload()

}



const changeRole = async( e: string)=>{
    try {
        const respond = await fetch(
          process.env.NEXT_PUBLIC_URL + `/api/user/role/${e}`,
          { cache: "no-store", method: "GET" }
        );
    
        if (!respond.ok) {
          throw new Error("failed to fetch error");
        }
    
      //   return window.location.reload()
      } catch (error) {
        return error
      }

      location.reload()
}

const removeUser = async( e:string)=>{
    try {
        const respond = await fetch(
          process.env.NEXT_PUBLIC_URL + `/api/user/role/${e}`,
          { cache: "no-store", method: "DELETE" }
        );
    
        if (!respond.ok) {
          throw new Error("failed to fetch error");
        }
    
      //   return window.location.reload()
      } catch (error) {
        return error
      }

}


export const columns: ColumnDef<User>[] = [

    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                arial-label="Select all" />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false
    },

    {
        accessorKey: "firstName",
        header: ({ column }) => {
            return (
                <Button variant={'ghost'}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    first name
                    <ArrowUpDown className="ml-2 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "lastName",
        header: "last Name  ",
    },
    {
        accessorKey: "role",
        header: "role ",
    },
    {
        accessorKey: "active",
        header: "active ",
      
    },
    {
        accessorKey: "Business.name",
        header: "Business",
      
    },

    {
        accessorKey: "phoneNumber",
        header: () => <div className="text-right" >phoneNumber</div>,
        cell: ({ row }) => {
            const amount = row.getValue('phoneNumber')
            

            return <div className="text-right font-medium">{`+255${ amount}`}</ div>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const product = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} className="h-8 w-8 p-0">
                            <span className="sr-only">open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>
                            coppy user Id
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={()=> activeLambda(product.id)}>{ product.active? "deactive": "activate" } </DropdownMenuItem>
                        <DropdownMenuItem onClick={()=> changeRole(product.id)}> change role</DropdownMenuItem>

                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem onClick={()=> removeUser(product.id)}> remove user</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },

]
