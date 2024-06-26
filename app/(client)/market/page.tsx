'use client'
import React from 'react'
import cactus from "@/public/images/cactus.png"
import Image from 'next/image'
import { Leaf, Palette, ShoppingBasket } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import PotCactus from '@/components/PotCactus'
import PotCactusWithControllers from '@/components/PotCactusWithControlers'
import AboutCactus from '@/components/AboutCactus'
import Reviews from '@/components/Reviews'
import useCartStore from '@/store/cart'
import useCactusStore from '@/store/market'
import { toast } from 'sonner'
import AddReview from '@/components/AddReview'
import TextEditable, { ChangeText, GetText } from '@/components/TextEditable'
import findUserIpAddress from '@/lib/findUserIpAddress'
import AddToCartCom from './AddToCartCom'
type Props = {}

const page = (props: Props) => {
    const {activeCactus, setActiveCactus,activePot, setActivePot,cactuses, pots} = useCactusStore()
    const {addToCart} = useCartStore()
    const handelAddToCart = ()=>{
      addToCart({
        cactus: cactuses[activeCactus].image,
        pot: pots[activePot].image,
        quantity: 1
      })
      const userIp = "0.0.0.0";
    //   fetch(`https://graph.facebook.com/v19.0/${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
    //     }/events?access_token=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ACCESS_TOKEN
    //     }`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(
    //       {
    //         "data": [
    //           {
    //             "event_name": "AddToCart",
    //             "event_id": crypto.randomUUID(),
    //             "event_time": Math.floor(Date.now() / 1000),
    //             "action_source": "website",
    //             "user_data": {
    //               "em": [null],
    //               "client_user_agent": navigator.userAgent,
    //               "client_ip_address": userIp || "0.0.0.0"
    //             },
    //             "custom_data": {
    //               "currency": "USD",
    //               "value": 65 / 10,
    //             }
    //           }
    //         ],
    //         // "test_event_code": process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_TEST_EVENT_CODE
          // }
        // )
      // })
    //   // alert(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_TEST_EVENT_CODE)
    //   toast("Pot cactus added", {
    //     icon: "✅",
    //     duration: 700
    //     })
    }
  return (
    <div className='container px-4 md:px-6 '>
    <div className="flex flex-col md:flex-row items-center  md:gap-20">
        <div className=' flex md:flex-[3] max-h-[50vh] md:max-h-[70vh] items-center justify-center '>
            {/* <Image src={cactus} alt="Cactus" width={500} height={500} className='w-ful object-contain h-full'></Image> */}
            <PotCactusWithControllers />
        </div>
        <div className=' md:flex-[2] w-full'>
            <div className='md:ml-2 space-y-2'>
                <h3 className='text-gray-500 text-sm md:text-md'><TextEditable reference={{page:"market",ref:"price"}}></TextEditable></h3>
                <h1 className='md:text-5xl text-3xl'>65.00 Dh</h1>
                {/* <Separator className='my-2 md:my-4 md:max-w-sm'/> */}
                <div className='flex justify-between'>
                    <h1 className=' flex items-center gap-2  text-md md:text-lg'><Leaf size={18}/>{cactuses[activeCactus]?.name}</h1>
                    <span className='text-gray-500 text-sm md:text-md'>{activeCactus+ 1}/{cactuses.length}</span>
                </div>
                <div className='flex justify-between'>
                    <h1 className=' flex items-center gap-2   text-md md:text-lg'><Palette size={18}/>{pots[activePot]?.name}</h1>
                    <span className='text-gray-500 text-sm md:text-md'>{activePot+ 1}/{pots.length}</span>
                </div>
            </div>
            <Separator className='my-2 md:my-4 md:max-w-sm'/>
          <div className='md:my-4 my-1 w-full '>

            <AddToCartCom/>
            </div>
            <p className='p-2 px-3 w-fit rounded-xl bg-green-100 text-sm md:text-md text-green-800'>
              <TextEditable reference={{page:"market",ref:"description"}}></TextEditable>
            </p>
        </div>
    </div>
    <AboutCactus/>
    <Reviews />
    <AddReview/>
    </div>
  )
}

export default page
