"use client"
import { Button } from '@/components/ui/button'
import { MenuIcon, X } from 'lucide-react'
import React, { useState } from 'react'
import {AnimatePresence, motion} from "framer-motion"
import Link from 'next/link'
import { GetText } from '@/components/TextEditable'
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
            open ? <motion.div initial={{x:600}} animate={{x:0}}  exit={{x:600}} className={'flex-col w-screen md:w-[30vw] h-screen flex justify-center fixed top-0 right-0 bg-primary z-10 p-10'}>
                {
                    [
                        {name:<GetText reference={{page:"footer",ref:"home"}}></GetText>,href:"/"},
                        {name:<GetText reference={{page:"footer",ref:"market"}}></GetText>,href:"/market"},
                        {name:<GetText reference={{page:"footer",ref:"contact"}}></GetText>,href:"/contact"},
                        {name:<GetText reference={{page:"footer",ref:"about"}}></GetText>,href:"/about"},
                    ].map(({name,href},i) => 
                    <div className='overflow-hidden '>
                    <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} exit={{opacity:0,y:40}} transition={{duration:0.3,delay:0.1*i,ease:[.35,.17,.3,.86]}} className='py-4'>
                        <Link onClick={()=>setTimeout(() => {
                            setOpen(false)
                        }, 300)} href={href} key={href} className=' md:text-6xl text-6xl py-[18px] text-black/50 uppercase font-bold '>{name}</Link>
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