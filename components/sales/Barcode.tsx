"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'

export default function Barcode({prod}) {
  const [barcode, setbarcode] = useState("")
  let barcodescanner = ''
  const KeyDown =(e)=>{
   
    // console.log(e.keyCode)
   
    // console.log(e.key)
    if (e.keyCode === 13 && barcodescanner.length > 3) {
      // console.log(barcodescanner)
      searchByBarcode(barcodescanner)
      setbarcode(barcodescanner)
    }

   
    e.preventDefault()
    barcodescanner += e.key;
    // console.log(barcodescanner)
  }


  const searchByBarcode = async(e: string)=>{
    console.log(e)
    try {
      const product = await fetch( process.env.NEXT_PUBLIC_URL + `/api/product/barcode/${e}`,
      { cache: "no-store", method: "GET" })
      if (product.ok) {
          const data = await product.json()
          // console.log(data.message)
          prod(data.message)
          setbarcode("")
          
      }
  } catch (error) {
      return null
  }
  }
  return (
    <div>
      <Input type="text" autoFocus value={barcode} onChange={()=> console.log("e")} onKeyDown={(e)=>KeyDown(e)} />
    </div>
  )
}
