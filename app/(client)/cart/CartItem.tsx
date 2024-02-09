"use client"
import { Button } from '@/components/ui/button'
import { getPriceByQuantity } from '@/lib/pricing'
import useCartStore, { CartItem } from '@/store/cart'
import useCactusStore from '@/store/market'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {
  item:CartItem
  index:number
}

function CartItemUi({item,index}: Props) {
  const {updateQuantity} = useCartStore()
  const {cactuses,pots} = useCactusStore()
  return (
            <div className='flex justify-between  items-center md:items-start md:gap-4 p-0 bg-white border rounded-xl shadow'>
                <div className='relative pb-8 pt-2  px-4 md:px-10  overflow-hidden   h-fit'>
                    <Image  src={"https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/cactuses%2F"+item.cactus+"?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567"} alt='' className='mb-8 z-10  relative' width={40} height={40}>
                    </Image>
                    <Image className='absolute z-[0] top-[29px] left-1/2 translate-x-[-50%]'  src={"https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/pots%2F"+item.pot+"?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567"} alt='' width={40} height={40}>
                    </Image>
                </div>
              <div className='flex-1 p-4'>
                <h1 className='md:text-sm text-xs'>{cactuses.filter(cactus=>cactus.image === item.cactus)[0]?.name}</h1>
                <h1 className='md:text-sm text-xs'>{pots.filter(pot=>pot.image === item.pot)[0]?.name}</h1>
                <h1 className='md:text-md text-sm mt-1 font-medium'>{65*item.quantity} Dh</h1>
              </div>
              <div className='flex flex-col-reverse md:flex-row p-2 md:p-4 items-center md:gap-4'>
                  <Button onClick={()=>updateQuantity(index,item.quantity -1)} variant={"outline"} className='rounded-full w-8 h-8 md:w-10 md:h-10' size="icon"><Minus size={16}/></Button>
                  <label className=''>{item.quantity}</label>
                  <Button onClick={()=>updateQuantity(index,item.quantity +1)} variant={"outline"} className='rounded-full w-8 h-8 md:w-10 md:h-10' size="icon"><Plus size={16}/></Button>
              </div>
            </div>
  )
}

export default CartItemUi