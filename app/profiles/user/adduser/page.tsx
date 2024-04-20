"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z  from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSession } from 'next-auth/react'

// enum role {
//   SUPERVISOR: "SUPERVISOR",
//   EMPLOYEE : "EMPLOYEE"
// }

const formSchema = z.object({
  firstName: z.string().min(2, {message: 'Please enter your last name'}),
  lastName: z.string().min(2, {message: 'Please enter your last name'}),
  phoneNumber: z.coerce.number(),
  role:z.enum(['SUPERVISOR','EMPLOYEE', 'ADMIN']).nullable(),
  password: z.string().min(2, {message: 'Please enter your password'}),
})
export default function page() {
  const {data:session} = useSession()
  // console.log(session)
  const router = useRouter()
  const { toast } = useToast()

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    password: "0000"
  },
})

async function onSubmit(values: z.infer<typeof formSchema>) {

  // console.log(values)
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
        'Content-Type': "application/json"
    },
    body:JSON.stringify(values)
})
if (response.ok) {
   
    const b = await response.json()
    toast({
      title: "congratulation",
      description:`${b.message}`
  })
    router.push('/profiles/user')
   
} else {
   
    const b = await response.json()
    
    toast({
        variant: 'destructive',
        title: "ooops",
        description: `${b.message}`,
    })
}
}
  return (
    <>
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex px-6 flex-col gap-4'>
        <h3 className="text-primary text-2xl pt-3 uppercase text-center">
          add user
        </h3>
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
              <FormDescription>
                {/* This is your public display name. */}
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
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
            />
            <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {session?.role === "ADMIN" ? <SelectItem value="SUPERVISOR">supervisor</SelectItem>:""}
                  <SelectItem value="EMPLOYEE">employee</SelectItem>
                  {/* <SelectItem value="m@support.com">m@support.com</SelectItem> */}
                </SelectContent>
              </Select>
            
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
              {/* <FormDescription>
                this is your unique password
              </FormDescription> */}
              <FormMessage />
            </FormItem>)}
            /> 
            <div className="flex items-left">
             <Button type="submit">Add User</Button>

            </div>
             <div className="flex justify-end">
        {/* <Link href={'/auth/login'} className='text-xs' > have an account?</Link> */}
      </div> 
            </form>
    </Form>
    </>
  )
}
