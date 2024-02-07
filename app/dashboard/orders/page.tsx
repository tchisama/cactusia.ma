"use client"
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CartItem } from '@/store/cart'
import { db } from '@/firebase'
import { Timestamp, collection, onSnapshot } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { ArrowRight, Delete, Trash } from 'lucide-react'
import useOrdersStore, { Order } from '@/store/backend'
import Link from 'next/link'
import StateChanger from '@/components/StateChanger'
import DeleteOrder from '@/components/DeleteOrder'
import { FaWhatsapp } from "react-icons/fa";
type Props = {}

const Page = (props: Props) => {
  const {orders,setOrders} = useOrdersStore()

  useEffect(()=>{
    const unsub = onSnapshot(collection(db, "orders"), (doc) => {
        setOrders(
          doc.docs.map(d=>({...d.data() as Order ,id : d.id }))
        )
    });
    return()=> unsub()
  },[])





  return (
    <div className='p-4 font-bold text-gray-700 h-screen flex flex-col'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl'>Orders</h1>
        </div>
        <Table className='mt-8 bg-white border rounded-xl p-2'>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">status</TableHead>
            <TableHead className="">date</TableHead>
            <TableHead className="">name</TableHead>
            <TableHead>number</TableHead>
            <TableHead>items</TableHead>
            <TableHead className="">city</TableHead>
            <TableHead className="">actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((item) => (
            <TableRow key={item.id}>
              <TableCell ><StateChanger state={item.status} id={item.id}/></TableCell>
              <TableCell >
                  {formatCreatedAt(item.createdAt as Timestamp)}
              </TableCell>
              <TableCell >{item.firstName} {item.lastName}</TableCell>
              <TableCell>{item.number}</TableCell>
              <TableCell>{item.cart.reduce((acc,item)=>acc +item.quantity,0)} pots</TableCell>
              <TableCell className="">{item.city}</TableCell>
              <TableCell className="flex gap-2">
                <DeleteOrder id={item.id}/>
                <Link href={"https://api.whatsapp.com/send/?phone=%2B212"+item.number.slice(1)}>
                  <Button size={"icon"} variant={"outline"}><FaWhatsapp size={20}/></Button>
                </Link>
                <Link href={`/dashboard/orders/${item.id}`}>
                  <Button variant={"outline"} size={"icon"}><ArrowRight size={16}/></Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


 const formatCreatedAt = (timestamp: Timestamp) => {
    const dateObject = timestamp.toDate();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return dateObject.toLocaleString('en-US', options).replace(',', ' /');
  };

export default Page