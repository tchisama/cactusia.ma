"use client"
import useLocalStorage from '@/app/hooks/useLocalStorage'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import useContentEditor from '@/store/backend copy'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

function page({}: Props) {
  // const {editable , setEditable} = useContentEditor()
  const [editable, setEditable] = useLocalStorage<boolean>("editable", false)
  return (
    <div className='p-6 container'>
        <h1 className='text-4xl py-2'>Language and Content</h1>
        <p className='p-3'>Edit your language and content by clicking the switch and go to your site and change any content you want</p>
        <div className='flex gap-2 items-center'>
          <Switch id='editable'  checked={editable} onCheckedChange={setEditable}> Edit</Switch>
          <Label className='my-4' htmlFor='editable'>Editable</Label>
        </div>
        <Separator className='my-4'/>
        {editable ? "true" : "false"}
        <div >
          <Link href={"/"} className='flex gap-2 items-center'>Go home <ArrowRight/></Link>
        </div>
    </div>
  )
}

export default page