"use client"
import TextEditable, { ChangeText, GetText } from '@/components/TextEditable'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

function page({}: Props) {
  return (
    <div className='container items-center flex flex-col gap-4 py-16'>
       <Heart size={100} strokeWidth='1' className='text-primary' />
       <h1 className='md:text-5xl font-medium text-3xl text-center'><TextEditable reference={{page:"thank",ref:"title"}}></TextEditable> </h1>
       <p className='md:text-xl  text-center'><TextEditable reference={{page:"thank",ref:"text"}}></TextEditable></p>
        <ChangeText reference={{page:"thank",ref:"button"}}>
       <Link href={"/"}>
       <Button className='p-6 text-lg flex gap-2' variant={"outline"}><ArrowLeft/><GetText reference={{page:"thank",ref:"button"}}></GetText></Button>
       </Link>
       </ChangeText>
    </div>
  )
}

export default page