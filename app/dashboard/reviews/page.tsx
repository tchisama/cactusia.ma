"use client"
import AddReview from '@/components/AddReview'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { db } from '@/firebase'
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { Check, Edit, Edit2, Star, Trash, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { array } from 'zod'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeleteReview from '@/components/DeleteReview'

type Props = {}


export type Review = {
  name : string
  review : string
  rating : number
  image: string
  createdAt : Date
  id : string
  show : boolean
}

const Page = (props: Props) => {
  const [reviews , setReviews] = useState<Review[]>([])
  useEffect(()=>{
    const unsub = onSnapshot(collection(db,"reviews"),(doc)=>{
      setReviews(
        doc.docs.map(d=>({...d.data() as Review , id: d.id}))
      )
      console.log(
        doc.docs.map(d=>({...d.data() as Review , id: d.id}))
      )
    })
    return ()=> unsub()
  },[])
  return (
    <div className='p-4 font-bold text-gray-700'>
      <div className='flex justify-between items-center'>
          <h1 className='text-3xl'>Reviews</h1>
          <AddReview/>
      </div>
      <div className='grid grid-cols-5 gap-4'>
        {
          reviews.map(review => (
            <ReviewComp key={review.id} review={review}/>
          ))
        }
      </div>
    </div>
  )
}




const ReviewComp = ({review}:{review:Review})=>{
  const [editMode , setEditMode] = useState(false)

  const [name, setName] = useState(review.name)
  const [rating, setRating] = useState(review.rating)
  const [reviewText, setReviewText] = useState(review.review)
  const update = ()=>{
    updateDoc(doc(db, "reviews", review.id), {
      name,
      rating,
      review : reviewText
    })
  }
  return(
            <div key={review.id} className='gap-8 h-fit bg-white border rounded-xl shadow '>
              <div className='relative'>
                <Image  src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/reviews%2F${review.image}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} alt='' className=' z-10 relative aspect-square w-full  object-cover ' width={300} height={300}>
                </Image>
                <div className='absolute top-0 left-0 flex z-10 gap-1 p-2'>
                  <Button variant={"outline"} onClick={
                    ()=>{
                      setEditMode(p=>!p)
                      if(editMode){
                        update()
                      }
                    }} size={"icon"}>
                    {
                      editMode ?
                      <Check size={16} />
                      :
                      <Edit size={16}/>
                    }
                  </Button>
                  {
                    editMode ?
                    <DeleteReview id={review.id}/>
                    : null
                  }
                </div>
              </div>
              <div className='flex-1 p-2'>
                {
                  editMode ?
                  <Input value={name} onChange={e=>setName(e.target.value)} />
                  :
                  <h1 className='text-xl'>{review.name}</h1>
                }
                {
                  editMode ?
                  <StarsRating rating={rating} setRating={setRating} />
                  :
                  <div className='flex py-2'>
                  {
                    new Array(review.rating).fill(0).map((s,i)=>(
                      <Star key={i}  size={14} className='fill-orange-400 text-orange-400'></Star>
                    ))
                  }
                  </div>
                }
                  {
                    editMode ?
                    <Textarea className='min-h-[250px]' value={reviewText} onChange={e=>setReviewText(e.target.value)} />
                    :
                    <p className='text-xs'>{review.review}</p>
                  }
              </div>
            </div>
  )
}






const StarsRating = ({rating,setRating}:{rating:number,setRating:Function})=>{
  return (

    <DropdownMenu>
      <DropdownMenuTrigger>
                  <div className='flex py-2 w-full bg-slate-100 min-w-[90px] my-1 px-2 rounded-full'>
                  {
                    new Array(rating).fill(0).map((s,i)=>(
                      <Star key={i}  size={14} className='fill-orange-400 text-orange-400'></Star>
                    ))
                  }
                  </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>

      {
        new Array(5).fill(0).map((s,i)=>{
          return(
            <DropdownMenuItem key={i} onClick={()=>setRating(i+1)}>
                  <div className='flex py-2'>
                  {
                    new Array(i+1).fill(0).map((s,i)=>(
                      <Star key={i}  size={14} className='fill-orange-400 text-orange-400'></Star>
                    ))
                  }
                  </div>
            </DropdownMenuItem>
          )
        })
      }
      </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default Page