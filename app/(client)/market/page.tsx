import React from 'react'
import cactus from "@/public/images/cactus.png"
import Image from 'next/image'
type Props = {}

const page = (props: Props) => {
  return (
    <div className="">
        <div className='h-[60vh] w-full flex items-center justify-center bg-slate-100'>
            <Image src={cactus} alt="Cactus" width={500} height={500} className='w-ful object-contain h-full'></Image>
        </div>
        <div>
            <div>
                <h3>Price</h3>
                <h1>65 dh</h1>
            </div>
        </div>
    </div>
  )
}

export default page