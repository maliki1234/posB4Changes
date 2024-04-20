

import RegisterForm from '@/components/auth/RegisterForm'
import { redirect } from 'next/navigation'
import React from 'react'
 const data = async () => {
  const response  = await fetch(process.env.NEXT_PUBLIC_URL + '/api/business', {
    method: 'GET',
    cache:"no-store"
  })
  if (response.ok) {
    const dt =  await response.json()
    // console.log(dt)
    return dt.message
  }
}
export default async function page() {
  // const db = await data()
  // // console.log(db)

  // if (!db) {
  //   // console.log('no db')
  //   redirect('/auth/company/register')
  // }
  return (
    <>
    <RegisterForm />
    </>
    // <>
    
    // login
    // </>
  )
}
