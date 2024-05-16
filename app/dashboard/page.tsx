"use client"
import Bar from '@/components/Chart';
import { Input } from '@/components/ui/input';
import { db } from '@/firebase';
import useOrdersStore, { Order } from '@/store/backend';
import { Timestamp, collection, doc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { CheckIcon, DollarSignIcon, SmileIcon, StarIcon, StarsIcon, TruckIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
const DashboardPage: React.FC = () => {
  const [monthsOrders,setMonthsOrders] = React.useState(0)
  const [confirmedOrders,setConfirmedOrders] = React.useState(0)
  const [confirmedProfit,setConfirmedProfit] = React.useState(0)
  const [users,setUsers] = React.useState(0)

  const {orders,setOrders} = useOrdersStore()
  // start is month before 
  // const start = new Date(new Date().setDate(new Date().getDate() - 30));
  // // end is today
  // const end = new Date();



  useEffect(() => {
// ,where("createdAt",">=",start),where("createdAt","<=",end)
    const q = query(collection(db,"orders"))
    getDocs(q).then((querySnapshot)=>{
      const docs = querySnapshot.docs.map(doc => doc.data() as Order);
      setOrders(docs)
      setMonthsOrders(docs.length)
      setConfirmedOrders(docs.filter((d)=>d.status === "Livré").length)
      setConfirmedProfit(docs.filter((d)=>d.status === "Livré").reduce((a,b)=>a + b.price,0))
    })
    getDocs(collection(db,"users")).then((querySnapshot)=>{
      setUsers(querySnapshot.docs.length)
    })
  },[])


  const [range,setRange] = useState(30*3)




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

        <div className='grid mt-2 grid-cols-2 gap-2'>
          <div className='p-5  bg-white flex-1 rounded-xl border shadow'>
            <div className="flex justify-between items-center w-full">
              <h1 className='text-xl flex-1'>Total Orders</h1>
              <Input value={range} type="number" className="w-16 bg-gray-100 mr-1" onInput={(e:any)=>setRange(e.target.value)}></Input>
              {" "}Days
            </div>
            <h1 className='text-6xl'>{orders.filter((d)=>d.createdAt.toDate() > new Date(new Date().setDate(new Date().getDate() - range))).length}</h1>
          </div>

          <div className='p-5 bg-white flex-1 rounded-xl relative border shadow'>
            <h1 className='text-xl'>Total Profit</h1>
            <DollarSignIcon className="absolute top-2 right-2 text-xl" size={40} strokeWidth={1}/>
            <h1 className='text-6xl'>{
              orders
              // filter((d)=>d.createdAt.toDate() > new Date(new Date().setDate(new Date().getDate() - 7)))
              .filter((d)=>d.status === "Livré").reduce((a,b)=>a + b.price,0)
          } Dh</h1>
          </div>
          </div>


        <div className='grid mt-2 grid-cols-4 gap-2'>


          <div className='p-5 bg-white flex-1 rounded-xl relative border shadow'>
            <h1 className='text-xl'>New Orders</h1>
            <StarsIcon className="absolute top-2 right-2 text-xl" size={40} strokeWidth={1}/>
            <h1 className='text-4xl'>{
              orders
              .filter((d)=>d.status === "New").length}</h1>
          </div>

          <div className='p-5 bg-white flex-1 rounded-xl relative border shadow'>
            <h1 className='text-xl'>Confirmed Orders</h1>
            <CheckIcon className="absolute top-2 right-2 text-xl" size={40} strokeWidth={1}/>
            <div className="flex justify-between items-center">
              <h2>Today</h2>
              <h1 className='text-2xl'>{
                orders.filter((d)=>d.createdAt.toDate() > new Date(new Date().setDate(new Date().getDate() - 0)))
                .filter((d)=>d.status === "Confirmé").length}</h1>
            </div>
            <div className="flex justify-between items-center">
              <h2>Total</h2>
              <h1 className='text-2xl'>{
                orders
                .filter((d)=>d.status === "Confirmé").length}</h1>
            </div>
          </div>



          <div className='p-5 bg-white flex-1 rounded-xl relative border shadow'>
            <h1 className='text-xl'>On delivring Orders</h1>
            <TruckIcon className="absolute top-2 right-2 text-xl" size={40} strokeWidth={1}/>
            <h1 className='text-4xl'>{
              orders
              .filter((d)=>d.status === "En livraison").length}</h1>
          </div>


          <div className='p-5 bg-white flex-1 rounded-xl relative border shadow'>
            <h1 className='text-xl'>delivered Orders</h1>
            <SmileIcon className="absolute top-2 right-2 text-xl" size={40} strokeWidth={1}/>
            <h1 className='text-4xl'>{
              orders
              .filter((d)=>d.status === "Livré").length}</h1>
          </div>




          {/* <div className='p-5 bg-white flex-1 rounded-xl border shadow'> */}
          {/*   <h1 className='text-xl'>month orders</h1> */}
          {/*   <h1 className='text-6xl'>{monthsOrders}</h1> */}
          {/* </div> */}
          {/* <div className='p-5 bg-white flex-1 rounded-xl border shadow'> */}
          {/*   <h1 className='text-xl'>delivered orders</h1> */}
          {/*   <h1 className='text-6xl'>{confirmedOrders}</h1> */}
          {/* </div> */}
          {/* <div className='p-5 bg-white flex-1 rounded-xl border shadow'> */}
          {/*   <h1 className='text-xl'>confirmed profit</h1> */}
          {/*   <h1 className='text-6xl'>{confirmedProfit} Dh</h1> */}
          {/* </div> */}
          {/* <div className='p-5 bg-white flex-1 rounded-xl border shadow'> */}
          {/*   <h1 className='text-xl'>users</h1> */}
          {/*   <h1 className='text-6xl'>{users}</h1> */}
          {/* </div> */}



        </div>
      </div>
    </div>
  );
};






export default DashboardPage;
