"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { db } from "@/firebase"
import useOrdersStore from "@/store/backend"
import { useUserStore } from "@/store/users"
import { Timestamp, addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { CheckCheckIcon, CheckIcon, SmileIcon, StarsIcon, TriangleIcon, TruckIcon, XIcon } from "lucide-react"

import React, { useEffect, useState } from 'react'


type Props = {
  state:"New"|"Confirmé"|"Prêt"|"En livraison"|"Livré"|"Injoignable"|"Reporté"|"Annulé"|"Fake"
  id:string
}

  
export const states = [
  {
    name: "New",
    color: "#8ac926",
    id: 1,
    icon:<StarsIcon/>
  },
  {
    name: "Confirmé",
    color: "#378Db1",
    id: 2,
    icon:<CheckIcon/>
  },
  {
    name: "Prêt",
    color: "#5a189a",
    id: 3,
    icon:<CheckCheckIcon/>
  },
  {
    name: "En livraison",
    color: "#002288",
    id: 4,
    icon:<TruckIcon/>
  },
  {
    name: "Livré",
    color: "#488157",
    id: 5,
    icon:<SmileIcon/>
  },
  {
    name: "Injoignable",
    color: "#bb4d00",
    id: 6,
    icon:<TriangleIcon/>
  },
  {
    name: "Reporté",
    color: "#D69E2E",
    id: 7,
    icon:<TriangleIcon/>
  },
  {
    name: "Annulé",
    color: "#f32f27",
    id: 8,
    icon:<XIcon/>
  },
  {
    name: "Fake",
    color: "#333333",
    id: 9,
    icon:<TriangleIcon/>
  }
];

function StateChanger({state,id}: Props) {
  const [selectedState, setSelectedState] = useState(states[1]); // Default state

  useEffect(() => {
    setSelectedState(states.find((s) => (s.name as string ).toLowerCase() === state.toLocaleLowerCase()) || states[2]);
  }, [state])

  const {user } = useUserStore()
  const {orders} = useOrdersStore()

  

  const handleStateChange = (state: typeof states[number]) => {
    setSelectedState(state);
    // Here you can perform any additional logic, such as updating the backend
    // or triggering other actions based on the selected state
    updateDoc(doc(db,"orders",id),{status:state.name})
    // add notification

    const oldState = selectedState;
    const currentOrder = orders.find((order)=>order.id === id)
    addDoc(collection(db,"notifications"),{
      message:`Order of ${[currentOrder?.firstName,currentOrder?.lastName].join(" ")} , status changed from ${oldState.name} to ${state.name}`,
      date: Timestamp.now(),
      type:"order-state-change",
      from:oldState.name,
      to:state.name,
      order:currentOrder,
      user: {
        name:user.name,
        email:user.email,
      }
    })
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger style={{ backgroundColor: selectedState.color+"aa",color:"white" }} className="px-4 flex gap-2 items-center justify-between w-[160px] py-1 border rounded-full">{selectedState.name} {
        selectedState?.icon
      }</DropdownMenuTrigger>
      <DropdownMenuContent>
        {states.map((state) => (
          <DropdownMenuItem className="mt-1 flex gap-2 items-center" style={{ backgroundColor: state.color+"aa",color:"white"  }} key={state.id} onClick={() => handleStateChange(state)}>
            {state.name} 
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default StateChanger
