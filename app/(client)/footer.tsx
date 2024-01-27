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
      <div className='flex py-12 items-center p-4 justify-around gap-10 '>
        <div className='flex gap-8 items-start'>
          <Image src={logo} alt="Logo" className='object-contain' width={50} height={50}></Image>
          <p className='max-w-[500px] text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati quidem maxime veniam inventore neque ratione, ex impedit nobis, at tempore recusandae earum similique a explicabo nihil. Odio doloribus dolore atque!</p>
        </div>
        <div className='flex gap-8 '>
          <div className='flex flex-col gap-1 '>
            <Link href={"/"} className=''>  Instagram</Link>
            <Link href={"/"} className=''>  Facebook</Link>
            <Link href={"/"} className=''>  Whatsapp</Link>
          </div>
          <div className='h-[100px] bg-slate-100 w-[1px] '></div>
          <div className='grid grid-cols-2 gap-x-3 gap-1'>
            <Link href={"/"} className=''>Home</Link>
            <Link href={"/"} className=''>About</Link>
            <Link href={"/"} className=''>Market</Link>
            <Link href={"/"} className=''>Contact</Link>
            <Link href={"/"} className=''>Reviews</Link>
          </div>
        </div>
      </div>
      <p className='text-sm py-1 text-center '>Copyright © 2024 - All right reserved by Cactusia</p>
    </div>
    </div>
  )
}

export default Footer