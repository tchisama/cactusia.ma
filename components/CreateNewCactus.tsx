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
import { addDoc, collection, setDoc } from 'firebase/firestore'

type Props = {}

const CreateNewCactus = (props: Props) => {
    const [file, setFile] = useState<File>();
    const [image, setImage] = useState("");
    const [name,setName] = useState("");
    const [about,setAbout] = useState("")
    function handleChange(e:any) {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }
    const create = () => {
      const name = "" + Date.now() as string
      const storageRef = ref(storage, 'cactuses/'+name);
      if(file){
        uploadBytes(storageRef, file as File).then((snapshot) => {
           console.log(snapshot)
           setDoc(
            collection(db, "cactuses"),
            {
              name,
              about,
              image: snapshot.metadata.fullPath,
              inStock: true,
              createdAt : new Date(),
              order: 0
            }
           )
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
                  <div className='relative px-6 overflow-hidden bg-slate-100 rounded-2xl border h-fit'>
                      {/* <Image  src={""} alt='' className='mb-4 z-10 relative' width={200} height={200}>
                      </Image> */}
                      {
                        file ?
                        <Image  src={image} alt='' className='mb-8 z-10 relative' width={300} height={300}>
                        </Image>:
                        <Image  src={"https://firebasestorage.googleapis.com/v0/b/cactusia-adf86.appspot.com/o/cactus%2F10.png?alt=media&token=f07fe8a1-d600-4985-b263-c4a3f89d919c"} alt='' className='mb-8 z-10 opacity-0 relative' width={300} height={300}>
                        </Image>
                      }
                      <Image className='absolute z-[0] top-[170px] left-1/2 translate-x-[-50%]'  src={"https://firebasestorage.googleapis.com/v0/b/cactusia-adf86.appspot.com/o/pots%2F1.png?alt=media&token=42e00519-9931-473e-8f5a-9f987645a634"} alt='' width={300} height={300}>
                      </Image>
                  </div>
                </label>
            </div>
            <div className='flex-1 space-y-4'>
              <h2>Cactus Name</h2>
              <Input value={name} onInput={(e:any)=>setName(e.target.value)} className='w-full' />
              <h2>About Cactus</h2>
              <Textarea value={about} onInput={(e:any)=>setAbout(e.target.value)} className='w-full h-[300px]' />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={"secondary"}>
              Close
            </Button>
          </DialogClose>
          <DialogClose>
            <Button variant={"default"} onClick={create}>
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNewCactus