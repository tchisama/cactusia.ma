import React from 'react'
import cactus from "@/public/images/cactus.png"
import Image from 'next/image'
import { Leaf, Palette } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import PotCactus from '@/components/PotCactus'
import PotCactusWithControllers from '@/components/PotCactusWithControlers'
import AboutCactus from '@/components/AboutCactus'
import Reviews from '@/components/Reviews'
type Props = {}

const page = (props: Props) => {
  return (
    <div className='container px-4 md:px-6 '>
    <div className="flex flex-col md:flex-row items-center  md:gap-20">
        <div className=' flex md:flex-[3] max-h-[50vh] md:max-h-[70vh] items-center justify-center '>
            {/* <Image src={cactus} alt="Cactus" width={500} height={500} className='w-ful object-contain h-full'></Image> */}
            <PotCactusWithControllers />
        </div>
        <div className=' md:flex-[2] w-full'>
            <div className='md:ml-2 space-y-2'>
                <h3 className='text-gray-500'>Price</h3>
                <h1 className='text-5xl font-light'>65.00 Dh</h1>
                <p className='p-2 px-3 w-fit rounded-xl bg-green-100 text-sm md:text-md text-green-800'>
Score free delivery on 3+ cactus pots! 🌵🚚</p>
                <Separator className='my-2 md:my-4 md:max-w-sm'/>
                <div className='flex justify-between'>
                    <h1 className='text-lg md:text-xl flex items-center gap-2'><Leaf />Ferocactus Echidne</h1>
                    <span className='text-gray-500'>1/5</span>
                </div>
                <div className='flex justify-between'>
                    <h1 className='text-lg md:text-xl flex items-center gap-2'><Palette />Vert foncé</h1>
                    <span className='text-gray-500'>1/5</span>
                </div>
            </div>
            <Separator className='my-2 md:my-4 md:max-w-sm'/>
            <div className='md:my-8 my-2 w-full '>
                <Button className='p-8 rounded-full w-full md:w-fit text-xl'>Add To Cart</Button>
            </div>
        </div>
    </div>
    <AboutCactus/>
    <Reviews />
    </div>
  )
}

export default page