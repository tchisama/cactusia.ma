import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import potcactus from "@/public/images/potcactus.png"
import Image from 'next/image'
import { Star } from 'lucide-react'
type Props = {}

function Reviews({}: Props) {
  return (
    <div className=' mt-20 md:w-full  '>
        <h1 className='md:text-5xl text-3xl'>Cactus Reviews </h1>
<Carousel className='  py-8 w-[90%] mx-auto'>
    <CarouselContent>
      {
        Array(5).fill(0).map((_, index) => (
          <CarouselItem key={index} className=' md:basis-2/3'>
            <div className='p-2  border bg-white rounded-2xl  flex  flex-col md:flex-row gap-8 md:items-center relative'>
            <Image src={potcactus} alt='' width={350} className='aspect-square object-cover rounded-xl w-fit md:w-[250px] ' height={350}></Image>
            <div className='flex-1 '>
              <h1 className='text-xl md:text-2xl uppercase '>khadija mohamed</h1>
              <div className='flex text-orange-400 gap-1 mb-4'>
              {
                [1,2,3,4,5].map(
                  i=> <Star size={16}></Star>
                )
              }
              </div>
              <p className='text-xs pb-2 max-w-xl md:text-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nihil dolorem facilis quasi suscipit, quidem in omnis reiciendis nostrum hic. Culpa blanditiis voluptatem, iure quod obcaecati illum voluptas quos at!</p>
            </div>
            </div>
          </CarouselItem>
        ))
      }
    </CarouselContent>
    <CarouselPrevious  />
    <CarouselNext   />
</Carousel>
    </div>

  )
}

export default Reviews