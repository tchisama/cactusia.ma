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
  children: React.ReactNode,
  DeleteFunction: () => void
}


function DeleteDialog({children,DeleteFunction}: Props) {
  return (
<Dialog>
  <DialogTrigger asChild>
    {children}
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
        <Button variant={"destructive"} onClick={DeleteFunction}>Delete</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default DeleteDialog