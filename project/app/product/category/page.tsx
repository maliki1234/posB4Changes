
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import { Payment, columns , Product} from './columns'
import { DataTable } from './data-table'
// import { redirect } from 'next/navigation'


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
async function getUsers() {
  try {
    const respond = await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/category",
      { cache: "no-store", method: "GET" }
    );

    if (!respond.ok) {
      throw new Error("failed to fetch error");
    }

    const data: Product = await respond.json();
    return data.message
    
  
  } catch (error) {
    return error
  }

}


export default async function page() {
  const data = await getData()
  const productData = await getUsers()
  const session = await getServerSession(authOptions)
  if(session === null){
    // redirect('/auth/login')
  }

  if (session ) {
    const { role } = session
    if (role != "ADMIN") {
      // redirect('/')
    }
  }
  
 
  return (
    <div className="">
      <div className="w-full py-2 px-6  flex justify-center">
      </div>
      <DataTable  columns={columns} data={productData} />

    </div>
  )
}


