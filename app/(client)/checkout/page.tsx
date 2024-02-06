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
import { useRouter } from 'next/navigation'
import TextEditable, { ChangeText, GetText } from '@/components/TextEditable'

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
  const route = useRouter()
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
        status:"new"
      }
    ).then(()=>{
      clearCart()
      route.push("/thank")
    })
  }
  return (
    <div className='container flex flex-col gap-4 items-center'>
      <h1 className='text-4xl w-full max-w-[700px]'>
        <TextEditable reference={{page:"cart",ref:"checkoutTitle"}}></TextEditable>
      </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-[700px]">
            <div className='flex flex-col md:flex-row gap-4 w-full'>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="first name" className='flex-1' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="first name"  className='flex-1' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold text-sm'>City</FormLabel>
                  <FormControl>
                    <Input placeholder="city" {...field} />
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
            <ChangeText reference={{page:"cart",ref:"checkout checkoutPage"}}>
            <Button type="submit" className='mt-6 p-6 text-lg  flex gap-4'> <GetText reference={{page:"cart",ref:"checkout checkoutPage"}}></GetText>  <Check/></Button>
            </ChangeText>
          </form>
        </Form>
    </div>
  )
}

export default Page