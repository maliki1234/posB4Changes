"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z  from 'zod'

const formSchema = z.object({
    name: z.string().min(2,{message: 'Please enter name'}),
})

export default function page() {
    const {toast} = useToast()
    const route = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            
        }
    })

    const onsubmit = async (values: z.infer<typeof formSchema>) => {
        // console.log(values)

        const response = await fetch('/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body:JSON.stringify(values)
        })
        if (response.ok) {
            // console.log( await response.json())
            toast({
                title: "success",
                description: "add category"
            })
           
            route.push('/product/category')
            route.refresh()
        }

    }
  return (
        <Form  {...form}>
            <form className='px-6' onSubmit={form.handleSubmit(onsubmit)}>
                <Label className='text-3xl uppercase grid justify-center text-center py-6'> add category </Label>
                <FormField
                control={form.control}
                name="name"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>
                            category name
                        </FormLabel>
                        <FormControl>
                            <Input placeholder='dawa' {...field} />
                        </FormControl>
                    </FormItem>
                )}/>
                <Button className='my-4' type='submit'> create category</Button>
            </form>

        </Form>
  )
}
