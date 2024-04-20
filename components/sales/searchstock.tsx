"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

const FormSchema = z.object({
  product: z.coerce.number({
    required_error: "Please select a language.",
  }),
})

export default function SearchStock({prod}) {

  const [allProduct, setallProduct] = useState([])
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })


  
  const getProduct = async ()=>{
    try {
        const respond = await fetch(
          process.env.NEXT_PUBLIC_URL + "/api/product",
          { cache: "no-store", method: "GET" }
        );
    
        if (!respond.ok) {
          throw new Error("failed to fetch error");
        }
    
        const data = await respond.json();
        // return data.message
        setallProduct(data.message)
        
      
      } catch (error) {
        return error
      }
    
}

useEffect(() => {
   getProduct()

}, [])





  function onSubmit(data: z.infer<typeof FormSchema>) {
    prod(data)
  }

  return (
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-6  flex ">
       <div className="  pt-6 w-9/12 ">
       <FormField
          control={form.control}
      name="product"
          render={({ field }) => (
            <FormItem className=" ">
              
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? allProduct.find(
                            (language) => language.id === field.value
                          )?.name
                        : "Select product"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command className=" ">
                    <CommandInput className="p-6" placeholder="Search product..." />
                    <CommandEmpty>No product found.</CommandEmpty>
                    <CommandGroup className=" float-right  w-full">
                      {allProduct.map((language) => (
                        <CommandItem
                          value={language.name}
                          key={language.id}
                          onSelect={() => {
                            form.setValue("product", language.id)
                          }}
                        >
                          <Check
                            className={cn(
                              "h-4 w-4 text-center",
                              language.id === field.value
                                ? "opacity-100 "
                                : "opacity-0 "
                            )}
                          />
                          {language.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              
              <FormMessage />
            </FormItem>
          )}
        />
       </div>
        <div className="flex items-center px-4 justify-left">
        <Button variant={'ghost'} type="submit">add</Button>
        </div>
      </form>
    </Form>
  )
}
