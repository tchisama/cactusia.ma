"use client"
import { Button } from '@/components/ui/button'
import { getPriceByQuantity } from '@/lib/pricing'
import useCartStore, { CartItem } from '@/store/cart'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {
  item:CartItem
  index:number
}

function CartItemUi({item,index}: Props) {
  const {updateQuantity} = useCartStore()
  return (
            <div className='flex justify-between  gap-4 p-0 bg-white border rounded-xl shadow'>
                <div className='relative pb-8 px-10  overflow-hidden   h-fit'>
                    <Image  src={"https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/cactuses%2F"+item.cactus+"?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567"} alt='' className='mb-8 z-10  relative' width={50} height={50}>
                    </Image>
                    <Image className='absolute z-[0] top-[28px] left-1/2 translate-x-[-50%]'  src={"https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/pots%2F"+item.pot+"?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567"} alt='' width={50} height={50}>
                    </Image>
                </div>
              <div className='flex-1 p-4'>
                <h1 className='text-sm'>Name of the cactus</h1>
                <h1 className='text-sm'>Color name</h1>
                <h1 className='text-md font-medium'>{65*item.quantity} Dh</h1>
              </div>
              <div className='flex p-4 items-center gap-4'>
                  <Button onClick={()=>updateQuantity(index,item.quantity -1)} variant={"outline"} className='rounded-full' size="icon"><Minus size={16}/></Button>
                  <label className=''>{item.quantity}</label>
                  <Button onClick={()=>updateQuantity(index,item.quantity +1)} variant={"outline"} className='rounded-full' size="icon"><Plus size={16}/></Button>
              </div>
            </div>
  )
}

export default CartItemUi