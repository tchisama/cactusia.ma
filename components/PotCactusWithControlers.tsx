"use client"
import React, { useEffect, useState } from 'react'
type Props = {}
import Cactus from "@/public/cactusImages/5.png"
import Pot from "@/public/potsImages/3.png"
import Image from 'next/image'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'

type Cactus = {
  name: string
  about: string
  image: string
  inStock: boolean
  createdAt: Date
  order: number
  id: string
}

function PotCactusWithControllers({}: Props) {
  const [cactuses , setCactuses] = useState<Cactus[]>([])
  const [activeCactus , setActiveCactus] = useState(0)
  useEffect(()=>{
    const unsub = onSnapshot(collection(db, "cactuses"), (doc) => {
        setCactuses(
          doc.docs.map(d=>({...d.data() as Cactus ,id : d.id }))
        )
    });
    return()=> unsub()
  })

  const changeLeft = () => {
    if(activeCactus > 0){
      setActiveCactus(activeCactus - 1)
    }else{
      setActiveCactus(cactuses.length - 1)
    }
  }
  const changeRight = () => {
    if(activeCactus < cactuses.length - 1){
      setActiveCactus(activeCactus + 1)
    }else{
      setActiveCactus(0)
    }
  }


  return (
    <div className='relative pt-20'>
        <div className='absolute md:-top-[150px] -top-[75px] left-0 '>
           <div className='relative'>
              <Button onClick={changeLeft} className='absolute text-primary top-1/2 w-14 h-14 rounded-full -left-7 border' variant="ghost" size="icon"><ChevronLeft size={35} /></Button>
              <Button onClick={changeRight} className='absolute text-primary top-1/2 w-14 h-14 rounded-full -right-7 border' variant="ghost" size="icon"><ChevronRight size={35} /></Button>
              <Image 
                src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/cactuses%2F${cactuses[activeCactus]?.image}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} 
                alt="Cactus" width={350} height={350} className='w-full md:h-[350px] md:w-[350px] scale-90 object-contain h-[230px]'></Image>
           </div>
        </div>
        <Button className='absolute text-primary top-1/2 w-14 h-14 rounded-full -left-12 border' variant="ghost" size="icon"><ChevronLeft size={35} /></Button>
        <Button className='absolute text-primary top-1/2 w-14 h-14 rounded-full -right-12 border' variant="ghost" size="icon"><ChevronRight size={35} /></Button>
        <Image src={Pot} alt="Cactus" width={350} height={350} className='w-[250px] md:h-[350px] md:w-[350px] object-contain h-[250px]'></Image>
    </div>
  )
}

export default PotCactusWithControllers