'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import Image from 'next/image'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { DialogClose } from '@radix-ui/react-dialog'
import { ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/firebase'
import { addDoc, collection } from 'firebase/firestore'

type Props = {}

const CreateNewPot = (props: Props) => {
    const [file, setFile] = useState<File|null>(null);
    const [image, setImage] = useState("");
    const [name,setName] = useState("");
    function handleChange(e:any) {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }
    const create = () => {
      const name1 = "" + Date.now() as string
      const storageRef = ref(storage, 'pots/'+name1);
      if(file){
        uploadBytes(storageRef, file as File).then((snapshot) => {
           console.log(snapshot)
           addDoc(
            collection(db, "pots"),
            {
              name,
              image: name1,
              inStock: true,
              createdAt : new Date(),
              order: 0
            }
           )
        }).then(()=>{
          setFile(null)
          setImage("")
          setName("")
        });
      }
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='rounded-full p-6'>
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-5xl overflow-hidden'>
        <DialogHeader>
          <DialogTitle>Add New Cactus</DialogTitle>
          <DialogDescription className='flex gap-6 pt-6'>
            <div className='flex flex-col gap-4 '>
                <input type="file" onChange={handleChange} className='hidden' id='image' accept='image/*'></input>
                <label className='cursor-pointer' htmlFor='image'>
                  <div className='relative flex items-center p-5 justify-center px-6 overflow-hidden bg-slate-100 rounded-2xl border h-fit'>
                      <Image className='z-[0] top-[170px] '  src={image} alt='' width={200} height={200}>
                      </Image>
                  </div>
                </label>
            </div>
            <div className='flex-1 space-y-4'>
              <h2>Color Name</h2>
              <Input value={name} onInput={(e:any)=>setName(e.target.value)} className='w-full' />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button  variant={"secondary"}>
              Close
            </Button>
          </DialogClose>
          <DialogClose>
            <Button disabled={!name || !file} variant={"default"} onClick={create}>
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNewPot