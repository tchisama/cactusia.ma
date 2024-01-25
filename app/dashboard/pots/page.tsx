
"use client"
import CreateNewPot from '@/components/CreateNewPot'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { db } from '@/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Props = {}


type Pot = {
  name: string
  image: string
  inStock: boolean
  createdAt: Date
  order: number
  id: string
}

const page = (props: Props) => {
  const [pots , setPots] = useState<Pot[]>([])
  useEffect(()=>{
    const unsub = onSnapshot(collection(db, "pots"), (doc) => {
        setPots(
          doc.docs.map(d=>({...d.data() as Pot ,id : d.id }))
        )
    });
    return()=> unsub()
  },[])
  
  return (
    <div className='p-4 font-bold text-gray-700'>
      <div className='flex justify-between items-center'>
          <h1 className='text-3xl'>Pots</h1>
          <CreateNewPot />
      </div>
      <div className='grid grid-cols-3 gap-2 mt-8'>
      {
        // [
        //   "https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/1.png?alt=media&token=a1e0aa65-9270-4f04-b175-02e2a7ae919f",
        // ]
        pots.map((pot,i)=>{
          
          return(
            <div key={i} className='bg-white  shadow border p-6 rounded-xl overflow-hidden flex gap-8'>
              <div className='flex items-end'>
              <div className='relative'>
                <Image  src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/pots%2F${pot.image}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} alt='' className=' z-10 relative h-[80px] object-contain' width={100} height={80}>
                </Image>
              </div>
              </div>
              <div className=''>
                <h1 className='text-xl'>{i+1}</h1>
                <h2 className=' mb-2'>{pot.name}</h2>
                <Switch checked={pot.inStock} />
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
