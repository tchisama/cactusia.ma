"use client"
import { Button } from "@/components/ui/button";
import { AlignLeftIcon, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Cactus from "@/public/images/cactus.png"
import {motion} from "framer-motion"
import Link from "next/link";

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
    </div>
  );
}
