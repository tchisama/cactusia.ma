import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog'
import { Button } from './ui/button'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'
import { Trash } from 'lucide-react'

type Props = {
  id:string
}

function DeleteOrder({id}: Props) {
  const deleteOrder = () => {
    deleteDoc(doc(db, "orders", id))
  }
  return (
<Dialog>
  <DialogTrigger asChild>
                <Button variant={"outline"} size={"icon"}><Trash size={16}/></Button>
</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
    </DialogHeader>
    <DialogFooter>
      <DialogClose >
        <Button variant={"outline"}>cancel</Button>
      </DialogClose>
      <DialogClose >
        <Button variant={"destructive"} onClick={deleteOrder}>Delete</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default DeleteOrder