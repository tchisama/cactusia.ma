"use client"
import Link from 'next/link';
import React from 'react';
import Logo from "@/public/images/logo.jpeg"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MenuIcon, ShoppingBasket } from 'lucide-react';
import Menu from './Menu';
import { motion } from 'framer-motion';
import useCartStore from '@/store/cart';
import TextEditable from '@/components/TextEditable';
import Marquee from "react-fast-marquee";
const Navbar: React.FC = () => {
  const {cart} = useCartStore()
  return (
    <>
    <div className='bg-primary   text-center text-lg py-1'>
      <Marquee>
      <p className='flex items-center justify-center text-white'><TextEditable reference={{page:"home",ref:"slider"}}></TextEditable></p>
      </Marquee>
    </div>
    <motion.nav initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} className='flex gap-4 justify-between items-center p-4 md:p-8 bg-white max-w-screen-2xl mx-auto'>
      <div className="logo">
        <Link href="/">
          <Image width={50} height={50} src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="flex  gap-2 items-center">
        <Link href={"/cart"} className='relative z-10'>
          {
            cart.length > 0 && 
            <div className='absolute right-0 top-0 bg-primary text-white rounded-full w-6 h-6 text-center items-center justify-center flex'>{cart.reduce ((acc, item) => acc + item.quantity, 0)}</div>
          }
          <Button variant="secondary" className='border w-14 h-14 rounded-full ' size="icon">
            <ShoppingBasket size={26} />
          </Button>
        </Link>
        <Menu />
      </div>
    </motion.nav>
    </>
  );
};

export default Navbar;
