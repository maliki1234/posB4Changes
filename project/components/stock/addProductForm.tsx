"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "../ui/use-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Card } from "../ui/card"

const profileFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    price: z.coerce.number({
        required_error: "Please select an email to display.",
    }),
    desc: z.string().max(160).min(4),
    expiredate: z.date()
        .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>



export function AddProductForm() {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        // defaultValues,
        mode: "onChange",
    })

    async function onSubmit(data: ProfileFormValues) {

        const response = await fetch('/api/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            }, body: JSON.stringify(data)
        })
        if (response.ok) {
            const b = await response.json()
            // console.log(b)
            toast({
                title: "success",
                description: " the priduct successfull added to the databae"
            })
        }
    }
    return (
        <Card className="m-3 p-3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">product name</FormLabel>
                                <FormControl>
                                    <Input placeholder="eg! eggchop" {...field} />
                                </FormControl>
                                <FormDescription>
                                    input field for pwoduct name
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="capitalize">product price</FormLabel>
                                <FormControl>
                                    <Input placeholder="20,000" type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    seling price per single product  item
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="desc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about the product"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    describe the product
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>

                    </div>
                    <Button type="submit">Register product</Button>
                </form>
            </Form>
        </Card>
    )
}