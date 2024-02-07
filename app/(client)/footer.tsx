import Image from 'next/image'
import React from 'react'
import logo from "@/public/images/logo.jpeg"
import Link from 'next/link'
import { Instagram } from 'lucide-react'
import TextEditable, { ChangeText, GetText } from '@/components/TextEditable'

import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

type Props = {}

function Footer({}: Props) {
  return (
    <div className='bg-slate-50'>

    <div className='container mt-20 mx-auto   flex flex-col  justify-center '>
      <div className='flex flex-col md:flex-row py-12 md:items-center p-4 justify-around gap-10 '>
        <div className='flex flex-col md:flex-row gap-8 items-start'>
          <Image src={logo} alt="Logo" className='object-contain' width={50} height={50}></Image>
          <p className='max-w-[500px] text-xs md:text-sm'>
            <TextEditable reference={{page:"footer",ref:"description"}}></TextEditable>
          </p>
        </div>
        <div className='flex gap-8 '>
          <div className='flex flex-col gap-2 '>
            <Link href={"/"} className='text-sm md:text-md flex items-center gap-2'><FaInstagram/> Instagram </Link>
            <Link href={"/"} className='text-sm md:text-md flex items-center gap-2'><FaFacebook/>  Facebook </Link>
            <Link href={"/"} className='text-sm md:text-md flex items-center gap-2'><FaWhatsapp/>  Whatsapp </Link>
          </div>
          <div className='h-[100px] bg-slate-200 w-[1px] '></div>
          <div className='grid grid-cols-1 gap-x-3 gap-1 w-full'>
            <ChangeText reference={{page:"footer",ref:"home"}} ><Link href={"/"} className='text-sm md:text-md'><GetText reference={{page:"footer",ref:"home"}}/></Link></ChangeText>
            <ChangeText reference={{page:"footer",ref:"market"}} ><Link href={"/market"} className='text-sm md:text-md'><GetText reference={{page:"footer",ref:"market"}}/></Link></ChangeText>
            <ChangeText reference={{page:"footer",ref:"about"}} ><Link href={"/about"} className='text-sm md:text-md'><GetText reference={{page:"footer",ref:"about"}}/></Link></ChangeText>
            <ChangeText reference={{page:"footer",ref:"contact"}} ><Link href={"/contact"} className='text-sm md:text-md'><GetText reference={{page:"footer",ref:"contact"}}/></Link></ChangeText>
          </div>
        </div>
      </div>
      <p className='text-sm md:text-sm py-1 text-center '>Copyright © 2024 - All right reserved by Cactusia</p>
    </div>
    </div>
  )
}

export default Footer