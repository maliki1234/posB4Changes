
import Link from 'next/link'
import React from 'react'
import {AiFillBook, AiFillCalculator, AiFillDashboard, AiFillPieChart, AiOutlineLogout} from "react-icons/ai"
import { Button } from '../ui/button'
import LogOut from './LogOut'

export default function SideBarNav() {
    
  return (
    <ul className="style-none">
        <li className='w-full py-5'>
            <Button className='w-full'>
            <Link href={"/"} className='grid grid-cols-4'>
                <div className="col-span-1 grid items-center justify-center"><AiFillDashboard/></div>
                <span className='col-span-3'> Darshboard  </span>
            </Link>
            </Button>
        </li>
        <li className='w-full py-5'>
            <Button className='w-full'>
            <Link href={"/sales"} className='grid w-full grid-cols-4'>
                <div className="col-span-1 grid items-center justify-center"><AiFillCalculator/></div>
                <span className='col-span-3'> sales  </span>
            </Link>
            </Button>
        </li>
        <li className='w-full py-5'>
            <Button className='w-full'>
            <Link href={"/report"} className='grid w-full grid-cols-4'>
                <div className="col-span-1 grid items-center justify-center"><AiFillBook/></div>
                <span className='col-span-3'> Report  </span>
            </Link>
            </Button>
        </li>
        <li className='w-full py-5'>
            <Button className='w-full'>
            <Link href={"/product"} className='grid w-full grid-cols-4'>
                <div className="col-span-1 grid items-center justify-center"><AiFillBook/></div>
                <span className='col-span-3'> Product  </span>
            </Link>
            </Button>
        </li>
        <li className='w-full py-5'>
            <Button className='w-full'>
            <Link href={"/stock"} className='grid w-full grid-cols-4'>
                <div className="col-span-1 grid items-center justify-center"><AiFillBook/></div>
                <span className='col-span-3'> Stock  </span>
            </Link>
            </Button>
        </li>
        <li className='w-full py-5'>
            <Button className='w-full'>
            <Link href={"/statistic"} className='grid w-full grid-cols-4'>
                <div className="col-span-1 grid items-center justify-center"><AiFillPieChart/></div>
                <span className='col-span-3'> Statistics  </span>
            </Link>
            </Button>
        </li>
        <li className='w-full py-5'>
           <LogOut/>
        </li>
    </ul>
  )
}
