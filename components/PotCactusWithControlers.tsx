import React from 'react'
type Props = {}
import Cactus from "@/public/cactusImages/5.png"
import Pot from "@/public/potsImages/7.png"
import Image from 'next/image'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function PotCactusWithControllers({}: Props) {
  return (
    <div className='relative pt-20'>
        <div className='absolute md:-top-[150px] -top-[75px] left-0 '>
           <div className='relative'>
              <Button className='absolute text-primary top-1/2 w-14 h-14 rounded-full -left-6' variant="ghost" size="icon"><ChevronLeft size={35} /></Button>
              <Button className='absolute text-primary top-1/2 w-14 h-14 rounded-full -right-6' variant="ghost" size="icon"><ChevronRight size={35} /></Button>
              <Image src={Cactus} alt="Cactus" width={350} height={350} className='w-full md:h-[350px] md:w-[350px] scale-90 object-contain h-[230px]'></Image>
           </div>
        </div>
        <Button className='absolute text-primary top-1/2 w-14 h-14 rounded-full -left-12' variant="ghost" size="icon"><ChevronLeft size={35} /></Button>
        <Button className='absolute text-primary top-1/2 w-14 h-14 rounded-full -right-12' variant="ghost" size="icon"><ChevronRight size={35} /></Button>
        <Image src={Pot} alt="Cactus" width={350} height={350} className='w-[250px] md:h-[350px] md:w-[350px] object-contain h-[250px]'></Image>
    </div>
  )
}

export default PotCactusWithControllers