
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import { Payment, columns , Product , Stock} from './columns'
import { DataTable } from './data-table'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import StockFooter from '@/components/stock/StockFooter'


async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    
  ]
}
async function getUsers(): Promise<Product[]> {
  try {
    const respond = await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/stock",
      { cache: "no-store", method: "GET" }
    );

    if (!respond.ok) {
      throw new Error("failed to fetch error");
    }

    const data= await respond.json();
    const product : Product  = await data.message
    // console.log(product)
    return product
    
  
  } catch (error) {
    return error
  }

}


export default async function page() {
  const data = await getData()
  const productData = await getUsers()
  
  // const session = await getServerSession(authOptions)

  
 
  return (
    <div className="">
      <div className="w-full py-2 uppercase text-green-500 flex justify-center">
        stock helthy
      </div>
      <DataTable columns={columns} data={productData} />
      <StockFooter stk={productData}/>
    </div>
  )
}


