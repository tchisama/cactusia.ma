"use client"
import { db } from "@/firebase";
import { Order } from "@/store/backend";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { Timestamp } from "firebase/firestore/lite";
import { color } from "framer-motion";
// import ResizableBox from "../ResizableBox";
import React, { useEffect, useState } from "react";
import { AxisOptions, Chart } from "react-charts";


 type MyDatum = { date: Date, docs: number }
 
export default function Bar() {







  const [data,setData] = useState<{label:string,data:MyDatum[]}[]>([
    {
     label: 'products',
     
     data : [{
       date: new Date(),
       docs: 0,
     }],
    }
  ])

  useEffect(()=>{
      getDocs(query(collection(db, "orders"),orderBy("createdAt","desc"))).then( (doc) => {
          return (
            doc.docs.map(d=>({...d.data() as Order ,id : d.id }))
          )
      }).then(docs=>{
    const dailyCounts: { [key: string]: number }= {};
    console.log(docs)
    // Assuming 'docs' is an array of documents with '_30mw_createdAt' as a Firebase Timestamp field
    docs.sort( (a:any,b:any) => (a.createdAt?.seconds ?? 0) - (b.createdAt?.seconds ?? 0)).forEach((doc:any) => {
      const dateKey = new Date((doc.createdAt?.seconds ?? 0) * 1000).toISOString().split('T')[0];
      dailyCounts[dateKey] = (dailyCounts[dateKey ]  || 0) + 1 ;
    });

    const newData:any[] = []
    Object.keys(dailyCounts).forEach((dateKey) => {
      newData.push({
        date: new Date(dateKey),
        docs: dailyCounts[dateKey],
      });
    });




    console.log(newData)
    setData([
      {
       label: 'orders',
       data: newData,
     },
   ] as any)
      });



  //   console.log([
  //     {
  //      label: 'products',
  //      data: newData,
  //    },
  //  ])
  },[])

 
   const primaryAxis = React.useMemo(
     (): AxisOptions<MyDatum> => ({
       getValue: datum => datum.date,
       
     }),
     []
   )
 
   const secondaryAxes = React.useMemo(
     (): AxisOptions<MyDatum>[] => [
       {
         getValue: datum => datum.docs,
        //  stacked:true,
         elementType:"area",
       },
     ],
     []
   )

  return (
    data &&
    <>
      {/* <ResizableBox> */}
        <Chart
           className="flex-1"
           options={{
              data,
              primaryAxis,
              secondaryAxes,
            }}
        />
      {/* </ResizableBox> */}
    </>
  );
}