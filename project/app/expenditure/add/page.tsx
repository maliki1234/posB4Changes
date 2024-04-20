"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
// import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
// import router from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z  from 'zod'


const formSchema = z.object({
    name: z.string().min(2,{ message: 'Please enter a valid  name' }),
    // quantity: z.coerce.number().min(2, {message: 'Please enter a valid quantity'}),
    price: z.coerce.number().min(2, {message: 'Please enter a valid quantity'}),
})
export default function page() {
  const {toast} = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {

    }
  })
  const { data: session } = useSession()
  // console.log(session)

  async function onclick( value: z.infer<typeof formSchema>) {
    // console.log(value)
    value.user = parseInt(session.id)
    console.log(value.user)
    const response = await fetch('/api/expenditure', {
      method: 'POST',
      headers: {
          'Content-Type': "application/json"
      },
      body:JSON.stringify(value)
  })
  if (response.ok) {
      // console.log( await response.json())
      const exp = await response.json()

      toast({
      title: "success",
      description: `successfull added ${exp.message.name} as expenditure` 
      })
      router.push('/expenditure')
     
  }
  }
  return (
    <div className="">
      <Form {...form}>
        <form className='p-6' onClick={form.handleSubmit(onclick)}>
          <FormField
          control={form.control}
          name="name"
          render={({field})=>(
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='name' {...field}/>
              </FormControl>
              <FormDescription>
                this is you unity name
              </FormDescription>
            </FormItem>
          )}/>
          <FormField
          control={form.control}
          name="price"
          render={({field})=>(
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="number" placeholder='2000' {...field}/>
              </FormControl>
              <FormDescription>
                enter the price
              </FormDescription>
            </FormItem>
          )}/>
          <Button type='submit'>add expenditure</Button>
        </form>
      </Form>
    </div>
  )
}
