"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Description } from '@radix-ui/react-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z  from 'zod'


const formSchema = z.object({
    name: z.string().min(2, {message: 'please enter name'}),
    description: z.string().min(2, {message: 'please enter description'}),
    price: z.coerce.number().min(2, {message: 'please enter price'}),
    category:z.coerce.number().min(2, {message: 'please enter category'}),
    state: z.string()
})

export default function page(props) {
  const router = useRouter()
  // console.log(props)
  const {user} = props
  // console.log(user)
    const {toast} = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name,
            description: user.description,
            price: user.price,
            category: user.category.id

        }
    })
    const [category, setcategory] = useState([])
    useEffect(() => {
     
        const category = async () => {
            try {
                const respond = await fetch(
                  process.env.NEXT_PUBLIC_URL + "/api/category",
                  { cache: "no-store", method: "GET" }
                );
            
                if (!respond.ok) {
                  throw new Error("failed to fetch error");
                }
            
                const data = await respond.json();
                // console.log(data.message)
                // return data.message
                setcategory(data.message)
                
              
              } catch (error) {
                return error
              }
            
        }

    category()



    }, [])
    


    const onsubmit = async (value: z.infer<typeof formSchema>)=>{
       try {
        const response = await fetch(`/api/product/${user.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': "application/json"
          },
          body:JSON.stringify(value)
      })
      if (response.ok) {
          // console.log( await response.json())
          toast({
              title: "success",
              description: "update product"
          })
          location.reload();
      }
       } catch (error) {
        toast({
          title: "faiiled",
          description: "error"
        })
        // window.location(reload)
        // router.refresh()
       }
    }
  return (
   <>
   <Form {...form}>
        <form className='grid px-6  grid-cols-1 gap-4' onSubmit={form.handleSubmit(onsubmit)}>
            <FormField
            control={form.control}
            name="name"
            render={({field})=>(
            <FormItem>
                <FormLabel>
                    product name
                </FormLabel>
                <FormControl>
                    <Input placeholder='dawa' {...field}/>
                </FormControl>
            </FormItem>
  )}/>
  <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about the product"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> every detail about the product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
  <FormField
            control={form.control}
            name="price"
            render={({field})=>(
            <FormItem>
                <FormLabel>
                    product price
                </FormLabel>
                <FormControl>
                    <Input type='number' placeholder='10000' {...field}/>
                </FormControl>
            </FormItem>
  )}/>

<FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>state</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="change state" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">active</SelectItem>
                  <SelectItem value="freeze">freeze</SelectItem>
                </SelectContent>
              </Select>
             
              <FormMessage />
            </FormItem>
          )}
        />


  <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>category</FormLabel>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category for your product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    category.length > 0 ? category.map(category => (
                        <SelectItem value={category?.id}>{ category?.name}</SelectItem>
                 
                )): <SelectItem value='none'>please wait category is loading</SelectItem>
                  }
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage category{" "}
                <Link href="/product/category/">cattegory settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
           <div className="flex">
           <Button type='submit'> update product</Button>
           </div>
        </form>
   </Form>
   </>
  )
}
