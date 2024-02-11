"use client"
import { Box, Home, Languages, LayoutList, Leaf, Palette, Star } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

function Nav({}: Props) {
  const size = 20
   const pathname = usePathname()
  return (
    <div className='bg-white border-r pt-20 shadow-xl flex flex-col gap-2 p-2 w-[250px]'>
        {
          [
            {name:"Dashboard",href:"/",icon:<Home size={size}/>},
            {name:"Orders",href:"/orders" ,icon:<Box size={size}/>},
            {name:"Cactuses",href:"/cactuses",icon:<Leaf size={size}/>},
            {name:"Pots",href:"/pots" ,icon:<Palette size={size}/>},
            {name:"Reviews",href:"/reviews" ,icon:<Star size={size}/>},
            {name:"Language",href:"/language" ,icon:<Languages size={size}/>},
            {name:"Sections",href:"/sections" ,icon:<LayoutList size={size}/>},
          ].map(({name,href,icon},i) =>(
            <Link  href={"/dashboard"+href} key={name}  className={' p-2  flex gap-2 items-center rounded-xl px-4 text-gray-600  font-bold '+((pathname === "/dashboard"+(href == "/" ? "":href)) ? " bg-primary text-white " : " bg-gray-50")}>{icon}{name}</Link> 
          ))
        }
    </div>
  )
}

export default Nav