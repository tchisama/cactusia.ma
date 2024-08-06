"use client"

import React, { useEffect, useState } from 'react'
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
    <div className="flex-1 pt-4">
            <Textarea className=' rounded-xl mb-6 w-full flex-1' value={note} onChange={(e:any)=>setNote(e.target.value)}/>
            <Button onClick={update}>Save</Button>
    </div>
  )
}

export default Message
