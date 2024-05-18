"use client"
import { db } from "@/firebase";
import { Order } from "@/store/backend";
import { Timestamp, collection, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { Timestamp as TS } from "firebase/firestore/lite";
import { color } from "framer-motion";
// import ResizableBox from "../ResizableBox";
import React, { useEffect, useState } from "react";
import { AxisOptions, Chart } from "react-charts";


 type MyDatum = { date: Date, docs: number }
 
export default function UsersBar() {







  const [data,setData] = useState<{label:string,data:MyDatum[]}[]>([
    {
     label: 'users',
     
     data : [{
       date: new Date(),
       docs: 0,
     }],
    }
  ])

  useEffect(()=>{
    // i want just the orders of the last 30 days
      getDocs(query(collection(db, "visit"),orderBy("date","desc")
    ,where("date",">",Timestamp.fromDate(new Date(new Date().setDate(new Date().getDate() - 30))))
    )).then( (doc) => {
          return (
            doc.docs.map(d=>({...d.data() as Order ,id : d.id }))
          )
      }).then(docs=>{
    const dailyCounts: { [key: string]: number }= {};
    console.log(docs)
    // Assuming 'docs' is an array of documents with '_30mw_createdAt' as a Firebase Timestamp field
    docs.sort( (a:any,b:any) => (a.date?.seconds ?? 0) - (b.date?.seconds ?? 0)).forEach((doc:any) => {
      const dateKey = new Date((doc.date?.seconds ?? 0) * 1000).toISOString().split('T')[0];
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
       label: 'visiters',
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
         elementType:"line",
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
