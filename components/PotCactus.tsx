import React from 'react'
type Props = {}
import Cactus from "@/public/cactusImages/4.png"
import Pot from "@/public/potsImages/3.png"
import Image from 'next/image'

function PotCactus({}: Props) {
  return (
    <div className='relative pt-20'>
        <div className='absolute md:-top-[160px] -top-[80px] left-0 '>
            <Image src={Cactus} alt="Cactus" width={350} height={350} className='w-[250px] md:h-[350px] md:w-[350px] mx-auto object-contain h-[230px]'></Image>
        </div>
        <Image src={Pot} alt="Cactus" width={350} height={350} className='w-[250px] md:h-[350px] md:w-[350px] object-contain h-[250px]'></Image>
    </div>
  )
}

export default PotCactus