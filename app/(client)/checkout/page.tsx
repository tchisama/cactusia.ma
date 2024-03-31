"use client"
import React, { useEffect, useRef, useState } from 'react'
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
import {sha256} from "js-sha256"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Check, Loader, Loader2 } from 'lucide-react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'
import useCartStore from '@/store/cart'
import { getPriceWithDelivery } from '@/lib/pricing'
import { useRouter } from 'next/navigation'
import TextEditable, { ChangeText, GetText } from '@/components/TextEditable'
import emailjs from "@emailjs/browser"
import findUserIpAddress from '@/lib/findUserIpAddress'
const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  number: z.string().length(10),
  address: z.string().min(5).max(100),
  city: z.string().min(2).max(50),
})




type Props = {}

function Page({ }: Props) {
  const { cart, clearCart } = useCartStore()
  const route = useRouter()
  const [loading, setLoading] = useState(false)



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
    },
  })
  const form_ = useRef(null)
  const sendEmail = (e: any) => {
    if (!form_.current) return
    emailjs
      .sendForm('service_6crx1s4', 'template_67pg8nb', form_.current, {
        publicKey: 'YOfwR2uwUYxGg1WAb',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    addDoc(
      collection(db, "orders"),
      {
        ...values,
        createdAt: new Date(),
        price: getPriceWithDelivery(cart.reduce((acc, item) => acc + item.quantity, 0)),
        cart,
        status: "new"
      }
    ).then(() => {
      clearCart()
      route.push("/thank")
      const userIp = findUserIpAddress();
      // fetch(`https://graph.facebook.com/v19.0/${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
      //   }/events?access_token=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ACCESS_TOKEN
      //   }`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(
      //     {
      //       "data": [
      //         {
      //           "event_name": "Purchase",
      //           "event_id": crypto.randomUUID(),
      //           "event_time": Math.floor(Date.now() / 1000),
      //           "action_source": "website",
      //           "user_data": {
      //             "fn":[sha256(values.firstName)],
      //             "ln":[sha256(values.lastName)],
      //             "ph":[sha256(values.number)],
      //             "ct":[sha256(values.city)],
      //             "client_user_agent":navigator.userAgent,
      //             "client_ip_address": userIp  || "0.0.0.0"
      //             // "fbp":[_fbp]
                  
      //           },

      //           "custom_data": {
      //             "currency": "USD",
      //             "value": (getPriceWithDelivery(cart.reduce((acc, item) => acc + item.quantity, 0)) ?? 0) / 10,
      //           }
      //         }
      //       ],
            
      //       // "test_event_code": process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_TEST_EVENT_CODE
      //     }
      //   )
      // })
      sendEmail(values)
    })
  }
  return (
    <div className='container px-4 flex flex-col gap-4 items-center'>
      <h1 className='text-4xl w-full max-w-[700px]'>
        <TextEditable reference={{ page: "cart", ref: "checkoutTitle" }}></TextEditable>

      </h1>
      <Form {...form}>
        <form ref={form_} onSubmit={form.handleSubmit(onSubmit)} className="md:space-y-4 space-y-0 w-full max-w-[700px]">
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
                    <Input placeholder="first name" className='flex-1' {...field} />
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
                  <Input type='tel' placeholder="number" {...field} />
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
          <ChangeText reference={{ page: "cart", ref: "checkout checkoutPage" }}>
            <Button disabled={loading} type="submit" className='mt-6 p-8 px-10 w-full md:w-fit text-lg  flex gap-4'>
              {loading && <Loader2 size={16} className='animate-spin' />}
              <GetText reference={{ page: "cart", ref: "checkout checkoutPage" }}></GetText>  <Check /></Button>
          </ChangeText>
        </form>
      </Form>
    </div>
  )
}

export default Page