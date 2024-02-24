"use client"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import Cactus from "@/public/images/loading cactus.gif"
import { motion } from "framer-motion"
import { usePathname } from 'next/navigation'
type Props = {
  children: React.ReactNode
}

function LoadingProvider({children}: Props) {
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
     setLoading(false)    
    }, 2000)
  },[pathname])
  return (
    <div>
      {
        loading &&
      <motion.div  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='min-h-[55vh] bg-[#fcfefc] flex items-center justify-center'>
        <Image  src={Cactus} alt="Cactus" width={350} height={350} className='w-[250px] md:h-[350px] md:w-[350px] rounded-2xl object-contain h-[250px]'></Image>
      </motion.div>
      }
    <div className={cn("opacity-100",loading && "opacity-0")}>{
      children
    }</div>
    </div>
  )
}

export default LoadingProvider