// import MainPage from '@/components/chart/MainPage'
import Header from '@/components/header/Header'
import Info from '@/components/info/Info'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import React from 'react'
import PageMain from '../components/chart/PageMain'
import Information from '@/components/information/Information'

export default async function page() {
  const session: any = await getServerSession(authOptions)
 if (session === null) {

redirect("/auth/login")
 }

// console.log(session)
if (session?.role != "ADMIN") {
return(
  <div className="w-ful h-screen grid items-center justify-center">
    <div className="p-4">
      <h3 className="text-center">your not authorised to open this page </h3>
      <Link className='text-center w-full text-blue-500' href="/sales">go to sales</Link>
    </div>
  </div>
)
}

  return (
  <div >
     <Header />
   <Info/>
   <div className="grid grid-cols-6 px-12">
    <div className="col-span-4 h-96 ">
     <PageMain/>
     
    </div>
    <div className=" col-span-2">
    <Information/>
    </div>
   </div>
  </div>
   
  )
}
