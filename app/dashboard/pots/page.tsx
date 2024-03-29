"use client"
import CreateNewPot from '@/components/CreateNewPot'
import DeleteDialog from '@/components/DeleteDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { db } from '@/firebase'
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { ArrowLeftCircle, ArrowRightCircle, Check, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MdEditSquare } from 'react-icons/md'

type Props = {}


type Pot = {
  name: string
  image: string
  inStock: boolean
  createdAt: Date
  order: number
  id: string
}

const page = (props: Props) => {
  const [pots , setPots] = useState<Pot[]>([])
  useEffect(()=>{
    const unsub = onSnapshot(collection(db, "pots"), (doc) => {
        setPots(
          doc.docs.map(d=>({...d.data() as Pot ,id : d.id }))
        )
    });
    return()=> unsub()
  },[])
  
  return (
    <div className='p-4 font-bold text-gray-700'>
      <div className='flex justify-between items-center'>
          <h1 className='text-3xl'>Pots</h1>
          <CreateNewPot />
      </div>
      <div className='grid grid-cols-3 gap-2 mt-8'>
      {
        // [
        //   "https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/1.png?alt=media&token=a1e0aa65-9270-4f04-b175-02e2a7ae919f",
        // ]
        pots.sort((a,b)=>a.order - b.order).map((pot,i)=>{
          
          return(
            <PotItemComp key={pot.id} pot={pot}/>
          )
        })
      }
      </div>
    </div>
  )
}



const PotItemComp = ({pot}:{pot:Pot})=>{
  const [editMode,setEditMode]= useState(false)
  const [name,setName] = useState(pot.name)
  const [showend, setShowend] = useState(pot.inStock)
  const [order,setOrder] = useState(pot.order)
  const upadate = ()=>{
    
    updateDoc(doc(db, "pots", pot.id), {
      name,
      inStock : showend,
      order,
    })
  }
  return(
            <div  className='bg-white h-fit relative shadow border p-6 rounded-xl overflow-hidden flex gap-8'>
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
              <div className='flex items-end'>
              <div className='relative'>
                <Image  src={`https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/pots%2F${pot.image}?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567`} alt='' className=' z-10 relative h-[80px] object-contain' width={100} height={80}>
                </Image>
              </div>
              </div>
              <div className=''>
                {
                  editMode?
                  <div className='flex gap-2 items-center py-2'>
                    <Button onClick={()=>setOrder(order-1)} size={"icon"} variant={"outline"}><ArrowLeftCircle size={20} /></Button>
                    <h1 className='text-xl'>{order}</h1>
                    <Button onClick={()=>setOrder(order+1)} size={"icon"} variant={"outline"}><ArrowRightCircle size={20} /></Button>
                  </div>
                  :
                  <h1 className='text-xl'>{pot.order}</h1>
                }
                {
                  editMode ?
                  <Input value={name} onChange={(e)=>setName(e.target.value)} />
                  :
                  <h2 className=' mb-2'>{pot.name}</h2>
                }
                <div className='flex gap-4 items-center'>
                {
                  editMode?
                  <Switch className='mt-2' checked={showend} onCheckedChange={()=>setShowend(!showend)} />
                  :
                  showend ? <Check size={20} className='w-6 h-6 rounded-lg bg-green-800 text-white '/> : <X size={20} className='w-6 h-6 rounded-lg bg-red-600 text-white '/>
                }
                {
                  editMode?
                  <DeleteDialog DeleteFunction={
                    ()=>{
                      deleteDoc(doc(db,"pots",pot.id))
                    }
                  } >
                    <Button className='flex mt-4 gap-2' variant={"destructive"}>Delete <Trash2 size={20} /></Button>
                  </DeleteDialog>
                  :null
                }
                </div>
              </div>
            </div>
  )
}


export default page
