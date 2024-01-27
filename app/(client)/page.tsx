"use client"
import { Button } from "@/components/ui/button";
import { AlignLeftIcon, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Cactus from "@/public/images/cactus.png"
import {motion} from "framer-motion"
import Link from "next/link";
import home from "@/public/images/home.jpg"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


import img1 from '@/public/images/slider/1.jpg'
import img2 from '@/public/images/slider/2.jpg'
import img3 from '@/public/images/slider/3.jpg'
import img4 from '@/public/images/slider/4.jpg'
import img5 from '@/public/images/slider/5.jpg'
import img6 from '@/public/images/slider/6.jpg'
import img7 from '@/public/images/slider/7.jpg'
import img8 from '@/public/images/slider/8.jpg'
import img9 from '@/public/images/slider/9.jpg'
import img10 from '@/public/images/slider/10.jpg'



export default function Home() {
  return (
    <div className="h-[300vh] container relative">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between ">
        <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} className="flex flex-1 gap-4 flex-col items-start">
          <h1 className="md:text-6xl text-2xl text-center md:text-left font-extrabold text-gray-700 uppercase">Welcome to Your Cactus Haven!</h1>
          <h3 className="md:text-2xl text-sm font-bold text-center md:text-left uppercase text-gray-700">Explore and Discover a Prickly Paradise of Unique Cacti</h3>
          <Link href={"/market"}>
          <Button className="flex items-center sticky top-2 gap-4 text-xl rounded-full w-full md:w-fit p-8 md:p-10 ">Order Now <ArrowRight /></Button>
          </Link>
        </motion.div>
        <motion.div initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} className=" flex-1 flex items-center justify-end ">
          <Image src={Cactus} alt="Cactus" className="-translate-x-4 " width={500} height={450}></Image>
        </motion.div>
      </div>
      <motion.div initial={{opacity:0,y:100}} transition={{duration:0.6}} animate={{opacity:1,y:0}} className="flex gap-8 ">
        <Image src={home} alt="Cactus" width={350} height={350} className="aspect-square object-cover rounded-xl border"></Image>
        <div>
          <p className="text-3xl font-bold py-4">lorem lorem ipsum</p>
          <p className="text-2xl max-w-4xl">Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cumque, in blanditiis possimus at voluptatem neque dolores eum officia ratione, minus accusantium deleniti! Nulla minima quos dolorum nam qui corporis? ipsum dolor sit amet, consectetur adipisicing elit. Commodi libero sequi magni maiores sit optio, facere praesentium neque earum eaque obcaecati magnam, soluta voluptas impedit eligendi in quam. Possimus, ex?</p>
        </div>
      </motion.div>

        <Carousel className="my-8">
          <CarouselContent>
              {
                [
                  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10
                ].map((_, index) => (
            <CarouselItem className="basis-1/3" key={index}>
                  <Image src={_} alt="Cactus" width={450} height={450} className="aspect-square object-cover rounded-xl border"></Image>
            </CarouselItem>
                ))
              }
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

    </div>
  );
}
