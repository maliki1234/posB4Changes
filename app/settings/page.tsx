import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='p-2 flex flex-col gap-4'> 
      
       <Link href={'profile/currency'}><Card className='rounded-xl cursor-pointer'>
        <CardHeader>
            currency
        </CardHeader>
        <CardContent className='text-xs text-gray-400'>
            view to learn and select currency to use
        </CardContent>
       </Card></Link>
    </div>
  )
}
