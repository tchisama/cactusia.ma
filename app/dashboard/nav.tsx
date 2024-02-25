"use client"
import { useUserStore } from '@/store/users'
import { Box, Home, Languages, LayoutList, Leaf, LogOut, Palette, Star, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

function Nav({}: Props) {
  const size = 20
   const pathname = usePathname()
   const {user}  = useUserStore()
  return (
    <div className='bg-white border-r pt-20 shadow-xl flex flex-col gap-2 p-2 w-[250px]'>
        {
          user &&
          (user.rule === "admin" ? [
            {name:"Dashboard",href:"/",icon:<Home size={size}/>},
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
          ]:[])
          .map(({name,href,icon},i) =>(
            <Link  href={"/dashboard"+href} key={name}  className={' p-2  flex gap-2 items-center rounded-xl px-4 text-gray-600  font-bold '+((pathname === "/dashboard"+(href == "/" ? "":href)) ? " bg-primary text-white " : " bg-gray-50")}>{icon}{name}</Link> 
          ))
        }
        <button onClick={()=>{localStorage.removeItem("user");window.location.reload()}} className='mt-auto  p-2  flex gap-2 items-center mb-2 bg-slate-100 rounded-xl px-4 text-gray-600  font-bold '><LogOut size={size}/> <div className='flex flex-col items-start'>
          <div className='text-sm'>{user.name}</div>
          <div className='text-xs'>Logout</div>
          </div></button>
    </div>
  )
}

export default Nav