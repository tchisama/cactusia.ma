import { db } from '@/firebase'
import useCactusStore from '@/store/market'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import star from '@/public/images/christmas-stars.png'

import shadow from '@/public/Ellipse 1.png'
import logo from "@/public/images/logo.jpeg"
import pointer from '@/public/images/pointer.png'
type Props = {
}
type Cactus = {
  name: string
  about: string
  image: string
  inStock: boolean
  createdAt: Date
  order: number
  id: string
}

type Pot = {
  name: string
  about: string
  image: string
  inStock: boolean
  createdAt: Date
  order: number
  id: string
}
function PotCactus({}: Props) {
  const {cactuses,pots, setCactuses , setPots , activeCactus , setActiveCactus , activePot , setActivePot } = useCactusStore()

 useEffect(()=>{
    const q = query(collection(db, "cactuses") , where("inStock", "==", true) , orderBy("order"));
    const unsub = onSnapshot(q, (doc) => {
        setCactuses(
          doc.docs.map(d=>({...d.data() as  Cactus,id : d.id }))
        )
    });
    return()=> unsub()
  },[])
  useEffect(()=>{
    // i want to order with the .order and i want to get only inStock
    const q = query(collection(db, "pots") , where("inStock", "==", true) , orderBy("order"));
    const unsub = onSnapshot(q, (doc) => {
        setPots(
          doc.docs.map(d=>({...d.data() as Cactus ,id : d.id }))
        )
    });
    return()=> unsub()
  },[]) 

  const [intervalWork, setIntervalWork] = useState(true)
  useEffect(()=>{
    const interval = setInterval(()=>{
      if(intervalWork){
        changeRandom()
      }
    },4000)
    return ()=> clearInterval(interval)
  },[activeCactus,cactuses,setActiveCactus])
  const changeRandom = ()=>{
    setActiveCactus(Math.floor(Math.random()*cactuses.length))
    setActivePot(Math.floor(Math.random()*pots.length))
  }

  return (
    <div onClick={()=>{changeRandom(); setIntervalWork(false)}} className='relative cursor-pointer pt-20 py-4 md:py-20 drop-shadow-2xl'>
      <Image src={star} alt="star" className='absolute top-20 -left-5 drop-shadow-2xl z-20' width={100} height={100}/>
      <Image src={pointer} alt="star" className='absolute top-1/2 right-0 md:right-10 drop-shadow-2xl z-20 w-[70px] h-[70px] md:w-[100px] md:h-[100px]' width={100} height={100}/>
        <div className='absolute md:-top-[160px] -top-[85px] left-0 '>
            <Image 
            src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/cactuses%2F${cactuses[activeCactus]?.image}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} 
            alt="Cactus" width={350} height={350} className='w-[250px] md:h-[350px] md:w-[350px] mx-auto object-contain z-[12] relative h-[230px]'></Image>
        </div>
        <Image 
        src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/pots%2F${pots[activePot]?.image}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} 
        alt="Cactus" width={350} height={350} className='w-[250px] md:h-[350px] md:w-[350px] object-contain h-[250px] z-10 relative'></Image>

        <Image 
          src={shadow} 
          alt="Cactus" width={250} height={250} className='w-full md:h-[350px] md:w-[350px] scale-90 object-contain absolute -bottom-[80px] md:-bottom-[70px] opacity-60   h-[230px] '></Image>
        <Image 
          src={logo} 
          alt="Cactus" width={50} height={50} className=' bg-white p-2 opacity-70 rounded-xl scale-90 object-contain absolute top-1/2  bg-blend-overlay  md:w-[60px] md:h-[60px] md:bottom-[140px] w-[40px] z-10 left-1/2 translate-x-[-50%]  h-[40px] '></Image>
    </div>
  )
}

export default PotCactus