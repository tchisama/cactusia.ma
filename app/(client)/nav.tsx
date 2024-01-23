"use client"
import Link from 'next/link';
import React from 'react';
import Logo from "@/public/images/logo.jpeg"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MenuIcon, ShoppingBasket } from 'lucide-react';
import Menu from './Menu';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <motion.nav initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} className='flex gap-4 justify-between items-center p-4 md:p-8 bg-white max-w-screen-2xl mx-auto'>
      <div className="logo">
        <Link href="/">
          <Image width={50} height={50} src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="secondary" className=' w-14 h-14 rounded-full ' size="icon">
          <ShoppingBasket size={26} />
        </Button>
        <Menu />
      </div>
    </motion.nav>
  );
};

export default Navbar;
