"use client"
import { Edit, Edit2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import useContentEditor from '@/store/backend copy'
import useLocalStorage from '@/app/hooks/useLocalStorage'

type Reference = {
  page: string,
  ref: string
}

type Props = {
  reference:Reference
}
type Props2 = {
  reference:Reference
  children:React.ReactNode
}

function TextEditable({reference}: Props) {

  const [editable, setEditable] = useLocalStorage("editable", false)

  const [text,setText] = useState("")
  useEffect(()=>{
    onSnapshot(doc(db,"content",reference.page),(doc)=>{
      setText(doc.data()?.[reference.ref] as string)
    })
  },[])
  return (
    editable?
    <div className='relative border border-[#fff0] group hover:border-primary duration-200'>
      {text}
      <EditDialog reference={reference} text={text}/>
    </div>
    :
   text
  )
}



export function GetText ({reference}: Props) {
  const [text,setText] = useState("")
  useEffect(()=>{
    onSnapshot(doc(db,"content",reference.page),(doc)=>{
      setText(doc.data()?.[reference.ref] as string)
    })
  },[])
  return text
}


export function ChangeText ({reference,children}: Props2) {
  const [editable, setEditable] = useLocalStorage("editable", false)
  return <div className='relative'>
    {children}
    {
      editable?
      <EditDialog reference={reference} text={""}/>
      :
      null
    }
  </div>
}


const EditDialog = ({reference,text }: {reference:Reference,text:string})=>{
  const [textInput, setTextInput] = useState(text)
  const save = ()=>{
    updateDoc(
      doc(db,"content",reference.page),
      {[reference.ref]:textInput}
    )
}


  useEffect(()=>{
    setTextInput(text)
  },[text])
  const p = (e:any)=>{
    e.stopPropagation()
  }
  return(
  <Dialog >
    <DialogTrigger onClick={p} asChild>
      <Button  variant={"outline"} size={"icon"} className="absolute  w-7 h-7 top-0 -left-8"><Edit size={14}/></Button>
    </DialogTrigger>
    <DialogContent className='max-w-3xl'>
      <DialogHeader>
        <DialogTitle>Edit Text?</DialogTitle>
        <DialogDescription>
          <Textarea className="w-full mt-2" value={textInput} onInput={(e:any)=>setTextInput(e.target.value)}/>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose>
          <Button variant={"outline"}>Cancel</Button>
        </DialogClose>
        <DialogClose>
          <Button onClick={save}>Save</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}






export default TextEditable