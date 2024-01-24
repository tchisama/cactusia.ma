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

const CreateNewCactus = (props: Props) => {
    const [file, setFile] = useState<File|null>(null);
    const [image, setImage] = useState("");
    const [name,setName] = useState("");
    const [about,setAbout] = useState("")
    function handleChange(e:any) {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }
    const create = () => {
      const name1 = "" + Date.now() as string
      const storageRef = ref(storage, 'cactuses/'+name1);
      if(file){
        uploadBytes(storageRef, file as File).then((snapshot) => {
           console.log(snapshot)
           addDoc(
            collection(db, "cactuses"),
            {
              name,
              about,
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
          setAbout("")
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
                        <Image  src={"https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/cactuses%2F1706097332390?alt=media&token=bb288d03-287d-45f0-8b90-f9871f1a7567"} alt='' className='mb-8 z-10 opacity-0 relative' width={300} height={300}>
                        </Image>
                      }
                      <Image className='absolute z-[0] top-[170px] left-1/2 translate-x-[-50%]'  src={"https://firebasestorage.googleapis.com/v0/b/cactusia-983c2.appspot.com/o/1.png?alt=media&token=a1e0aa65-9270-4f04-b175-02e2a7ae919f"} alt='' width={300} height={300}>
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
            <Button  variant={"secondary"}>
              Close
            </Button>
          </DialogClose>
          <DialogClose>
            <Button disabled={!name || !about || !file} variant={"default"} onClick={create}>
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNewCactus