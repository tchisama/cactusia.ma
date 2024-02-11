"use client"
import { db } from '@/firebase';
import useOrdersStore, { Order } from '@/store/backend';
import { Timestamp, collection, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
const DashboardPage: React.FC = () => {
  const [monthsOrders,setMonthsOrders] = React.useState(0)
  const [confirmedOrders,setConfirmedOrders] = React.useState(0)
  const [confirmedProfit,setConfirmedProfit] = React.useState(0)
  const {orders,setOrders} = useOrdersStore()
  // start is month before 
  const start = new Date(new Date().setDate(new Date().getDate() - 30));
  // end is today
  const end = new Date();
  useEffect(() => {
    const q = query(collection(db,"orders"),where("createdAt",">=",start),where("createdAt","<=",end))
    getDocs(q).then((querySnapshot)=>{
      const docs = querySnapshot.docs.map(doc => doc.data() as Order);
      setMonthsOrders(docs.length)
      setConfirmedOrders(docs.filter((d)=>d.status === "Livré").length)
      setConfirmedProfit(docs.filter((d)=>d.status === "Livré").reduce((a,b)=>a + b.price,0))
    })
  },[])


  return (
    <div className="container p-6">
      <div>
        <h1 className='text-3xl pb-8'>Dashboard</h1>
        <div className='flex gap-4'>
          <div className='p-5 bg-white flex-1 rounded-xl border shadow'>
            <h1 className='text-xl'>month orders</h1>
            <h1 className='text-6xl'>{monthsOrders}</h1>
          </div>
          <div className='p-5 bg-white flex-1 rounded-xl border shadow'>
            <h1 className='text-xl'>confirmed orders</h1>
            <h1 className='text-6xl'>{confirmedOrders}</h1>
          </div>
          <div className='p-5 bg-white flex-1 rounded-xl border shadow'>
            <h1 className='text-xl'>confirmed profit</h1>
            <h1 className='text-5xl'>{confirmedProfit} dh</h1>
          </div>
        </div>
      </div>
    </div>
  );
};






export default DashboardPage;
