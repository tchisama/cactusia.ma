"use client"
import { db } from '@/firebase';
import { Order } from '@/store/backend';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

type Props = {}

function page({}: Props) {
  const {orderid} = useParams<{ orderid: string }>()
  const [order,setOrder] = useState<Order>()
  useEffect(()=>{
    getDoc(doc(db, "orders", orderid)).then((doc) => {
      setOrder({...doc.data() as Order ,id : doc.id })
    })
  },[])
  
  return (
    <div className='container'>
      <h1>{order?.firstName}</h1>
    </div>
  )
}

export default page