"use client"

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { set } from 'date-fns'
import HashLoader from 'react-spinners/HashLoader'
import { useGlobalProducContext } from '@/app/context/store'



export default function SearchStockB({prod}) {
    const [table, settable] = useState()
    const [selections, setselections] = useState(false)
    const [first, setfirst] = useState("")
    const [filtered, setfiltered] = useState([])
    const [pro, setpro] = useState([])
  const {product, setProduct} = useGlobalProducContext()
    
    // console.log(filtered)



    const getproducts = async()=>{
        try {
            const product = await fetch( process.env.NEXT_PUBLIC_URL + "/api/product",
            { cache: "no-store", method: "GET" })
            if (product.ok) {
                const data = await product.json()
                settable(data.message)
    settable(data.message)
            }
        } catch (error) {
            return null
        }
    }
    
  
useEffect(() => {
  getproducts()
  
}, [])



  

useEffect(() => {
  if (first) {
    setselections(true)
  }else{
    setselections(false)
  }
    
  }, [first])
  

const Search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfirst(e.target.value)

    if (table) {
      // console.log(table)
      const find = table.filter((item: { name: { toLowerCase: () => { (): any; new(): any; includes: { (arg0: string): any; new(): any } } } }) => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
      // console.log(find)
      setfiltered(find)
    }
 
    setselections(true)
    if (first === "") {
        setselections(false)
    }
}

const Selected =(e: any)=>{
setfirst("")
 setselections(false)
 prod(e)
 
}

  return (
    <div className='relative'>
        {
          table? <Input type='text' value={first} onChange={(e)=> Search(e) }  placeholder='search here...'/>: <div className="flex w-full justify-between"><HashLoader color="#36d7b7" size={20} /></div>
        }
    {/* --gradient: #65bd60; */}
        <div className="absolute  z-10 mt-2 min-h-12 w-full bg-primary"> 
{
    selections? <ol className=" list-number ">
   {
    filtered.length > 0 && filtered.map(el => (<li key={el.id} className='px-3 list-style-number py-2 cursor-pointer' onClick={()=> Selected(el)} >
    <h3 className="text-xl uppercase">{el.name}</h3>
    <p className="text-base ml-2 text-gray-300 lowercase"> {el.description}</p>
</li>) ) 
}
   
</ol>: ""
}

        </div>
    </div>
  )
}
