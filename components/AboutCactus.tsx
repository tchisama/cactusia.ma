"use client"
import useCactusStore from '@/store/market'
import { Leaf } from 'lucide-react'
import React from 'react'
import TextEditable from './TextEditable'

type Props = {}

function AboutCactus({}: Props) {
  const {cactuses, activeCactus } = useCactusStore()
  return (
    <div className='mt-20'>
        <h1 className='md:text-5xl text-3xl'><TextEditable reference={{page:"market",ref:"about cactus"}}></TextEditable></h1>
        <h3 className='md:text-2xl text-xl text-green-600 flex gap-4 items-center'><Leaf/> {cactuses[activeCactus]?.name}</h3>
        <p className='max-w-5xl md:text-lg text-sm mt-2'>
          {cactuses[activeCactus]?.about}






        </p>
    </div>
  )
}

export default AboutCactus
