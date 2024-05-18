"use client"
import { states } from '@/components/StateChanger'
import { Button } from '@/components/ui/button'
import { db } from '@/firebase'
import { collection, deleteDoc, doc, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore/lite'
import { ArrowRight, ArrowRightLeft, ArrowUpRight, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


type Props = {}


type state = "New"|"Confirmé"|"Prêt"|"En livraison"|"Livré"|"Injoignable"|"Reporté"|"Annulé"|"Fake"
type Notification = {
  message:string
  date:Timestamp
  id:string
  from:state
  to:state
  order:{
    id:string
  }
  user:{
    name:string
    email:string
  }
}

function page({}: Props) {
  const [notifications,setNotifications] = useState<any[]>([])

  useEffect(()=>{
    const unsub = onSnapshot(query(collection(db, "notifications"),orderBy("date","desc"),limit(50)), (doc) => {
        setNotifications(
          doc.docs.map(d=>({...d.data() as any ,id : d.id}))
        )
    });
    return()=> unsub()
  },[])
  return (
    <div className='p-4 font-bold text-gray-700 min-h-screen flex flex-col'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl'>Notifications</h1>
        </div>
      <div className="p-2 mt-4">
          {
            notifications.length > 0 &&
            notifications.map((n:Notification,i)=>(
              <div key={n.id} style={{backgroundColor:(states.find(c=>c.name==n.to))?.color+"11"}} className='flex border  gap-4 rounded-xl mt-2 p-3 border-b'>
                <ArrowRightLeft className="w-10" size={24} strokeWidth={1.2}/>
                <div>
                  <p className="text-sm">{n.user.name} | {new Date(n.date.toDate()).toString().slice(0,24)}</p>

                  <p className="my-2">{n.user.name} has update the {n.message}</p>
                  <div className="flex items-start gap-2">
                    <p className="px-3 text-sm py-1 rounded-xl" style={{backgroundColor:(states.find(c=>c.name==n.from))?.color+"44"}}>{n.from}</p>
                    <ArrowRight  />
                    <p className="px-3 text-sm py-1 rounded-xl" style={{backgroundColor:(states.find(c=>c.name==n.to))?.color+"44"}}>{n.to}</p>
                    <div> | </div>
                    <Link href={"/dashboard/orders/"+n.order.id}>
                      <Button variant="outline" size="sm" className="flex gap-2"><ArrowUpRight size={18}/> Open Order</Button>
                    </Link>
                      <Button onClick={
                      ()=>{
                        if(confirm("Are you sure you want to delete this notification ?")){
                          deleteDoc(doc(db,"notifications",n.id))
                        }
                      }
                    } variant="outline" className="flex gap-2" size="sm"><X size={18}/>Clear</Button>
                  </div>
                </div>
              </div>
            ))
          }
      </div>
    </div>
  )
}

export default page 
