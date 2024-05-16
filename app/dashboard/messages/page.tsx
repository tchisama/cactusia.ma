"use client"
import { db } from '@/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import React, { useEffect } from 'react'

type Props = {}

function page({}: Props) {
  const [messages,setMessages] = React.useState<any[]>()
  useEffect(()=>{
    getDocs(query(collection(db,"contacts"),orderBy("createdAt"))).then((querySnapshot)=>{  
      setMessages(querySnapshot.docs.map(doc => doc.data()))
    })
  },[])
  return (
    <div className='p-4 font-bold text-gray-700 min-h-screen flex flex-col'>
        <div className='flex justify-between mb-5 items-center'>
        <h1 className='text-3xl'>Messages</h1>
        </div>
      <div className="grid grid-cols-3 gap-2">
        {
          messages?.map((m)=>{
            return (
              <div className="flex flex-col gap-2 bg-white shadow border rounded-xl p-4 ">
                <h1>{m.fullName}</h1>
                <p>{m.number}</p>
                <p>{m.message}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default page
