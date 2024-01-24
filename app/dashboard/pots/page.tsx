
"use client"
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='p-4 font-bold text-gray-700'>
      <div className='flex justify-between items-center'>
          <h1 className='text-3xl'>Pots</h1>
          
      </div>
      <div className='grid grid-cols-3 gap-2 mt-8'>
      {
        [
          "https://firebasestorage.googleapis.com/v0/b/cactusia-adf86.appspot.com/o/pots%2F1.png?alt=media&token=42e00519-9931-473e-8f5a-9f987645a634",
          "https://firebasestorage.googleapis.com/v0/b/cactusia-adf86.appspot.com/o/pots%2F2.png?alt=media&token=42e00519-9931-473e-8f5a-9f987645a634",
          "https://firebasestorage.googleapis.com/v0/b/cactusia-adf86.appspot.com/o/pots%2F3.png?alt=media&token=42e00519-9931-473e-8f5a-9f987645a634",
          "https://firebasestorage.googleapis.com/v0/b/cactusia-adf86.appspot.com/o/pots%2F4.png?alt=media&token=42e00519-9931-473e-8f5a-9f987645a634",
        ].map((src,i)=>{
          
          return(
            <div key={i} className='bg-white  shadow border p-6 rounded-xl overflow-hidden flex gap-8'>
              <div className='flex items-end'>
              <div className='relative'>
                <Image  src={src} alt='' className=' z-10 relative h-[80px] object-contain' width={100} height={80}>
                </Image>
              </div>
              </div>
              <div className=''>
                <h1 className='text-xl'>{i+1}</h1>
                <h2 className=' mb-2'>Echinopsis Subdenudata</h2>
                <Switch />
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default page
