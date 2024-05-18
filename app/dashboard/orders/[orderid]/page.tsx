"use client"
import { db } from '@/firebase';
import { Order } from '@/store/backend';
import { Timestamp, collection, doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import StateChanger from '@/components/StateChanger';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import Message from './Message';
import { PhoneCall } from 'lucide-react';

type Props = {}

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
function page({}: Props) {
  const {orderid} = useParams<{ orderid: string }>()
  const [order,setOrder] = useState<Order>()
  useEffect(()=>{
    getDoc(doc(db, "orders", orderid)).then((doc) => {
      setOrder({...doc.data() as Order ,id : doc.id })
    })
  },[])
  
  return (
    order ?
    <div className='container'>
      <h1 className='text-3xl py-4'>Order Infos</h1>
      <div className='my-4 relative p-6 bg-white rounded-xl w-fit min-w-[800px] border shadow grid grid-cols-4'>
          <span className='font-bold  text-gray-800'>Price :</span> <div className='col-span-3  text-2xl text-gray-600 flex gap-4'>{order?.price} Dh</div>
          <span className='font-bold text-gray-800'>State :</span> <div className='col-span-3 text-gray-600 flex my-2 gap-4'><StateChanger state={order?.status} id={order?.id}/></div>
          <span className='font-bold text-gray-800'>Date :</span> <div className='col-span-3 text-gray-600 flex gap-4'>{formatCreatedAt(order?.createdAt as Timestamp)}</div>
          <span className='font-bold text-gray-800'>Name :</span> <div className='col-span-3 text-gray-600 flex gap-4'>{order?.firstName} . {order?.lastName}</div>
          <span className='font-bold text-gray-800'>Number :</span> <div className='col-span-3 text-gray-600 flex gap-4'>{order?.number} </div>
          <span className='font-bold text-gray-800'>Address :</span> <div className='col-span-3 text-gray-600 flex gap-4'>{order?.address} </div>
          <span className='font-bold text-gray-800'>city :</span> <div className='col-span-3 text-gray-600 flex gap-4'>{order?.city} </div>
          <div className="absolute right-4 top-4 flex gap-2">
          <Link className='' href={"https://api.whatsapp.com/send/?phone=%2B212"+order.number.slice(1)}>
            <Button size={"icon"} variant={"outline"}><FaWhatsapp size={20}/></Button>
          </Link>
          <Link className='' href={`tel:${order.number}`}>
            <Button size={"icon"} variant={"outline"}><PhoneCall size={20}/></Button>
          </Link>
          </div>
          <Message order={order}/>
      </div>

      <div className='  p-4'>
        {
          order.cart.map((item)=>{
            return(
              <div className='relative inline-block m-2 px-12  overflow-hidden bg-slate-100 rounded-2xl border'>
                <div className='w-6 h-6 bg-primary text-white rounded-full absolute right-1 top-1 flex text-lg justify-center items-center'>{item.quantity}</div>
                <div className='px-3 flex items-center w-full'>
                  <Image  src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/cactuses%2F${item.cactus}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} alt='' className='mb-28 mx-auto z-10 relative' width={100} height={100}>
                  </Image>
                  <Image className='absolute z-[0] top-14 left-1/2 translate-x-[-50%]' src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/pots%2F${item.pot}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} alt='' width={100} height={100}>
                  </Image>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
    : <div className='flex-1 justify-between items-center flex p-4'>loading</div>
  )
}

export default page
