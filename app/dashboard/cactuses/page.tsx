"use client"
import CreateNewCactus from '@/components/CreateNewCactus'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { db } from '@/firebase'
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { ArrowLeftCircle, ArrowRightCircle, Check, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MdEditSquare } from "react-icons/md";
type Props = {}


type Cactus = {
  name: string
  about: string
  image: string
  inStock: boolean
  createdAt: Date
  order: number
  id: string
}

const page = (props: Props) => {
  const [cactuses , setCactuses] = useState<Cactus[]>([])
  useEffect(()=>{
    const unsub = onSnapshot(collection(db, "cactuses"), (doc) => {
        setCactuses(
          doc.docs.map(d=>({...d.data() as Cactus ,id : d.id }))
        )
    });
    return()=> unsub()
  },[])
  return (
    <div className=' relative p-4 font-bold text-gray-700 h-screen flex flex-col'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl'>Cactuses</h1>
        <CreateNewCactus />
      </div>
      <div className='flex flex-col p-2 gap-2 mt-8 flex-1 overflow-auto'>
      {
        // [
        //   "https://firebasestorage.googleapis.com/v0/b/cactusia-adf86.appspot.com/o/cactus%2F1.png?alt=media&token=f98a2dc0-1971-4014-b82a-0c5cb8a55cce",
        //   "https://firebasestorage.googleapis.com/v0/b/cactusia-adf86.appspot.com/o/cactus%2F10.png?alt=media&token=f07fe8a1-d600-4985-b263-c4a3f89d919c"
        // ]
        cactuses
        .map((cactus,i)=>{
          return(
            <CactusItemComp key={i} cactus={cactus}/>
          )
        })
      }
      </div>
    </div>
  )
}




const CactusItemComp = ({cactus}:{cactus:Cactus})=>{
          const [editMode,setEditMode] = useState(false)
          const [name , setName] = useState(cactus.name)
          const [about , setAbout] = useState(cactus.about)
          const [showen , setShowen] = useState(cactus.inStock)
          const [order , setOrder] = useState(cactus.order)



    const upadate = ()=>{
      updateDoc(doc(db,"cactuses",cactus.id),{
        name,
        about,
        inStock : showen,
        order
      })
    }

return(
            <div className='bg-white items-start h-fit relative shadow border p-4 rounded-xl  flex gap-8'>
              <Button onClick={()=>{
                setEditMode(!editMode)
                if(editMode) upadate()
              }} className='absolute top-2 right-2' size={"icon"}>
                {
                  editMode?
                  <Check/>
                  :
                  <MdEditSquare size={20} />
                }
              </Button>
              <div className='relative aspect-square overflow-hidden bg-slate-100 rounded-2xl border'>
                <div className='px-3'>
                  <Image  src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/cactuses%2F${cactus.image}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} alt='' className='mb-2 z-10 relative' width={100} height={100}>
                  </Image>
                  <Image className='absolute z-[0] top-14 left-1/2 translate-x-[-50%]'  src={"https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/1.png?alt=media&token=a1e0aa65-9270-4f04-b175-02e2a7ae919f"} alt='' width={100} height={100}>
                  </Image>
                </div>
              </div>
              <div className=''>
                {
                  editMode?
                  <div className='flex gap-2 items-center py-2'>
                    <Button onClick={()=>setOrder(order-1)} size={"icon"} variant={"outline"}><ArrowLeftCircle size={20} /></Button>
                    <h1 className='text-lg'>{order}</h1>
                    <Button onClick={()=>setOrder(order+1)} size={"icon"} variant={"outline"}><ArrowRightCircle size={20} /></Button>
                  </div>
                  :
                  <h1 className='text-lg'>order : {cactus.order}</h1>
                }
                {
                  editMode?
                  <Input value={name} onChange={(e)=>setName(e.target.value)} className='w-full mb-2' />
                  :
                  <h2 className='w-[180px] mb-2'>{cactus.name}</h2>
                }
                {
                  editMode?
                  <Switch checked={showen} onCheckedChange={()=>setShowen(!showen)}/>
                  :
                  <Switch disabled checked={cactus.inStock}/>
                }
              </div>
              <div className='flex-1'>
                  <h2 className='text-sm  mb-2 text-gray-600'>About cactus</h2>
                {
                  editMode?
<Textarea value={about} onChange={(e) => setAbout(e.target.value)} className='w-full min-h-[300px]' />

                  :
                <p className='text-xs'>{cactus.about}</p>
                }
              </div>
            </div>
)
}

export default page