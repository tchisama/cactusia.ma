"use client"
import { db } from '@/firebase'
import { collection, onSnapshot, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'


type Props = {}


type Notification = {
  message:string
  date:Date
  id:string
  user:{
    name:string
    email:string
  }
}

function page({}: Props) {
  const [notifications,setNotifications] = useState<any[]>([])

  useEffect(()=>{
    const unsub = onSnapshot(query(collection(db, "notifications")), (doc) => {
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
              <div key={n.id} className='flex flex-col gap-2  p-2 border-b'>
                <p className="text-sm">{n.user.name} | {n.user.email}</p>
                <p>{n.message}</p>
              </div>
            ))
          }
      </div>
    </div>
  )
}

export default page 
