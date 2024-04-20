import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='p-2 flex flex-col gap-4'> 
       <Link href={'profile/personalinfo'}><Card className='rounded-xl cursor-pointer'>
        <CardHeader>
            personal info
        </CardHeader>
        <CardContent className='text-xs text-gray-400'>
            view,delete and update personal info
        </CardContent>
       </Card></Link>


       <Link href={'profile/security'}><Card className='rounded-xl cursor-pointer'>
        <CardHeader>
            security
        </CardHeader>
        <CardContent className='text-xs text-gray-400'>
            view to change password
        </CardContent>
       </Card></Link>

       {/* <Link href={'profile/currency'}><Card className='rounded-xl cursor-pointer'>
        <CardHeader>
            currency
        </CardHeader>
        <CardContent className='text-xs text-gray-400'>
            view to learn and select currency to use
        </CardContent>
       </Card></Link> */}
    </div>
  )
}
