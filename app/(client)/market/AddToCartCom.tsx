"use client"


import { ChangeText, GetText } from '@/components/TextEditable'
import { Button } from '@/components/ui/button'
import useCartStore from '@/store/cart'
import useCactusStore from '@/store/market'
import { Minus, Plus, ShoppingBasket } from 'lucide-react'
import React from 'react'

type Props = {}

function AddToCartCom({}: Props) {

    const {activeCactus, setActiveCactus,activePot, setActivePot,cactuses, pots} = useCactusStore()
    const {addToCart,cart,updateQuantity} = useCartStore()
    const handelAddToCart = ()=>{
      addToCart({
        cactus: cactuses[activeCactus].image,
        pot: pots[activePot].image,
        quantity: 1
      })
    }




  return (
      cart.length > 0 &&
      cart.find((item)=>item.cactus === cactuses[activeCactus].image && item.pot === pots[activePot].image) ?
      <div className='flex gap-4 items-center '>
        <Button onClick={()=>
          {

          const index = cart.findIndex((item)=>item.cactus === cactuses[activeCactus].image && item.pot === pots[activePot].image)
          updateQuantity(
          //index, new quantity
            index,cart[index].quantity - 1
          )
          }
        } className='p-8 rounded-full flex flex-row-reverse gap-2 w-full md:w-fit text-lg items-center'><Minus/></Button>
        <div className="flex-1 text-center text-2xl font-bold opacity-70 px-8">
        {
          cart.find((item)=>item.cactus === cactuses[activeCactus].image && item.pot === pots[activePot].image)?.quantity || 0
        }
        </div>
        <Button
          onClick={()=>{
            const index = cart.findIndex((item)=>item.cactus === cactuses[activeCactus].image && item.pot === pots[activePot].image)
            updateQuantity(
            //index, new quantity
              index,cart[index].quantity + 1
            )
          }
          }
          className='p-8 rounded-full flex flex-row-reverse gap-2 w-full md:w-fit text-lg items-center'><Plus/></Button>
      </div>
      :
      <ChangeText reference={{page:"market",ref:"add to cart"}}>
        <Button onClick={handelAddToCart} className='p-8 rounded-full flex flex-row-reverse gap-2 w-full md:w-fit text-lg items-center'><GetText reference={{page:"market",ref:"add to cart"}}></GetText> <ShoppingBasket size={26}/></Button>
      </ChangeText>
  )
}

export default AddToCartCom
