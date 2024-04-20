"use client"
import React from 'react'
import { Card } from '../ui/card'
import { MainNav } from './main-nav'
import { UserNav } from './user-nav'
import ModeToggle from '../theme/ModeToggle'
import Link from 'next/link'
import Logo from '../logo/Logo'
import { useSession } from 'next-auth/react'

export default function Header() {
  // const {data: session} = useSession()
  // const { data: session , status } = useSession(

    // )
  
  // console.log(session)
  return (
   <>
    <Card  className='w-full flex items-center justify-between py-4'>
        <Logo/>
        <nav className='flex px-2'> <MainNav/>
        <div className="px-2"></div>
        <UserNav/>
        <div className="px-2"></div>
        <ModeToggle/>
        </nav>
    </Card>
   </>
  )
}
