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
import { split } from 'postcss/lib/list'
import { Session } from 'inspector'
import { useToast } from '@/components/ui/use-toast'
import { FaCommentsDollar } from 'react-icons/fa'
// import { toast } from '@/components/ui/use-toast'





const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.coerce.number(),
    // password: z.string().min(2, {message: 'Please enter your password'}),
  })
  
export default function page() {
  const { toast } = useToast()
    const { data: session , status } = useSession(
   
        )
        
const b = session?.user.name

// console.log( b)

const c = b?.split(' ')
// console.log(c[0])
        const [ses, setses] = useState()

        const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          values: {
            firstName: session?.user.name?.split(' ')[0],
            lastName: session?.user.name?.split(' ')[1],
          phoneNumber: session?.phoneNumber,
          },
        })



      const onsubmit = async(values: z.infer<typeof formSchema>)=>{
        // console.log(session)
          const response = await fetch(process.env.NEXT_PUBLIC_URL + `api/user/update/${session?.id}`,{
            method: 'PUT',
            body: JSON.stringify(values)
          })
          if (response.ok) {
            const data  = await response.json()

            // console.log(data)
            toast({
              title: "success ",
              description: data.message
            })
          }
        // console.log(values)
      }
 

    useEffect(() => {

      if (status === 'unauthenticated' || status === 'loading') {
        // return(
        //   <HashLoader color="#36d7b7" size={200}/>
        // )
      }
      else{
        // setses()
      }


    }, [])
    
  return (
    <> 
    {
      session? <Form {...form} >
      <form onSubmit={form.handleSubmit(onsubmit)} className='px-4 flex flex-col gap-4 px-4'>
        <h3 className="text-3xl text-center text-primary pt-4 uppercase">update your profile</h3>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
            />
            {/* <FormField
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
            />  */}
            <div className="flex items-left">
             <Button variant={'secondary'} type="submit">update your info</Button>

            </div>
             <div className="flex justify-end">
        {/* <Link href={'/auth/login'} className='text-xs' > have an account?</Link> */}
      </div> 
            </form>
    </Form>: "loading..."
    }
    </>
  )
}
