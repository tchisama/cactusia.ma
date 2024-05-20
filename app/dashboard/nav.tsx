"use client"
import useOrdersStore from '@/store/backend'
import { useUserStore } from '@/store/users'
import { BellIcon, Box, Home, Languages, LayoutList, Leaf, LogOut, MailIcon, Palette, Star, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'

type Props = {}


const usersRules = {
  "admin":["dashboard","orders","messages","cactuses","pots","reviews","language","sections","users"],
  "creator":["pots","cactuses","language","sections","reviews"],
  "confirmor":["orders","messages"],
  "orders-pots-cactuses":["orders","cactuses","pots","notifications"]
}


function Nav({}: Props) {
  const size = 20
   const pathname = usePathname()
   const {user}  = useUserStore()
  const {orders} = useOrdersStore()



  useMemo(()=>{
    console.log(user)
    const _user = localStorage.getItem("user");
    console.log(pathname)
    if(_user){
      const JSONuser = JSON.parse(_user)
      if(JSONuser.rule === "creator"){
        if(!usersRules.creator.includes(pathname.replace("/dashboard/",""))){
          window.location.href = "/dashboard/pots"
        }
      }else if(JSONuser.rule === "confirmor"){
        if(!usersRules.confirmor.includes(pathname.replace("/dashboard/",""))){
          window.location.href = "/dashboard/orders"
        }
      }else if(JSONuser.rule === "orders-pots-cactuses"){
        if(!usersRules["orders-pots-cactuses"].includes(pathname.replace("/dashboard/",""))){
          window.location.href = "/dashboard/orders"
        }
      }
    }
  },[])
  return (
    pathname !== "/dashboard/orders-tickets" &&
    <div className='bg-white border-r pt-20 shadow-xl flex flex-col gap-2 md:p-2 w-[50px] md:w-[250px]'>
        {
          user &&
          (user.rule === "admin" ? [
            {name:"Dashboard",href:"/",icon:<Home size={size}/>},
            {name:"Notifications",href:"/notifications",icon:<BellIcon size={size}/>},
            {name:"Messages",href:"/messages",icon:<MailIcon size={size}/>},
            {name:"Orders",href:"/orders" ,icon:<Box size={size}/>},
            {name:"Cactuses",href:"/cactuses",icon:<Leaf size={size}/>},
            {name:"Pots",href:"/pots" ,icon:<Palette size={size}/>},
            {name:"Reviews",href:"/reviews" ,icon:<Star size={size}/>},
            {name:"Language",href:"/language" ,icon:<Languages size={size}/>},
            {name:"Sections",href:"/sections" ,icon:<LayoutList size={size}/>},
            {name:"Users",href:"/users" ,icon:<Users size={size}/>},
          ]: user.rule === "creator" ? [
            {name:"Cactuses",href:"/cactuses",icon:<Leaf size={size}/>},
            {name:"Pots",href:"/pots" ,icon:<Palette size={size}/>},
            {name:"Reviews",href:"/reviews" ,icon:<Star size={size}/>},
            {name:"Language",href:"/language" ,icon:<Languages size={size}/>},
            {name:"Sections",href:"/sections" ,icon:<LayoutList size={size}/>},
          ]: user.rule === "confirmor" ? [
            {name:"Orders",href:"/orders" ,icon:<Box size={size}/>},
            {name:"Messages",href:"/messages",icon:<MailIcon size={size}/>},
          ]: user.rule === "orders-pots-cactuses" ? [
            {name:"Notifications",href:"/notifications",icon:<BellIcon size={size}/>},
            {name:"Messages",href:"/messages",icon:<MailIcon size={size}/>},
            {name:"Orders",href:"/orders" ,icon:<Box size={size}/>},
            {name:"Cactuses",href:"/cactuses",icon:<Leaf size={size}/>},
            {name:"Pots",href:"/pots" ,icon:<Palette size={size}/>},
          ]:[])
          .map(({name,href,icon},i) =>(
            <Link  href={"/dashboard"+href} key={name}  className={' p-2  flex gap-2 items-center rounded-xl px-4 text-gray-600  font-bold '+((pathname === "/dashboard"+(href == "/" ? "":href)) ? " bg-primary text-white " : " bg-gray-50")}>{icon}<div className="hidden md:block">{name}</div>{name=="Orders" && <div className="bg-primary w-5 h-5 flex items-center justify-center rounded-full pt-1 text-white">{orders.filter(o=>o.status.toLowerCase()=="new").length}</div>}</Link> 
          ))
        }
        <button onClick={()=>{localStorage.removeItem("user");window.location.reload()}} className='mt-auto  p-2  flex gap-2 items-center mb-2 bg-slate-100 rounded-xl px-4 text-gray-600  font-bold '><LogOut size={size}/> <div className='flex flex-col items-start'>
          <div className='text-sm md:block hidden'>{user.name}</div>
          <div className='text-xs md:block hidden'>Logout</div>
          </div></button>
    </div>
  )
}

export default Nav
