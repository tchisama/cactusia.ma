"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore/lite'
import { ArrowUpRight, PhoneCall } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

type Props = {}

function page({}: Props) {
  const [messages,setMessages] = React.useState<any[]>()
  useEffect(()=>{
    getDocs(query(collection(db,"contacts"),orderBy("createdAt","desc"))).then((querySnapshot)=>{  
      setMessages(querySnapshot.docs.map(doc => doc.data()))
    })
  },[])
  return (
    <div className='p-4 font-bold text-gray-700 min-h-screen flex flex-col'>
        <div className='flex justify-between mb-5 items-center'>
        <h1 className='text-3xl'>Messages</h1>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2">
        {
          messages?.map((m)=>{
            return (
              <div className="flex flex-col gap-2  bg-white shadow border rounded-xl p-4 ">
                <div className="flex justify-between">
                <div className="">
                <p className="text-sm opacity-50">Name</p>
                <h1>{m.fullName}</h1>
                </div>
                <p className="text-sm">{(m.createdAt as Timestamp).toDate().toDateString()}</p>
                </div>
                <div className="flex gap-2 justify-between">
                  <div className="">
                    <p className="text-sm opacity-50">Number</p>
                    <h1>{m.number}</h1>
                  </div>
                  <Link className="ml-auto" href={
                    `https://wa.me/212${m.number.replace(/\s/g, "")}`
                  }>
                    <Button size="icon"><FaWhatsapp size={20}/></Button>
                  </Link>
                  <Link href={`tel:${m.number}`}>
                    <Button size="icon"><PhoneCall size={20}/></Button>
                  </Link>
                </div>
                <div className="">
                <p className="text-sm opacity-50">Message</p>
                <h1 className="text-sm bg-primary/10 p-2 rounded">{m.message}</h1>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default page
