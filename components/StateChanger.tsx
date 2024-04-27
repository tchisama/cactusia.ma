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
import { doc, updateDoc } from "firebase/firestore"

import React, { useEffect, useState } from 'react'


type Props = {
  state:"New"|"Confirmé"|"Prêt"|"En livraison"|"Livré"|"Injoignable"|"Reporté"|"Annulé"|"Fake"
  id:string
}


export const states = [
  {
    name: "New",
    color: "#8ac926",
    id: 1
  },
  {
    name: "Confirmé",
    color: "#277DA1",
    id: 2
  },
  {
    name: "Prêt",
    color: "#5a189a",
    id: 3
  },
  {
    name: "En livraison",
    color: "#a44a3f",
    id: 4
  },
  {
    name: "Livré",
    color: "#488157",
    id: 5
  },
  {
    name: "Injoignable",
    color: "#bb4d00",
    id: 6
  },
  {
    name: "Reporté",
    color: "#D69E2E",
    id: 7
  },
  {
    name: "Annulé",
    color: "#c32f27",
    id: 8
  },
  {
    name: "Fake",
    color: "#333333",
    id: 9
  }
];

function StateChanger({state,id}: Props) {
  const [selectedState, setSelectedState] = useState(states[1]); // Default state



  useEffect(() => {
    setSelectedState(states.find((s) => (s.name as string ).toLowerCase() === state.toLocaleLowerCase()) || states[2]);
  }, [state])


  

  const handleStateChange = (state: typeof states[number]) => {
    setSelectedState(state);
    // Here you can perform any additional logic, such as updating the backend
    // or triggering other actions based on the selected state
    updateDoc(doc(db,"orders",id),{status:state.name})
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger  style={{ backgroundColor: selectedState.color+"aa",color:"white" }} className="px-4 w-[140px] py-1 border rounded-full">{selectedState.name}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {states.map((state) => (
          <DropdownMenuItem className="mt-1" style={{ backgroundColor: state.color+"aa",color:"white"  }} key={state.id} onClick={() => handleStateChange(state)}>
            {state.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default StateChanger
