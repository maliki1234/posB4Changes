import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import SideBarNav from './SideBarNav'

export default async function SideBar() {
    const session = await getServerSession(authOptions)
    // console.log(session)
  return (
   <div className="min-h-screen border rounded-md flex flex-col px-1 md:px-2">
        <h1 className="text-center text-[#075985] font-bold mt-16 uppercase">{ session?.user?.name}</h1>
        <span className='text-xs lowercase my-6 text-center'> { session?.role } </span>
        <SideBarNav />
   </div>
  )
}
