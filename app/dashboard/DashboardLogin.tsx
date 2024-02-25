"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/firebase'
import { useUserStore } from '@/store/users'
import { and, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {children: React.ReactNode}

function DashboardLogin({children}: Props) {
  const [loggedIn, setLoggedIn] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {user,setUser} = useUserStore()
  const router = useRouter()
  const login = async()=>{
    const user = await getDocs(query(collection(db, "admins"), and(where("email", "==", email), where("password", "==", password)))).then((d)=>d.docs.map(d=>({...d.data() ,id : d.id }))).then((d)=>{
        console.log(d)
        if(d.length > 0 ){ 
          setLoggedIn(true)
          setUser(d[0])
          // save in local storage
          localStorage.setItem("user",JSON.stringify(d[0]))
          if((d[0] as any).rule === "creator"){
            router.push("/dashboard/pots")
          }else if((d[0] as any).rule === "confirmor"){
            router.push("/dashboard/orders")
          }
        }else{
          setLoggedIn(false)
          alert("invalid email or password")
        }
    })
  }
  useEffect(()=>{
    const user = localStorage.getItem("user")
    if(user){
      setLoggedIn(true)
      setUser(JSON.parse(user))
    }
  },[])
  return (
    <div>{
      loggedIn ? children :
      <div className='min-h-screen flex items-center justify-center w-full bg-primary flex-1'>
        <div className='max-w-xl flex flex-col gap-2 w-full'>
          <h1 className='text-4xl text-white font-bold capitalize mb-4'>Login</h1>
          <Input onChange={(e)=>setEmail(e.target.value)} type="email" value={email} placeholder='email' className='w-full '></Input>
          <Input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='password' className='w-full '></Input>
          <Button onClick={login} className='w-[300px]' variant={"secondary"}>Login</Button>
        </div>
      </div>
    }</div>
  )
}

export default DashboardLogin