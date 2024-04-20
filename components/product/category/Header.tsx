"use client"
import React from 'react'
// import { Card } from '../ui/card'
// import { MainNav } from './main-nav'
// import { UserNav } from './user-nav'
// import ModeToggle from '../theme/ModeToggle'
import Link from 'next/link'
// import { UserNav } from '../header/user-nav'
import { MainNav } from './main-nav'
// import { Card } from '@/components/ui/card'
import { UserNav } from '@/components/header/user-nav'
import ModeToggle from '@/components/theme/ModeToggle'
import { Card } from '@/components/ui/card'
import Logo from '@/components/logo/Logo'

export default function Header() {
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
    </Card></>
  )
}