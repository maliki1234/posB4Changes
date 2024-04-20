import SaleesTable from '@/components/sales/SaleesTable'
import SalesFooter from '@/components/sales/SalesFooter'
import SearchInput from '@/components/sales/SearchInput'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
// import { redirect } from 'next/dist/server/api-utils'
// import { Role } from '@prisma/client'
import React from 'react'

export default async function page() {

  // const session = await getServerSession(authOptions)

  return (
    <div className="">
      <SearchInput />
      <SaleesTable />
      <SalesFooter />
    </div>
  )
}

