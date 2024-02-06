"use client"
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useCartStore from '@/store/cart'
import { ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CartItemUi from './CartItem'
import { getPriceByQuantity, getPriceWithDelivery } from '@/lib/pricing'
import TextEditable, { ChangeText, GetText } from '@/components/TextEditable'


type Props = {}

function page({}: Props) {
  const {cart} = useCartStore()
  return (
    <div className='relative py-4'>
      {
        cart.length > 0 ?
    <div className='container flex gap-8'>
      <div className='flex-1 flex flex-col gap-3'>
        <h1 className='text-xl text-end'>{cart.reduce((acc,item)=>acc +item.quantity,0)} cactuses</h1>
        {
          cart.map((_,i)=>{
            return(
              <CartItemUi index={i} item={_}/>
            )
          })
        }
      </div>
      <div className='min-w-[500px] p-5 sticky top-10 bg-white rounded-xl border h-fit shadow '>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-6'>
            <div>
              <h1><TextEditable reference={{page:"cart",ref:"cactuses price"}}></TextEditable></h1>
              <h1 className='text-xl'>{cart.reduce((acc,item)=>acc +item.quantity,0)*65} Dh</h1>
            </div>
            <div className='h-[50px] w-[1px] bg-slate-300'></div>
            <div>
              <h1><TextEditable reference={{page:"cart",ref:"delivery price"}}></TextEditable></h1>
              <h1 className='text-xl'>{cart.reduce((acc,item)=>acc +item.quantity,0)>=3 ? <span className='text-primary'>Free</span> : "35 Dh" }</h1>
            </div>
          </div>
          <div>
            <h1><TextEditable reference={{page:"cart",ref:"total price"}}></TextEditable></h1>
            <div className='flex gap-2 items-end'>
              <h1 className='text-5xl text-primary'>{
                  getPriceWithDelivery(cart.reduce((acc,item)=>acc +item.quantity,0))
                  } Dh</h1>
                  {
                    cart.reduce((acc,item)=>acc +item.quantity,0) >= 3 ?
                    <h4 className='line-through text-red-400 py-2'>{
                      cart.reduce((acc,item)=>acc +item.quantity,0) * 65 +35
                    } Dh</h4>
                    : null
                  }
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <ChangeText reference={{page:"cart",ref:"continue shopping"}}>
              <Link href={"/market"}>
                <Button className=' py-6 flex flex-row-reverse w-fit gap-2' variant={"outline"}><GetText reference={{page:"cart",ref:"continue shopping"}}></GetText> <ArrowLeft size={16}/></Button>
              </Link>
            </ChangeText>
            <ChangeText reference={{page:"cart",ref:"checkout"}}>
              <Link href={"/checkout"}>
                <Button className='w-full py-6 flex gap-4'><GetText reference={{page:"cart",ref:"checkout"}}></GetText>  <ArrowRight size={16}/></Button>
              </Link>
            </ChangeText>
          </div>
        </div>
      </div>
    </div>
      : <div className='py-12 flex items-center justify-center flex-col gap-4'>
        <h1 className='text-center text-3xl'>Your Cart Is Empty</h1>
        <Link href={"/market"}>
          <Button size="lg" className='rounded-full text-xl p-6 flex gap-3'>Start Shopping<ArrowRight/></Button>
        </Link>
      </div>
      }
    </div>
  )
}






export default page