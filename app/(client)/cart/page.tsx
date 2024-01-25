import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

function page({}: Props) {
  return (
    <div className='relative'>
    <div className='container flex gap-8'>
      <div className='flex-1 flex flex-col gap-3'>
        {
          new Array(9).fill(0).map((_,i)=>{
            return(
              <div className='flex justify-between  gap-4 p-0 bg-white border rounded-xl shadow'>
                  <div className='relative pb-10 px-10  overflow-hidden   h-fit'>
                      <Image  src={"https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/cactuses%2F1706097332390?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567"} alt='' className='mb-8 z-10  relative' width={50} height={50}>
                      </Image>
                      <Image className='absolute z-[0] top-[30px] left-1/2 translate-x-[-50%]'  src={"https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/1.png?alt=media&token=a1e0aa65-9270-4f04-b175-02e2a7ae919f"} alt='' width={50} height={50}>
                      </Image>
                  </div>
                <div className='flex-1 p-4'>
                  <h1 className=''>Name of the cactus</h1>
                  <h1 className='text-sm'>Color name</h1>
                </div>
                <div className='flex p-4 items-center gap-2'>
                    <Button variant={"outline"} className='rounded-full' size="icon"><Plus size={16}/></Button>
                    <label className=''>2</label>
                    <Button variant={"outline"} className='rounded-full' size="icon"><Minus size={16}/></Button>
                </div>
              </div>
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
            <Button className=' py-6 flex w-fit gap-4' variant={"ghost"}>Continue Shopping <ArrowRight size={16}/></Button>
            <Button className='w-full py-6 flex gap-4'>Checkout <ArrowRight size={16}/></Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default page