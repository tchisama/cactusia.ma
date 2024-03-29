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


import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import AddReview from "@/components/AddReview";
import TextEditable, { ChangeText, GetText } from "@/components/TextEditable";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import PotCactus from "@/components/PotCactus";



export default function Home() {

  const [sliderImages, setSliderImages] = useState<string[]>([])
  const [aboutImage,setAboutImage] = useState("")
  useEffect(() => {
    getDoc(doc(db, "config", "HomeSlider")).then((doc) => {
      setSliderImages(doc.data()?.images as string[])
      setAboutImage(doc.data()?.aboutImage as string)
    })
  },[])
  return (
    <div className="  relative space-y-8">
      <div className="flex container flex-col-reverse md:flex-row items-center justify-between ">
        <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} className="flex flex-1 gap-4 flex-col items-center mb-6 md:items-start">
          <h1 className="md:text-5xl text-2xl text-center md:text-left font-extrabold text-gray-700 uppercase font-kanit">
            <TextEditable reference={{page:"home",ref:"heroTitle"}}>
            </TextEditable>
          </h1>
          <h3 className="md:text-xl text-sm font-medium text-center md:text-left text-gray-600">
            <TextEditable reference={{page:"home",ref:"heroSubTitle"}}>
            </TextEditable>
          </h3>
            <ChangeText reference={{page:"home",ref:"heroButton"}}>
              <Link href={"/market"}>
              <Button className="flex items-center sticky top-2 gap-4 text-xl rounded-full w-full md:w-fit p-8 md:p-10 ">
                <GetText reference={{page:"home",ref:"heroButton"}}></GetText>
              <ArrowRight /></Button>
              </Link>
            </ChangeText>
        </motion.div>
        <motion.div initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} className=" flex-1 flex items-center justify-end ">
          {/* <Image src={Cactus} alt="Cactus" className="-translate-x-4 " width={500} height={450}></Image> */}
          <PotCactus ></PotCactus>
        </motion.div>
      </div>
      <motion.div initial={{opacity:0,y:100}} transition={{duration:0.6}} animate={{opacity:1,y:0}} className="md:container">
        <Carousel
      
            opts={{
              
              loop: true,
            }} 
        className="my-8 mb-24">
          <CarouselContent>
              {
                sliderImages &&
                sliderImages
                .map((_, index) => (
                  <CarouselItem className="basis-1/2 md:basis-1/3" key={index}>
                        <Image src={_} alt="Cactus" width={450} height={450} className="aspect-square bg-slate-200 object-cover rounded-xl border"></Image>
                  </CarouselItem>
                ))
              }
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </motion.div>

      <motion.div initial={{opacity:0,y:100}} transition={{duration:0.6}} animate={{opacity:1,y:0}} className="flex flex-col md:flex-row container my-28 items-center gap-8 ">
        <Image src={aboutImage} alt="Cactus" width={350} height={350} className="aspect-square object-cover rounded-xl border w-full md:w-fit"></Image>
        <div className="flex flex-col items-start gap-8">
          <p className=" md:text-xl max-w-4xl">
            <TextEditable reference={{page:"home", ref:"homeParagraphSection"}}>
            </TextEditable>
          </p>
          <ChangeText reference={{page:"home",ref:"homeButton"}}>
              <Link href={"/market"}>
            <Button className="text-lg p-6 flex gap-3" >
              <GetText reference={{page:"home",ref:"homeButton"}}></GetText>
              <ArrowRight/></Button>
              </Link>
          </ChangeText>
        </div>
      </motion.div>
      <div className="my-10 container">
      <Reviews />
      <AddReview />
      </div>

    </div>
  );
}
