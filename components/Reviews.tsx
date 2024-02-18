"use client"
import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselApi,
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
import TextEditable from './TextEditable'
import Autoplay from "embla-carousel-autoplay"

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  )
}

type Props = {}

function Reviews({}: Props) {
  const [reviews , setReviews] = useState<Review[]>([])
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)


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


  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])



  return (
    <div className=' mt-20 md:w-full  '>
        <h1 className='md:text-5xl text-3xl'><TextEditable reference={{page:"home",ref:"reviewsTitle"}}></TextEditable> </h1>
<Carousel 
      opts={
        {
          loop: true,

        }
      }
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
 setApi={setApi} className='  py-8 relative mx-auto'>
    <CarouselContent>
      {
        reviews.map((review, index) => (
          <CarouselItem key={index} className=' md:basis-2/5'>
            <div className='p-2  bg-white rounded-2xl border px-6  min-h-[200px] flex  flex-row md:flex-row gap-2 md:gap-8 md:items-center relative'>
              {
                  review.image!=="no image" ?
                  // <Image  src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/reviews%2F${review.image}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} alt='' className=' z-10 relative w-[30%] md:w-fit aspect-square rounded-xl object-cover ' width={200} height={200}>
                  // </Image>
                  null
                  :null
              }
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
      <div className='flex justify-center items-center gap-2 mb-4'>
        {
          new Array(reviews.length).fill("").map((s,i)=>(
            <div key={i} className={`w-2 h-2  rounded-full ${current===i+1 ? "bg-primary w-3 h-3" : "bg-slate-300"}`}></div>
          ))
        }
      </div>
    </div>

  )
}

export default Reviews