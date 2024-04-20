// import MainPage from '@/components/chart/MainPage'
import Header from '@/components/header/Header'
import Info from '@/components/info/Info'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'

import React from 'react'
import PageMain from '../components/chart/PageMain'
import Information from '@/components/information/Information'
import InfoCard from '@/components/information/InfoCard'


async function productQantityInfo() {
  try {
    const respond = await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/product/alert",
      { cache: "no-store", method: "GET" }
    );

    if (!respond.ok) {
      throw new Error("failed to fetch error");
    }

    const data =  await respond.json();
    return data.message
    
  
  } catch (error) {
    return error
  }

}



async function productExpireInfo() {
  try {
    const respond = await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/expire",
      { cache: "no-store", method: "GET" }
    );

    if (!respond.ok) {
      throw new Error("failed to fetch error");
    }

    const data =  await respond.json();
    return data.message
    
  
  } catch (error) {
    return error
  }

}


export default async function page() {
  const session: any = await getServerSession(authOptions)

// console.log(session)
// const router = useRouter()

 if (session === null) {

redirect("/auth/login")
 }






 const productQuantityAlert = await productQantityInfo()
 const productExpireInfomation = await productExpireInfo() 
//  console.log(productQuantityAlert)

if (session?.role === "EMPLOYEE" ) {
// return(
//   <div className="w-ful h-screen grid items-center justify-center">
//     <div className="p-4">
//       <h3 className="text-center">your not authorised to open this page </h3>
//       <Link className='text-center w-full text-blue-500' href="/sales">go to sales</Link>
//     </div>
//   </div>
// )
// return router.push('/sales')
redirect("/sales")


}

const expire  = ()=>{

}
  return (
  <div >
     <Header />
   <Info/>
   <div className="grid grid-cols-6 px-4">
    <div className="col-span-4 h-96 ">
     <PageMain/>
     
    </div>
    <div className=" flex flex-col gap-4 col-span-2">
    {/* <Information/> */}
    <InfoCard heading={`product under ${session.BusinessInfo.productRemain} items`} content={productQuantityAlert.length} link={'product/alert/quantity'} />
    <InfoCard heading={`product expire alert before ${session.BusinessInfo.expDateInfo}`} content={productExpireInfomation.length} link={'product/alert/expire'}/>

    </div>
   </div>
  </div>
   
  )
}
