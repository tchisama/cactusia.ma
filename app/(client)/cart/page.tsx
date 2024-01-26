"use client"
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useCartStore from '@/store/cart'
import { ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CartItemUi from './CartItem'

type Props = {}

function page({}: Props) {
  const {cart} = useCartStore()
  console.log(cart)   
  return (
    <div className='relative'>
    <div className='container flex gap-8'>
      <div className='flex-1 flex flex-col gap-3'>
        {
          cart.map((_,i)=>{
            return(
              <CartItemUi index={i} item={_}/>
            )
          })
        }
      </div>
      <div className='min-w-[600px] p-5 sticky top-10 bg-white rounded-xl border h-fit shadow '>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-6'>
            <div>
              <h1>cactus Price</h1>
              <h1 className='text-xl'>150 Dh</h1>
            </div>
            <div className='h-[50px] w-[1px] bg-slate-300'></div>
            <div>
              <h1>delivery Price</h1>
              <h1 className='text-xl'>30 Dh</h1>
            </div>
          </div>
          <div>
            <h1>Total</h1>
            <div className='flex gap-2 items-end'>
              <h1 className='text-5xl'>150 Dh</h1>
              <h4 className='line-through  py-2'>180 Dh</h4>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Link href={"/market"}>
            <Button className=' py-6 flex flex-row-reverse w-fit gap-2' variant={"ghost"}>Continue Shopping <ArrowLeft size={16}/></Button>
            </Link>
            <Button className='w-full py-6 flex gap-4'>Checkout <ArrowRight size={16}/></Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}






export default page