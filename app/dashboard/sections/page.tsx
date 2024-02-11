"use client"
import React, { useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, storage } from '@/firebase'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Plus, Replace, Trash } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { ref, uploadBytes } from 'firebase/storage'

type Props = {}

function page({}: Props) {
  const [sliderImages, setSliderImages] = React.useState<string[]>([])
  const [file,setFile] = React.useState<File|null>(null)
  const [file2,setFile2] = React.useState<File|null>(null)
  const [aboutImage,setAboutImage] = React.useState("")
  useEffect(() => {
    getDoc(doc(db, "config", "HomeSlider")).then((doc) => {
      setSliderImages(doc.data()?.images as string[])
      setAboutImage(doc.data()?.aboutImage as string)
    })
  }, [])
   useEffect(()=>{
        if(!file) return
        const name1 = "" + Date.now() as string
        const storageRef = ref(storage, 'images/'+name1);
        uploadBytes(storageRef, file as File).then((snapshot) => {
           console.log(snapshot)
           if(sliderImages){
            updateDoc(
              doc(db, "config", "HomeSlider"),
              {
                images: [...sliderImages,"https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/images%2F"+name1+"?alt=media&token=03586f4b-ee20-48ee-a1a2-250567a2e2f9"]
              }
            )
           }else{
            updateDoc(
              doc(db, "config", "HomeSlider"),
              {
                images: ["https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/images%2F"+name1+"?alt=media&token=03586f4b-ee20-48ee-a1a2-250567a2e2f9"]
              }
            )
           }
        }).then(()=>{
          setSliderImages([...sliderImages,"https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/images%2F"+name1+"?alt=media&token=03586f4b-ee20-48ee-a1a2-250567a2e2f9"])
        });
  },[file]) 

  useEffect(()=>{
        if(!file2) return
        const name1 = "" + Date.now() as string
        const storageRef = ref(storage, 'images/'+name1);
        uploadBytes(storageRef, file2 as File).then((snapshot) => {
           console.log(snapshot)
            updateDoc(
              doc(db, "config", "HomeSlider"),
              {
                aboutImage: "https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/images%2F"+name1+"?alt=media&token=03586f4b-ee20-48ee-a1a2-250567a2e2f9"
              }
            )
           }
        ).then(()=>{
          setAboutImage("https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/images%2F"+name1+"?alt=media&token=03586f4b-ee20-48ee-a1a2-250567a2e2f9")
        });
  },[file2])
  const deleteImage=(index:number)=>{
    const newImages = sliderImages.filter((s,i)=>i!==index)
    updateDoc(
      doc(db, "config", "HomeSlider"),
      {
        images: newImages
      }
    )
    setSliderImages(newImages)
    setFile(null)
  }
  const moveImage = (index: number, direction: "left" | "right") => {
    const newImages = [...sliderImages]
    const temp = newImages[index]
    if (direction === "left") {
      newImages[index] = newImages[index - 1]
      newImages[index - 1] = temp
    } else {
      newImages[index] = newImages[index + 1]
      newImages[index + 1] = temp
    }
    setSliderImages(newImages)
    updateDoc(
      doc(db, "config", "HomeSlider"),
      {
        images: newImages
      }
    )
  }
  return (
    <div className=' relative p-4 pb-0 font-bold text-gray-700 h-screen flex flex-col'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl'>Sections</h1>
      </div>
      <div className='overflow-auto flex-1'>

      <h1 className='text-xl'>Home Slider Images</h1>
      <div className='py-8 '>
        <Carousel>
          <CarouselContent className='flex-1 mx-2 '>
            {
              sliderImages &&
              sliderImages.map((s,i)=>(
                <CarouselItem key={i} className='w-full relative border rounded-xl p-2 m-1 basis-1/4'>
                  <Image src={s} alt='' width={300} height={300} className='w-full rounded-xl aspect-square object-cover'></Image>
                  <div className='pt-2 flex  justify-between'>
                  <div className='flex gap-2'>
                    <Button onClick={()=>{moveImage(i,"left")}} size={"icon"} variant={"ghost"}><ArrowLeft size={18}></ArrowLeft></Button>
                    <Button onClick={()=>{moveImage(i,"right")}} size={"icon"} variant={"ghost"}><ArrowRight size={18}></ArrowRight></Button>
                  </div>
                  <Button onClick={()=>{deleteImage(i)}} size={"icon"} variant={"destructive"}><Trash size={18}></Trash></Button>
                  </div>
                </CarouselItem>
              ))
            }
            <CarouselItem className='w-full border rounded-xl p-8 basis-1/4 m-1 flex items-center justify-center'>
              <Button onClick={()=>{document.getElementById("image")?.click()}}><Plus /> Add New Image</Button>
              <input onChange={(e:any)=>{setFile(e.target.files?.[0])}} type="file" hidden id='image'></input>

            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <h1 className='text-xl mb-8'>About Section Image</h1>
      <div className='flex gap-2'>
        <Image src={aboutImage} alt='' width={300} height={300} className='bg-slate-200 w-[300px] h-[300px] rounded-xl aspect-square object-cover'></Image>
        <Button className='flex gap-2' onClick={()=>{document.getElementById("aboutImage")?.click()}}><Replace /> Change Image</Button>
        <input onChange={(e:any)=>{setFile2(e.target.files?.[0])}} type="file" hidden id='aboutImage'></input>
      </div>
      </div>

    </div>
  )
}

export default page