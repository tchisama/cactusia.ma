"use client"
import React from 'react'
import Logo from "@/app/icon.jpeg"
import Image from 'next/image'
import { Separator } from '@radix-ui/react-dropdown-menu'
import QrCode from 'react-qr-code'
import useOrdersStore from '@/store/backend'

type Props = {}

function page({}: Props) {
  const {orders} = useOrdersStore()
  return  (
    <div>
    <div className="grid  grid-cols-2 p-2 gap-1  ">
      {
        orders
        .filter((item, index) => item.selected === true)
        // .filter((item, index) => index < 12)
        .map((item, index) => {
          return (
            <div key={index} className="border-2 h-fit bg-white border-gray-300 p-4">
              <div className="flex mb-4 justify-between">
              <Image src={Logo} className="h-fit" width={50} height={50} alt=""></Image>
              <QrCode className="w-20 h-20" value={"cactusia.ma/dashboard/orders/"+item.id} />
              </div>
              <h1 className="font-bold text-xl">{item.firstName} {item.lastName}</h1>
              <div className="border-t-gray-300 border-t-2 my-1"></div>
              <h1 className="font-bold text-xl"> {item.city}</h1>
              <div className="border-t-gray-300 border-t-2 my-1"></div>
              <h1 className="font-bold text-xl">{item.number}</h1>
              <div className="border-t-gray-300 border-t-2 my-1"></div>
              <h1 className="text-xl">{item.price} Dh</h1>
            </div>
          )
        })
      }
    </div>
    </div>
  )
}

export default page
