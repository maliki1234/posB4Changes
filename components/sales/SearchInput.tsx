"use client"
import React, { useEffect, useState } from 'react'
import { toast, useToast } from '../ui/use-toast'
import {useGlobalProducContext} from '@/app/context/store'
import SearchStock from './searchstock'
import SearchStockB from './SearchStockB'
import Barcode from './Barcode'
// import SearchStock from '../stock/addstock/searchstock'


type Foo = {
  id: number,
  name: string,
  price: number,
  quantity: number,
  description: string,
  createdAt?: Date,
  updatedAt?: Date,
  total?: number,
}




export default function SearchInput() {
  const [tableData, settableData] = useState<Foo[]>()
  const [allProduct, setallProduct] = useState()
  const [cart, setcart] = useState([])
  const {product, setProduct} = useGlobalProducContext()
  const {toast} = useToast()

  // console.log(product)



  const getProduct = async () => {
    const respond = await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/product",
      { cache: "no-store", method: "GET" }
    );

    if (!respond.ok) {
      throw new Error("failed to fetch error");
    }

    const data = await respond.json();
    // console.log(data.message)
    setallProduct(data.message)
  };



  useEffect(() => {

    getProduct()
   
  }, [])
  


const productId = (e)=>{
  // console.log(e)
if (e.quantity <= 0) {
  toast({
    variant:"destructive",
    title: "Error",
    description:" please make sure this product stock quantity should not be 0 "
  })
  return
}


  const exist = product.find(p => p.id === e.id )
  // console.log(exist)

  if (exist) {

    let cartArray= []
  let newItem = {}
  product.forEach(p => {
    if (p.id === e.id ) {


      if (p.quantity >= e.quantity) {
       toast({
          title: "Error",
          variant: "destructive",
          description:`this product stock quantity is ${e.quantity}`
        })
        // cartArray.push(newItem)
        // return setProduct(cartArray)
        
        newItem = {
          ...e,
          maximumQuantity: e.quantity,
          quantity: p.quantity ,
          Total: e.price * (p.quantity),
        }
       return cartArray.push(newItem)

      }

      newItem = {
        ...e,
        maximumQuantity: e.quantity,
        quantity: p.quantity + 1,
        Total: e.price * (p.quantity + 1),
      }
      cartArray.push(newItem)
    }else{
    cartArray.push(p)

    }
    setProduct(cartArray)
  })
  }else{

    


    let newItem =  {
      ...e,
      Total: e.price * 1,
      maximumQuantity: e.quantity,
      quantity: 1
    }
    setProduct([...product , newItem])
  }
 

}

  return (
    <div>
    <div className="w-full py-2  ">
    <div className="py-6 flex flex-col gap-4 px-12 relative">
          {/* <SearchStock prod={productId} /> */}
          <Barcode prod={productId} />
          <SearchStockB prod={productId}/>
        </div>
    </div>
</div>
  )
  }
