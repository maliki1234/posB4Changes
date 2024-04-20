import React from 'react'
// import { Button } from '../../../lg/src/components/ui/button'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function page() {
  return (
    <div>
      <h2 className="py-10 text-gray-300 uppercase text-center font-bold text-5xl">
        leo mini-market
      </h2>
      <p className="text-3xl py-6 font-bold text-justify mx-40 my-12 text-orange-500">
        Welcome to leo mini market where we do everything with love and passion
      </p>
      <div className="mx-40 my-24">
        <Button size={"lg"} variant={"secondary"} className='w-full py-2 my-4 text-2xl capitalize bg-blue-600'><Link href={"/auth/login"}> log in</Link>  </Button>
        <Link href={"/auth/register"} className='w-full flex justify-center text-gray-200 hover:text-gray-500 text-center capitalize' > or resgister new account </Link>
      </div>
    </div>
  )
}
