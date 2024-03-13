"use client"
import Bar from '@/components/Chart';
import { db } from '@/firebase';
import useOrdersStore, { Order } from '@/store/backend';
import { Timestamp, collection, doc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
const DashboardPage: React.FC = () => {
  const [monthsOrders,setMonthsOrders] = React.useState(0)
  const [confirmedOrders,setConfirmedOrders] = React.useState(0)
  const [confirmedProfit,setConfirmedProfit] = React.useState(0)
  const [users,setUsers] = React.useState(0)

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
    getDocs(collection(db,"users")).then((querySnapshot)=>{
      setUsers(querySnapshot.docs.length)
    })
  },[])







  return (
    <div className="container p-6">
      <div>
        <h1 className='text-3xl pb-8'>Dashboard</h1>
        {
          orders &&
          <div className='h-[400px] my-2 bg-white shadow rounded-3xl border p-4'>
            <div className='w-full h-full'>
            <Bar/>
            </div>
          </div>
        }
        <div className='grid grid-cols-3 gap-4'>
          <div className='p-5 bg-white flex-1 rounded-xl border shadow'>
            <h1 className='text-xl'>month orders</h1>
            <h1 className='text-6xl'>{monthsOrders}</h1>
          </div>
          <div className='p-5 bg-white flex-1 rounded-xl border shadow'>
            <h1 className='text-xl'>delivered orders</h1>
            <h1 className='text-6xl'>{confirmedOrders}</h1>
          </div>
          <div className='p-5 bg-white flex-1 rounded-xl border shadow'>
            <h1 className='text-xl'>confirmed profit</h1>
            <h1 className='text-6xl'>{confirmedProfit} Dh</h1>
          </div>
          <div className='p-5 bg-white flex-1 rounded-xl border shadow'>
            <h1 className='text-xl'>users</h1>
            <h1 className='text-6xl'>{users}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};






export default DashboardPage;
