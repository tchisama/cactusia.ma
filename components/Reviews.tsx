"use client"
import React, { useEffect, useState } from 'react'
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
import { Review } from '@/app/dashboard/reviews/page'
import { db } from '@/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
type Props = {}

function Reviews({}: Props) {
  const [reviews , setReviews] = useState<Review[]>([])
  useEffect(()=>{
    const unsub = onSnapshot(collection(db,"reviews"),(doc)=>{
      setReviews(
        doc.docs.map(d=>({...d.data() as Review , id: d.id}))
      )
      console.log(
        doc.docs.map(d=>({...d.data() as Review , id: d.id}))
      )
    })
    return ()=> unsub()
  },[])
  return (
    <div className=' mt-20 md:w-full  '>
        <h1 className='md:text-5xl text-3xl'>Reviews </h1>
<Carousel className='  py-8 relative mx-auto'>
    <CarouselContent>
      {
        reviews.map((review, index) => (
          <CarouselItem key={index} className=' md:basis-2/3'>
            <div className='p-2  bg-white rounded-2xl  flex  flex-col md:flex-row gap-8 md:items-center relative'>
              <Image  src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/reviews%2F${review.image}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} alt='' className=' z-10 relative w-full md:w-fit aspect-square rounded-xl object-cover ' width={200} height={200}>
              </Image>
            <div className='flex-1 '>
              <h1 className='text-xl md:text-2xl uppercase '>{review.name}</h1>
                <div className='flex py-2'>
                  {
                    new Array(review.rating).fill(0).map((s,i)=>(
                      <Star key={i}  size={14} className='fill-orange-400 text-orange-400'></Star>
                    ))
                    }
                  </div>
              <p className='text-xs pb-2 max-w-xl md:text-md'>{review.review.slice(0,400)}</p>
            </div>
            </div>
          </CarouselItem>
        ))
      }
    </CarouselContent>
    <CarouselPrevious className='hidden md:flex'/>
    <CarouselNext  className='hidden md:flex'/>
</Carousel>
    </div>

  )
}

export default Reviews