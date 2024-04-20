"use client";
import React from "react";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGlobalProducContext } from "@/app/context/store";

import { FaAd, FaMinus, FaPlus } from "react-icons/fa"
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Ghost } from "lucide-react";
// import { Table } from 'lucide-react'

export default function SaleesTable() {
  // const router = useRouter();
  const { product, setProduct } = useGlobalProducContext();
  // console.log(product)
const router = useRouter()

const minusOne = (id)=>{
  const producting = product.map(item =>{
    // console.log(item)
      if (item.id === id && item.quantity >= 1) {
        // console.log( item)

       return {
          ...item,
          quantity: item.quantity - 1,
          Total: item.price * (item.quantity -1)
        }
      }
    return item
  })
setProduct(producting)
console.log(product)
// router.reload()
// router.roload()

}



const remove = (id)=>{
      const filteProduct = product.filter(el => el.id != id)
      // console.log(filteProduct)
      setProduct(filteProduct)
}



const addOne = (id)=>{
  const producting = product.map(item =>{
    console.log(item)
      if (item.id === id && item.quantity <= item.maximumQuantity -1) {
        // console.log( item)

       return {
          ...item,
          quantity: item.quantity + 1,
          Total: item.price * (item.quantity + 1)
        }
      }
    return item
  })

console.log(producting)
setProduct(producting)
console.log(product)
// router.roload()
}


//   console.log(product);
  return (
    
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="">Price</TableHead>
            <TableHead className="">quantity</TableHead>
            <TableHead className="">total</TableHead>
            <TableHead className="">adjust</TableHead>
            <TableHead className="">action</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
        {product &&
            product.map((product , i) => (
              <TableRow>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.Total}</TableCell>
                <TableCell> <div className="flex gap-2">
                  <div className="cursor-pointer" onClick={()=> addOne(product.id)}>
                  <FaPlus/>
                  </div>
                  <div className="cursor-pointer"  onClick={()=> minusOne(product.id)}>
                  <FaMinus/>
                  </div>
                  </div></TableCell>
                <TableCell><Button onClick={()=> remove(product.id)} variant={'ghost'}>remove</Button></TableCell>

                
              </TableRow>
            ))}
        </TableBody>
      </Table>
   
  );
}
