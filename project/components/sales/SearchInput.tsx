"use client"
import React, { useEffect, useState } from 'react'
import { toast, useToast } from '../ui/use-toast'
import {useGlobalProducContext} from '@/app/context/store'
import SearchStock from './searchstock'
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
  // console.log(e.product)
  if (allProduct) {
    const pro = allProduct.find(product => product.id === e.product && product.quantity > 0 )

    // console.log(pro)
    if (!pro){
      toast({
        title: "error ...!",
        description: "make sure the product is avilable or contact your supervisor",
        variant:"destructive"
      })
    }

    addToCart(pro)
  }

  

}


const addToCart = (pro) =>{
// check if it constiined in the cart
// console.log(pro)

const existing = product.find(p => p.id === pro.id)
// console.log(existing)
if(existing){
  let cartArray= []
  let newItem = {}
  product.forEach(item => {
  if (item.id == pro?.id   && item.quantity >=0 && item.quantity >= pro.quantity) {
    // console.log("imejirudi")
    newItem = {
      ...item,
      maximumQuantity: item.quantity,
      quantity: item.quantity + 1,
      Total: item.price * (item.quantity + 1),
    }
    cartArray.push(newItem)
  }else{
    cartArray.push(item)
  }
  })

  setProduct(cartArray)
}else{
  // console.log('this should work')
  // console.log(product)
  let newIte = {
    ...pro,
    maximumQuantity: pro.quantity,
    quantity: 1,
    Total: pro?.price 
  }
  setProduct([...product, newIte])
}


}


  return (
    <div>
    <div className="w-full py-2  ">
    <div className="py-6">
          <SearchStock prod={productId} />
        </div>
    </div>
</div>
  )
  }
