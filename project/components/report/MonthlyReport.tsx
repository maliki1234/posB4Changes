
"use client"

// import { Table } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import Link from 'next/link';

export default function MonthlyReport() {

    const [report, setreport] = useState([])

    async function getReport() {
        try {
          const respond = await fetch(
            process.env.NEXT_PUBLIC_URL + "/api/report/byMonth",
            { cache: "no-store", method: "GET" }
          );
      
          if (!respond.ok) {
            throw new Error("failed to fetch error");
          }
      
          const data = await respond.json();
          setreport(data.message)
          console.log(data.message)
        //   return data.message
          
        
        } catch (error) {
          return error
        }
      
      }

    useEffect(() => {

        getReport()
     
    }, [])
    


  return (
    <Table>
        <TableHeader>
            <TableHead>month</TableHead>
            <TableHead>sales</TableHead>
            
            {/* <TableHead>home</TableHead> */}
        </TableHeader>
       <TableBody>
       {
        report.map(element =>(
            <TableRow>
            <TableCell>
                {element.month}/{element.year}
            </TableCell>
            <TableCell>
                {/* {element.price}   */}
                {/* price */}{
                    element._sum.price
                }
            </TableCell>
            
        </TableRow>
        ))
       }
       </TableBody>
    </Table>
  )
}
