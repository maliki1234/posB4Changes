"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z  from 'zod'


const formSchema = z.object({
    name: z.string().min(2,{ message: 'Please enter a valid  name' }),
    quantity: z.string().min(2, {message: 'Please enter a valid quantity'})
})
export default function page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {

    }
  })

  async function onclick() {
    
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
          <Button type='submit'>add unity</Button>
        </form>
      </Form>
    </div>
  )
}
