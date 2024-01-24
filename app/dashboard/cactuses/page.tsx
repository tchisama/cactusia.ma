"use client"
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='p-4 font-bold text-gray-700'>
      <h1 className='text-3xl'>Cactuses</h1>
      <div className='flex flex-col gap-2 mt-8'>
      {
        [
          "https://firebasestorage.googleapis.com/v0/b/cactusia-adf86.appspot.com/o/cactus%2F1.png?alt=media&token=f98a2dc0-1971-4014-b82a-0c5cb8a55cce",
          "https://firebasestorage.googleapis.com/v0/b/cactusia-adf86.appspot.com/o/cactus%2F10.png?alt=media&token=f07fe8a1-d600-4985-b263-c4a3f89d919c"
        ].map((src,i)=>{
          
          return(
            <div key={i} className='bg-white  shadow border p-6 rounded-xl overflow-hidden flex gap-8'>
              <div className='flex items-end'>
              <div className='relative'>
                <Image  src={src} alt='' className='mb-4 z-10 relative' width={100} height={100}>
                </Image>
                <Image className='absolute z-[0] top-14 left-0'  src={"https://firebasestorage.googleapis.com/v0/b/cactusia-adf86.appspot.com/o/pots%2F1.png?alt=media&token=42e00519-9931-473e-8f5a-9f987645a634"} alt='' width={100} height={100}>
                </Image>
              </div>
              </div>
              <div className=''>
                <h2 className='w-[180px] mb-2'>Echinopsis Subdenudata</h2>
                <Switch />
              </div>
              <div className='flex-1'>
                <h2 className='text-sm  mb-2 text-gray-600'>About Cactus</h2>
                <p className='text-xs'>{"Ferocactus Echidne is a cactus species that is known for its large, round leaves and colorful flowers. It is a popular choice for indoor and outdoor use, particularly in tropical regions. Ferocactus Echidne is a cactus species that is known for its large, round leaves and colorful flowers. It is a popular choice for indoor and outdoor use, particularly in tropical regions. Ferocactus Echidne is a cactus species that is known for its large, round leaves and colorful flowers. It is a popular choice for indoor and outdoor use, particularly in tropical regions."}</p>
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