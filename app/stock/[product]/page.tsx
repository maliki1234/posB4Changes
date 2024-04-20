
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import { Payment, columns , Product , Stock} from './columns'
import { DataTable } from './data-table'
import { redirect } from 'next/navigation'
import Link from 'next/link'


async function getUsers(id: any): Promise<Product[]> {
  try {
    const respond = await fetch(
      process.env.NEXT_PUBLIC_URL + `/api/stock/${id}`,
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


export default async function page(props) {
  const prodId = props.params.product
  // const data = await getData(prodId)
  const productData = await getUsers(parseInt(prodId))
  // console.log(productData)
  // const session = await getServerSession(authOptions)

  
 
  return (
    <div className="">
      <div className="w-full py-2 uppercase text-green-500 flex justify-center">
        {/* stock for {productData[0].Product.name} */}
      </div>
      <DataTable columns={columns} data={productData} />

    </div>
  )
}


