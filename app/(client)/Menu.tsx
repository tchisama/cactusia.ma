"use client"
import { Button } from '@/components/ui/button'
import { MenuIcon, X } from 'lucide-react'
import React, { useState } from 'react'
import {AnimatePresence, motion} from "framer-motion"
import Link from 'next/link'
type Props = {}


const Menu = (props: Props) => {
    const [open,setOpen] = useState(false)
  return (
        <>
        <Button variant={open ? "secondary" : "default"} onClick={() => setOpen(!open)} className='z-20 w-14 h-14 rounded-full ' size="icon">
            {
                open ? <X size={26} /> : <MenuIcon size={26} />
            }
        </Button>
        <AnimatePresence>
        {
            open ? <motion.div initial={{opacity:0}} animate={{opacity:1}}  exit={{opacity:0}} className={'flex-col w-screen h-screen flex justify-center fixed top-0 left-0 bg-primary z-10 p-10'}>
                {
                    [
                        {name:"Home",href:"/"},
                        {name:"Market",href:"/market"},
                        {name:"Contact",href:"/contact"},
                        {name:"About",href:"/about"},
                    ].map(({name,href},i) => 
                    <div className='overflow-hidden '>
                    <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} exit={{opacity:0,y:40}} transition={{duration:0.3,delay:0.1*i}}>
                        <Link onClick={()=>setTimeout(() => {
                            setOpen(false)
                        }, 300)} href={href} key={name} className='text-9xl text-black/50 uppercase font-bold '>{name}</Link>
                    </motion.div>
                    </div>
                    )
                }
            </motion.div> : null
        }
        </AnimatePresence>
        </>
  )
}

export default Menu