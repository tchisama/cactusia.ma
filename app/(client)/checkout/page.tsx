"use client"
import React from 'react'
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
import * as z from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Check } from 'lucide-react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'
import useCartStore from '@/store/cart'
import { getPriceWithDelivery } from '@/lib/pricing'

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  number: z.string().min(2).max(50),
  address: z.string().min(5).max(100),
  city : z.string().min(2).max(50),
})


type Props = {}

function Page({}: Props) {
  const {cart , clearCart} = useCartStore()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    addDoc(
      collection(db, "orders"),
      {
        ...values,
        createdAt: new Date(),
        price: getPriceWithDelivery(cart.reduce((acc,item)=>acc +item.quantity,0)) ,
        cart,
      }
    ).then(()=>{
      clearCart()
    })
  }
  return (
    <div className='container'>
      <h1 className='text-4xl'>
        Checkout
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="  max-w-[700px]">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="first name" {...field} />
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
                    <Input type='number' placeholder="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='mt-2 p-6 text-lg  flex gap-4'>Checkout <Check/></Button>
          </form>
        </Form>
      </h1>
    </div>
  )
}

export default Page