"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import HashLoader from "react-spinners/HashLoader";





const formSchema = z.object({
    firstName: z.string().min(2, {message: 'Please enter your last name'}),
    lastName: z.string().min(2, {message: 'Please enter your last name'}),
    phoneNumber: z.coerce.number(),
    password: z.string().min(2, {message: 'Please enter your password'}),
  })
  
export default function page() {
    const { data: session , status } = useSession(
   
        )
        

        console.log(status)

        
        const [ses, setses] = useState()

        const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
          //   firstName: session?.user.pNumber
          phoneNumber: session?.phoneNumber
          },
        })



      const onSubmit = ()=>{

      }
 

    useEffect(() => {

      if (status === 'unauthenticated' || status === 'loading') {
        // return(
        //   <HashLoader color="#36d7b7" size={200}/>
        // )
      }
      else{
        
      }


    }, [])
    
  return (
    <> 
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className='px-4'>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type='number' placeholder="0123456789" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
            />
            <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                this is your unique password
              </FormDescription>
              <FormMessage />
            </FormItem>)}
            /> 
             <Button type="submit">update your info</Button>
             <div className="flex justify-end">
        {/* <Link href={'/auth/login'} className='text-xs' > have an account?</Link> */}
      </div> 
            </form>
    </Form>
    </>
  )
}
