"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { signOut } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z  from 'zod'

// import { useRouter } from 'next/router'

const formSchema = z.object({
  name: z.string().min(2, {message: 'Please enter your last name'}),
  // id:z.coerce.number(),
  
})
export default function page(prop) {
  const router = useRouter()
  const { toast } = useToast()

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    
  },
})

async function onSubmit(values: z.infer<typeof formSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
const b = {...values , id: parseInt(prop.params.id)}

  
  const response = await fetch('/api/business', {
    method: 'POST',
    headers: {
        'Content-Type': "application/json"
    },
    body:JSON.stringify(b)
})
if (response.ok) {
    // console.log(response)
    const b = await response.json()
    toast({
      title: "congratulation",
      description:`${b.message}`
  })
    // router.push('/')
    // redirect('/')
    signOut()
   return redirect('/auth/login')
   
} else {
    // console.error("Registrantion failed")
    // console.log(response.json())
    const b = await response.json()
    // console.log(b)
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
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
       
             <Button type="submit">Submit</Button>
        
            </form>
    </Form>
    </>
  )
}
