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
import { Timestamp, collection, deleteDoc,doc, limit, onSnapshot, orderBy, query, startAt, updateDoc } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, CheckIcon, Delete, NotebookIcon, Trash } from 'lucide-react'
import useOrdersStore, { Order } from '@/store/backend'
import Link from 'next/link'
import StateChanger, { states } from '@/components/StateChanger'
import DeleteOrder from '@/components/DeleteOrder'
import { FaWhatsapp } from "react-icons/fa";
import { useUserStore } from '@/store/users'
import Bar from '@/components/Chart'
import xlsx from "json-as-xlsx"
import { Input } from '@/components/ui/input'
import { Select } from '@radix-ui/react-select'
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { set } from 'zod'
type Props = {}

const Page = (props: Props) => {
  const {orders,setOrders} = useOrdersStore()
  const {user} = useUserStore()



  const [currentState,setCurrentState] = useState("Tout");
  const [search,setSearch] = useState("");
  const [limitOrders,setLimitOrders] = useState<number|"all">(100)
  const [page,setPage] = useState(0)
  const [currentOrders,setCurrentOrders] = useState<Order[]>([])
  
  useEffect(()=>{
    if(orders.length > 0) return
    const unsub = onSnapshot(query(collection(db, "orders"),orderBy("createdAt","desc")), (Doc) => {
        setOrders(
          Doc.docs.map(d=>({...d.data() as Order ,id : d.id , selected : false}))
        )
        // updateDoc(collection("dashboard"),"data",{
        //     orders:{
        //       total: Doc.docs.length,  
        //     }
        // })
      // )
    });
    return()=> unsub()
  },[])

useEffect(() => {
  if (limitOrders === "all") {
    setCurrentOrders(orders
      .filter(o=>currentState === "Tout" ? true :  o.status.toLowerCase() === currentState.toLowerCase())
      .filter(o=>JSON.stringify(o).toLowerCase().includes(search.toLowerCase()))
      );
    return;
  }
    const newOrders = orders. filter(o=>currentState === "Tout" ? true :  o.status.toLowerCase() === currentState.toLowerCase())
    .filter(o=>JSON.stringify(o).toLowerCase().includes(search.toLowerCase()))

  setCurrentOrders(newOrders
      .slice(
    page * limitOrders,
    (page + 1) * limitOrders
  ))

}, [limitOrders, page, orders, currentState, search]);
// set Page to 0 if currentState changes
  useEffect(() => {
    setPage(0);
  },[currentState]);
    

  const exportExcel =()=>{
    const data = [{
      sheet: "orders",
      columns:[
        {label:"firstName",value:"firstName"},
        {label:"lastName",value:"lastName"},
        {label:"number",value:"number"},
        {label:"city",value:"city"},
        {label:"address",value:"address"},
        {label:"price",value:"price"},
        {label:"quantity",value:"quantity"},
      ],
      content: currentOrders.filter(o=>o.selected==true).map(o=>({
        firstName: o.firstName,
        lastName: o.lastName,
        number: o.number,
        city: o.city,
        address: o.address,
        price: o.price,
        quantity: o.cart.reduce((acc,item)=>acc +item.quantity,0)
      }))
    }]

    xlsx(data,{
      fileName : "orders",
    })

    setCurrentOrders(currentOrders.map(o=>({...o,selected:false})))
  }




  return (
    currentOrders.length > 0 &&
    <div className='p-4 font-bold text-gray-700 min-h-screen flex flex-col'>
        <div className='flex justify-between items-center'>
        <h1 className='text-3xl'>Orders</h1>
        </div>
        {
          false &&
          <div className='h-[300px] my-2 max-w-3xl bg-white shadow rounded-3xl border p-4'>
            <div className='w-full h-full'>
            <Bar />
            </div>
          </div>
        }
        <div className="my-4"></div>



        <div className="flex justify-end gap-4 py-2">
          <Select 
            onValueChange={(value)=>setCurrentState(value)}
            value={currentState}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {
                [{

                  name: "Tout",
                  color: "#fff",
                  id: 0
                },...states].map((state)=>(
                  <SelectItem key={state.id} value={state.name}>{" "}{state.name}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
          <Select 
            onValueChange={(value)=>setLimitOrders(value as number|"all")}
            value={String(limitOrders)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {
                [50,100,200,"all"].map((number)=>(
                  <SelectItem key={number} value={number.toLocaleString()}>{" "}{number}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>

          <Input  value={search} onInput={(e:any)=>setSearch(e.target.value)} placeholder="search on all feilds"></Input>
        </div>






          {
            currentOrders
            .filter(o=>o.selected==true).length > 0 &&
            <div className="my-4 flex gap-2">
                  <Button onClick={exportExcel}> Export Excel</Button>
                  <Button variant="outline" onClick={()=>setCurrentOrders(currentOrders.map(o=>({...o,selected:true})))}> Select All</Button>
                  <Button variant="outline" onClick={()=>setCurrentOrders(currentOrders.map(o=>({...o,selected:false})))}> Unselect All</Button>
                  <Link href="/dashboard/orders-tickets">
                    <Button variant="outline"  >Tickets</Button>
                  </Link>
                  <Button className="flex ml-auto gap-2" onClick={()=>{

            if(!confirm("Are you sure you want to delete the selected orders?")) return
            currentOrders
            .filter(o=>o.selected==true).forEach(o=>{
                deleteDoc(doc(db,"orders",o.id)).then(()=>{
                  setCurrentOrders(currentOrders.filter(oo=>oo.id !== o.id))
                })
            })


            }} variant="destructive" > <Trash size={16}/> Delete</Button>
          </div>
        }
        <h1 className="text-xl my-2">
        {
          orders
          .filter(o=>currentState === "Tout" ? true :  o.status.toLowerCase() === currentState.toLowerCase())
          .filter(o=>JSON.stringify(o).toLowerCase().includes(search.toLowerCase()))
            .length
        }
          {" "} Orders  { currentState === "Tout" ? "" : " are " + currentState} {search && `containing "${search}"` }
        </h1>
      <Table className='bg-white border rounded-xl p-2'>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">select</TableHead>
            <TableHead className="">status</TableHead>
            <TableHead className="">date</TableHead>
            <TableHead className="">name</TableHead>
            <TableHead>number</TableHead>
            <TableHead>items</TableHead>
            <TableHead className="">city</TableHead>
            <TableHead className="">note</TableHead>
            <TableHead className="">actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
              currentOrders.length > 0 &&
              currentOrders
              .map((item) => (
            <TableRow key={item.id}>
              <TableCell >
                  <Button
                    onClick={()=>setCurrentOrders(currentOrders.map(o=>o.id === item.id ? {...o,selected:!o.selected} : o))}
                    variant="outline" size="icon">
                    {item.selected &&
                    <CheckIcon/>
                    }
                  </Button>
              </TableCell>
              <TableCell ><StateChanger state={item.status} id={item.id}/></TableCell>
              <TableCell >
                  {
                      formatCreatedAt(item.createdAt as Timestamp).slice(3,6) + 
                      formatCreatedAt(item.createdAt as Timestamp).slice(0,2) +
                      formatCreatedAt(item.createdAt as Timestamp).slice(5)
                  }
              </TableCell>
              <TableCell >{item.firstName} {item.lastName}</TableCell>
              <TableCell>{item.number}</TableCell>
              <TableCell>{item.cart.reduce((acc,item)=>acc +item.quantity,0)} pots</TableCell>
              <TableCell className="">{item.city}</TableCell>
              <TableCell className="">
                    {(item.note??" ----- ").slice(0,15)}
              </TableCell>
              <TableCell className="flex gap-2">

                  {/* { */}
                  {/*     item.note && */}
                  {/*     <Button size="icon" variant="outline" ><NotebookIcon size={18}/></Button> */}
                  {/* } */}
                <DeleteOrder id={item.id}/>
                <Link 
  href={`https://api.whatsapp.com/send/?phone=%2B212${item.number.slice(1)}&text=Bonjour%20${item.firstName}%20${item.lastName},%20J'espère%20que%20vous%20allez%20bien.%20Vous%20avez%20passé%20commande%20chez%20cactusia%0A%0A-1%20Coffret%20d'un%20montant%20total%20de%20*${item.price}%20DH*.%20%0A%0AMerci%20bien%20de%20me%20confirmer%20votre%20commande%20afin%20de%20vous%20envoyer%20le%20colis%20dans%20les%20plus%20brefs%20délais.%20%0A%0A${user.name}%20de%20cactusia`}
>
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
        {
          limitOrders != "all" &&
        <div className="flex justify-center items-center p-4">
          <Button onClick={()=>{
            if(page > 0){
              setPage(page-1)
            }
          }
          } variant="outline" size="icon"><ArrowLeft size={16}/></Button>
          <span className="mx-2">{page+1}/{
              Math.floor(orders
                .filter(o=>currentState === "Tout" ? true :  o.status.toLowerCase() === currentState.toLowerCase())
                .filter(o=>JSON.stringify(o).toLowerCase().includes(search.toLowerCase()))
                  .length/limitOrders) +1
              }</span>
          <Button onClick={()=>{
            if(page < Math.floor(orders
              .filter(o=>currentState === "Tout" ? true :  o.status.toLowerCase() === currentState.toLowerCase())
              .filter(o=>JSON.stringify(o).toLowerCase().includes(search.toLowerCase()))
                  .length/limitOrders)){
              setPage(page+1)
            }
          }
          } variant="outline" size="icon"><ArrowRight size={16}/></Button>
        </div>
        }
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
