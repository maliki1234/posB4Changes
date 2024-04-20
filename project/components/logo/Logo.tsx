import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <div><Link href={"/"} ><h3 className="text-2xl text-[#075985] uppercase px-12">
      <Image src={'/../../static/image/BRAVO.png'} width={50} height={200} alt='sjddhfkj'/>
      </h3></Link></div>
  )
}
