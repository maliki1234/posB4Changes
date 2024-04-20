"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import moment from "moment"
import { date } from 'zod'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'


export type pro = {
  id: number, name: {Product: String} 
}


export default function Information() {

  const [product, setproduct] = useState([])

  const getExpireDate = async()=>{
    try {
      const respond = await fetch(
        process.env.NEXT_PUBLIC_URL + "/api/expire",
        { cache: "no-store", method: "GET" }
      );
  
      if (!respond.ok) {
        throw new Error("failed to fetch error");
      }
  
      const data = await respond.json();
      console.log(data.message)
      setproduct(data.message)
      return data.message
      
    
    } catch (error) {
      console.log(error)
      return error
    }
  }


useEffect(() => {
  getExpireDate()

}, [])


  return (
    <>
    <Card>
        <CardHeader className='text-center uppercase '>
            product expire  date
        </CardHeader>
        <CardContent>
        <Table>
  <TableHeader>
    <TableRow>
      <TableHead >stock Id</TableHead>
      <TableHead>product</TableHead>
      <TableHead>quantity</TableHead>
      <TableHead >expire</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
   {
    product && product.map(products =>  <TableRow key={products.id} className='text-red-300'>
        <TableCell> {products.id} </TableCell>
        <TableCell> {products.Product.name} </TableCell>
        <TableCell> {products.quantity} </TableCell>
        <TableCell> {`${products.expire.split('T')[0]}`} </TableCell>
      </TableRow>)
   }
  </TableBody>
</Table>

        </CardContent>
    </Card>
    </>
  )
}
