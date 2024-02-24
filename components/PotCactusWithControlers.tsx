"use client"
import React, { useEffect, useState } from 'react'
type Props = {}
import Cactus from "@/public/cactusImages/5.png"
import Pot from "@/public/potsImages/3.png"
import Image from 'next/image'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import useCactusStore from '@/store/market'
import shadow from '@/public/Ellipse 1.png'
import logo from "@/public/images/logo.jpeg"
import { cn } from '@/lib/utils'

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
function PotCactusWithControllers({}: Props) {

  const {
    cactuses, setCactuses, pots, setPots,
    activeCactus, setActiveCactus,activePot, setActivePot
  } = useCactusStore()



const [loadingPot, setLoadingPot] = useState(true)
const [loadingCactus, setLoadingCactus] = useState(true)



  useEffect(()=>{
    const q = query(collection(db, "cactuses") , where("inStock", "==", true) , orderBy("order"));
    const unsub = onSnapshot(q, (doc) => {
        setCactuses(
          doc.docs.map(d=>({...d.data() as Cactus ,id : d.id }))
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

  const changeLeft = () => {
    setLoadingCactus(true)
    if(activeCactus > 0){
      setActiveCactus(activeCactus - 1)
    }else{
      setActiveCactus(cactuses.length - 1)
    }
  }
  const changeRight = () => {
    setLoadingCactus(true)
    if(activeCactus < cactuses.length - 1){
      setActiveCactus(activeCactus + 1)
    }else{
      setActiveCactus(0)
    }
  }

  const changePotLeft = () => {
    setLoadingPot(true)
    if(activePot > 0){
      setActivePot(activePot - 1)
    }else{
      setActivePot(pots.length - 1)
    }
  }
  const changePotRight = () => {
    setLoadingPot(true)
    if(activePot < pots.length - 1){
      setActivePot(activePot + 1)
    }else{
      setActivePot(0)
    }
  }

  return (
    <div className='relative pt-20  '>
        <div className='absolute  py-4 md:-top-[160px] -top-[55px] left-0 '>
           <div className='relative '>
              <Button onClick={changeLeft} className='absolute text-primary top-1/2 w-14 h-14 rounded-full -left-12 border' variant="ghost" size="icon"><ChevronLeft size={35} /></Button>
              <Button onClick={changeRight} className='absolute text-primary top-1/2 w-14 h-14 rounded-full -right-12 border' variant="ghost" size="icon"><ChevronRight size={35} /></Button>
              
              
              
              {/* <Image 
                src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/cactuses%2F${cactuses[activeCactus]?.image}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} 
                alt="Cactus" width={250} height={250} className='w-[200px] h-[200px] md:h-[350px] md:w-[350px] scale-90 object-contain  z-20 relative '></Image>
            
             */}


            <Image 
            src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/cactuses%2F${cactuses[activeCactus]?.image}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} 
            onLoadingComplete={()=>{setLoadingCactus(false)}}
            alt="Cactus" width={180} height={180} 
            className={cn('w-[200px] h-[200px] md:h-[350px] opacity-100 md:w-[350px] scale-90 object-contain  z-20 relative  ', loadingCactus && 'absolute opacity-0 w-0 h-0')}></Image>
            <Image 
            src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/cactuses%2F${cactuses[activeCactus]?.image}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} 
            alt="Cactus" width={80} height={80} 
            className={cn('absolute  md:h-[350px] opacity-0 w-0 h-0 md:w-[350px] scale-90 object-contain  z-20   ', loadingCactus && ' opacity-100 relative w-[200px] h-[200px] ')}></Image>


            
            
            </div>
        </div>
        <Button onClick={changePotLeft} className='absolute text-primary top-1/2 w-14 h-14 rounded-full -left-16 border' variant="ghost" size="icon"><ChevronLeft size={35} /></Button>
        <Button onClick={changePotRight} className='absolute text-primary top-1/2 w-14 h-14 rounded-full -right-16 border' variant="ghost" size="icon"><ChevronRight size={35} /></Button>






            <Image 
            src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/pots%2F${pots[activePot]?.image}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} 
            onLoadingComplete={()=>{setLoadingPot(false)}}
            alt="Cactus" width={180} height={180} 
            className={cn('w-[200px]   md:h-[350px] relative top-4 md:w-[350px] object-contain h-[200px] z-10 ', loadingPot && 'absolute opacity-0 w-0 h-0')}></Image>
            <Image 
            src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/pots%2F${pots[activePot]?.image}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} 
            alt="Cactus" width={80} height={80} 
            className={cn(' absolute opacity-0 w-0 h-0  md:h-[350px] top-4 md:w-[350px] object-contain  z-10 ', loadingPot && ' opacity-100 relative w-[200px] h-[200px] ')}></Image>





        <Image 
          src={shadow} 
          alt="Cactus" width={250} height={250} className='w-full md:h-[350px] md:w-[350px] scale-90 object-contain absolute -bottom-[115px] md:-bottom-[165px] opacity-60 z-0   h-[230px] '></Image>
        <Image 
          src={logo} 
          alt="Cactus" width={50} height={50} className='  scale-90 object-contain absolute bottom-[80px]  bg-blend-overlay  md:w-[60px] md:h-[60px] md:bottom-[140px] w-[40px] z-40 left-1/2 translate-x-[-50%]  h-[40px] '></Image>
    </div>
  )
}

export default PotCactusWithControllers