import Image from 'next/image'
import React from 'react'
import logo from "@/public/images/logo.jpeg"
import Link from 'next/link'
import { Instagram } from 'lucide-react'

type Props = {}

function Footer({}: Props) {
  return (
    <div className='bg-slate-50'>

    <div className='container mt-20 mx-auto   flex flex-col  justify-center '>
      <div className='flex flex-col md:flex-row py-12 md:items-center p-4 justify-around gap-10 '>
        <div className='flex flex-col md:flex-row gap-8 items-start'>
          <Image src={logo} alt="Logo" className='object-contain' width={50} height={50}></Image>
          <p className='max-w-[500px] text-xs md:text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati quidem maxime veniam inventore neque ratione, ex impedit nobis, at tempore recusandae earum similique a explicabo nihil. Odio doloribus dolore atque!</p>
        </div>
        <div className='flex gap-8 '>
          <div className='flex flex-col gap-1 '>
            <Link href={"/"} className='text-sm md:text-md'>  Instagram</Link>
            <Link href={"/"} className='text-sm md:text-md'>  Facebook</Link>
            <Link href={"/"} className='text-sm md:text-md'>  Whatsapp</Link>
          </div>
          <div className='h-[100px] bg-slate-200 w-[1px] '></div>
          <div className='grid grid-cols-2 gap-x-3 gap-1 w-full'>
            <Link href={"/"} className='text-sm md:text-md'>Home</Link>
            <Link href={"/"} className='text-sm md:text-md'>About</Link>
            <Link href={"/"} className='text-sm md:text-md'>Market</Link>
            <Link href={"/"} className='text-sm md:text-md'>Contact</Link>
            <Link href={"/"} className='text-sm md:text-md'>Reviews</Link>
          </div>
        </div>
      </div>
      <p className='text-sm md:text-sm py-1 text-center '>Copyright © 2024 - All right reserved by Cactusia</p>
    </div>
    </div>
  )
}

export default Footer