"use client"
import { useUserStore } from '@/store/users'
import { Box, Home, Languages, LayoutList, Leaf, Palette, Star, Users } from 'lucide-react'
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
    </div>
  )
}

export default Nav