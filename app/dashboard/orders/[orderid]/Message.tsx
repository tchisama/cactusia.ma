"use client"

import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Order } from '@/store/backend'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
type Props = {
  order:Order
}

function Message({order}: Props) {
  const [note,setNote] = useState(order.note)
  useEffect(()=>{
    setNote(order.note)
  },[])

  const update = ()=>{
    updateDoc(doc(db,"orders",order.id),{
      note
    })
  }

  return (
    <div>
    <Sheet>
      <SheetTrigger>
        <Button className='mt-4'>
          Open Note
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Order Note</SheetTitle>
          <SheetDescription>
            <Textarea className='h-[500px]' value={note} onChange={(e:any)=>setNote(e.target.value)}/>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter className='pt-8'>
          <SheetClose>
            <Button onClick={update}>Save</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>

    </div>
  )
}

export default Message