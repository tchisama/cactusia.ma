import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

function page({}: Props) {
  return (
    <div className='container items-center flex flex-col gap-4 py-16'>
       <Heart size={100} strokeWidth='1' className='text-primary' />
       <h1 className='text-5xl'>Thank you for your order</h1>
       <p className='text-xl'>Your order has been confirmed. Our service will contact you shortly</p>
       <Link href={"/"}>
       <Button className='p-6 text-lg flex gap-2' variant={"outline"}><ArrowLeft/>Return to Home</Button>
       </Link>
    </div>
  )
}

export default page