"use client"

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

// import { createContext } from "vm"

interface productProps {
   product: [],
   setProduct: Dispatch<SetStateAction<[]>>

}


const ProductContext = createContext<productProps>({
    product: [],
    setProduct: function (value: SetStateAction<[]>): void {
        throw new Error("Function not implemented.")
    }
})












export const GlobalProducContext = ({
    children,
  }: {
    children: React.ReactNode
  })=> {
   const [product, setProduct] = useState<[]>([])

    return (
       <ProductContext.Provider value={{product , setProduct }}>
        {children}
       </ProductContext.Provider>
    )

}


export const useGlobalProducContext = ()=> useContext(ProductContext)