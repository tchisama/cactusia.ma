"use client"
import { Button } from "@/components/ui/button";
import { AlignLeftIcon, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Cactus from "@/public/images/cactus.png"
import {motion} from "framer-motion"

export default function Home() {
  return (
    <div className="h-[300vh] container">
      <div className="flex items-center justify-between ">
        <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} className="flex flex-1 gap-4 flex-col items-start">
          <h1 className="text-6xl font-bold uppercase">Welcome to Your Cactus Haven!</h1>
          <h3 className="text-2xl  font-bold uppercase">Explore and Discover a Prickly Paradise of Unique Cacti</h3>
          <Button className="flex items-center gap-4 text-xl rounded-full p-10 ">Order Now <ArrowRight /></Button>
        </motion.div>
        <motion.div initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} className=" flex-1 flex items-center justify-end ">
          <Image src={Cactus} alt="Cactus" width={500} height={450}></Image>
        </motion.div>
      </div>
    </div>
  );
}
