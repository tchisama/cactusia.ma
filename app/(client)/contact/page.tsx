"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@/firebase"
import { toast } from "sonner"
import { useState } from "react"


const formSchema = z.object({
  fullName: z.string().min(2).max(50),
  number: z.string().min(2).max(50),
  message: z.string().min(2).max(50),
})

type Props = {}

function Page({}: Props) {
  const [leading,setLeading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      number: "",
      message: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLeading(true)
    addDoc(
      collection(db, "contacts"),
      {
        ...values,
        createdAt: new Date(),
      }
    ).then(() => {
      form.reset()
      toast("Message sent", {
        icon: "👍",
      })
      setLeading(false)
    })
  }
  return (
    <div className='py-6 container '>
      <h1 className="text-5xl">Contact us</h1>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-4xl mt-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number</FormLabel>
              <FormControl>
                <Input placeholder="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>

    </div>
  )
}

export default Page