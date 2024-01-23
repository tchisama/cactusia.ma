import React from 'react'
type Props = {}
import Cactus from "@/public/cactusImages/4.png"
import Pot from "@/public/potsImages/3.png"
import Image from 'next/image'

function PotCactus({}: Props) {
  return (
    <div className='relative pt-20'>
        <div className='absolute -top-[80px] left-0 '>
            <Image src={Cactus} alt="Cactus" width={350} height={350} className='w-[250px]  mx-auto object-contain h-[230px]'></Image>
        </div>
        <Image src={Pot} alt="Cactus" width={350} height={350} className='w-[250px] object-contain h-[250px]'></Image>
    </div>
  )
}

export default PotCactus