"use client"
import Bar from '@/components/Chart';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { db } from '@/firebase';
import useOrdersStore, { Order } from '@/store/backend';
import Image from 'next/image'
import { Timestamp, collection, doc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { CheckIcon, DollarSignIcon, SmileIcon, StarIcon, StarsIcon, ThumbsUp, TruckIcon, Users2Icon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import UsersBar from '@/components/Chart-users';
const DashboardPage: React.FC = () => {
  const [monthsOrders,setMonthsOrders] = React.useState(0)
  const [confirmedOrders,setConfirmedOrders] = React.useState(0)
  const [confirmedProfit,setConfirmedProfit] = React.useState(0)
  const [users,setUsers] = React.useState<any[]>()

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
    // getDocs(collection(db,"users")).then((querySnapshot)=>{
    //   setUsers(querySnapshot.docs.map(doc => doc.data()))
    // })
  },[])


  const [range,setRange] = useState(30*3)

  const [mostSelledPot,setMostSelledPot] = useState<string>()
  const [mostSelledCactus,setMostSelledCactus] = useState<string>()


  useEffect(()=>{
    if(!orders) return
    if(orders.length === 0) return
    // setMostSelledPot(
    //   orders[0]?.cart[0].pot
    // )
    const pots = orders.map((d)=>d.cart[0].pot)
    const counts = pots.reduce((a,b)=>{
      a[b] = (a[b] || 0) + 1
      return a
    },{} as {[key:string]:number})
    const max = (Object.keys(counts)??[]).reduce((a,b)=>counts[a] > counts[b] ? a : b)
    setMostSelledPot(max)

    const cactuses = orders.map((d)=>d.cart[0].cactus)
    const cactusCounts = cactuses.reduce((a,b)=>{
      a[b] = (a[b] || 0) + 1
      return a
    },{} as {[key:string]:number})
    const cactusMax = (Object.keys(cactusCounts)??[]).reduce((a,b)=>cactusCounts[a] > cactusCounts[b] ? a : b)
    setMostSelledCactus(cactusMax)




  },[orders])


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

        <div className='grid mt-2 grid-cols-3 gap-2'>
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
            <h1 className='text-5xl'>{
              orders
              // filter((d)=>d.createdAt.toDate() > new Date(new Date().setDate(new Date().getDate() - 7)))
              .filter((d)=>d.status === "Livré").reduce((a,b)=>a + b.price,0)
          } Dh</h1>
            <div className="flex items-end gap-2">
                <h1 className='text-3xl'>{
                  orders
                  .filter((d)=>d.createdAt.toDate() > new Date(new Date().setDate(new Date().getDate() - 7)))
                  .filter((d)=>d.status === "Livré").reduce((a,b)=>a + b.price,0)
              } Dh</h1>
                <h1 className='text-lg'>Profit last week</h1>
            </div>
          </div>



          <div className='p-5 bg-white flex-1 rounded-xl relative border shadow'>
            <h1 className='text-xl'>Correct Orders</h1>
            <ThumbsUp className="absolute top-2 right-2 text-xl" size={40} strokeWidth={1}/>
            <h1 className="text-4xl">
              {
                Math.floor(orders
                .filter((d)=>d.status === "Livré").length
                / orders.length * 100)
              } %
            </h1>
            <Progress className="mt-2" value={
              // with 100% 
              orders
              .filter((d)=>d.status === "Livré" || d.status === "Confirmé" || d.status === "En livraison" || d.status === "Prêt" || d.status.toLowerCase() == "new" ).length
              / orders.length * 100
            } />

          </div>



          </div>


        <div className='grid mt-2 grid-cols-4 gap-2'>


          <div className='p-5 bg-white flex-1 rounded-xl relative border shadow'>
            <h1 className='text-xl'>New Orders</h1>
            <StarsIcon className="absolute top-2 right-2 text-xl" size={40} strokeWidth={1}/>
            <h1 className='text-4xl'>{
              orders
              .filter((d)=>d.status.toLowerCase() === "new").length}</h1>
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


          {/* <div className='p-5 bg-white flex-1 rounded-xl relative border shadow'> */}
          {/*   <h1 className='text-xl'>Visetors count</h1> */}
          {/*   <Users2Icon className="absolute top-2 right-2 text-xl" size={40} strokeWidth={1}/> */}
          {/*   <h1 className='text-4xl'>{ */}
          {/*     users && */}
          {/*     users.length */}
          {/*   }</h1> */}
          {/* </div> */}


          <div className='p-5 h-fit bg-white flex-1 flex justify-between  rounded-xl relative border shadow'>
            <h1 className='text-xl'>Best Sale Pot</h1>
            <Image
            src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/pots%2F${mostSelledPot}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} 
            alt="Cactus" width={60} height={60} className=''></Image>
          </div>



          <div className='h-full  bg-white shadow rounded-xl row-span-2 col-span-3 border p-3 pr-5 pb-0'>
            <div className='w-full h-[calc(100%-30px)]'>
            <h1 className='text-xl'>Visetors Graph</h1>

            <UsersBar/>
            </div>
          </div>

          <div className='p-5 h-fit bg-white flex-1 flex justify-between  rounded-xl relative border shadow'>
            <h1 className='text-xl'>Best Sale Cactus</h1>
            <Image
            src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/cactuses%2F${mostSelledCactus}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} 
            alt="Cactus" width={90} height={90} className='object-contain'></Image>
          </div>




          {/* <div className='p-5 bg-white flex-1 rounded-xl relative border shadow'> */}
          {/*   <h1 className='text-xl'>Today Visetors</h1> */}
          {/*   <Users2Icon className="absolute top-2 right-2 text-xl" size={40} strokeWidth={1}/> */}
          {/*   <h1 className='text-4xl'>{ */}
          {/*     users && */}
          {/*     users.filter((d)=>d.date.toDate() > new Date(new Date().setDate(new Date().getDate() - 0))).length || 0 */}
          {/*   }</h1> */}
          {/* </div> */}


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
