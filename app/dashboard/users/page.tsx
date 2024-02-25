"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { db } from '@/firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

type Props = {}


type User = {
  id: string
  name: string
  email: string
  password: string
  rule: "admin" | "confirmor" | "creator"
  createdAt: Date
}

function Page({}: Props) {
  const [users,setUsers] = useState<User[]>([])
  const [user,setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    password: "",
    rule: "confirmor",
    createdAt: new Date()
  })
  const createUsesr = ()=>{
    addDoc(collection(db, "admins"), user).then(()=>getDocs(collection(db, "admins")).then((d)=>setUsers(d.docs.map(d=>({...d.data() as User ,id : d.id })))))
  }
  useEffect(()=>{
    getDocs(collection(db, "admins")).then((d)=>setUsers(d.docs.map(d=>({...d.data() as User ,id : d.id }))))
  },[])
  return (
    <div className='p-4 font-bold text-gray-700'>
      <div className='flex justify-between items-center'>
          <h1 className='text-3xl'>Users</h1>
      </div>
      <div className='max-w-xl mt-5 p-4 rounded-xl border flex flex-col gap-2'>
        <h1>Add User</h1>
        <Input onChange={(e)=>setUser({...user , name: e.target.value})} value={user.name} placeholder="Name" />
        <Input onChange={(e)=>setUser({...user , email: e.target.value})} value={user.email} placeholder="Email" />
        <Input onChange={(e)=>setUser({...user , password: e.target.value})} value={user.password} placeholder="Password" />
        <Select  onValueChange={(e:any)=>setUser({...user , rule: e})} value={user.rule} >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="confirmor">Confirmor</SelectItem>
            <SelectItem value="creator">Creator</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={()=>createUsesr()} className='w-full'>Add User</Button>
      </div>
      <div className='mt-5 text-2xl py-3'>Admins</div>
      <div className='grid  grid-cols-3 gap-4'>
        {
          users.map(user => (
            <UserComp key={user.id} user={user}/>
          ))
        }
      </div>
    </div>
  )
}
const UserComp = ({user}: {user:User}) => {
  return (
    <div className='flex gap-2 flex-col border p-4 rounded-xl'>
      <p className='text-xl'>{user.name}</p>
      <p className='text-sm bg-slate-50 rounded-xl border px-4 py-1 w-fit '>{user.rule}</p>
      <p className='text-sm'>email : {user.email}</p>
      <p className='text-sm'>password : {user.password}</p>
    </div>
  )
}


export default Page