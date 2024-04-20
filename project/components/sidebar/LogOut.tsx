"use client"

import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
import { AiOutlineLogout } from 'react-icons/ai'

export default function LogOut() {
  return (
    <Button className='w-full' onClick={()=> signOut()}>
    <div className='grid w-full grid-cols-4'>
        <div className="col-span-1 grid items-center justify-center"><AiOutlineLogout /></div>
        <span className='col-span-3'> log Out  </span>
    </div>
    </Button>
  )
}
