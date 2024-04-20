"use client"
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Link from 'next/link'

export default function InfoCard(props: {heading: string, content: number , link: string}) {

  // console.log(heading
  // console.log(props.content)
  return (
    <>
    <Card>
        <CardHeader>
            <h2 className='text-xl font-black uppercase text-center'> {props.heading} </h2>
        </CardHeader>
        <CardContent className='text-destructive px-6 uppercase font-bold '>
            {/* {props.content && props.content > 1? `they are ${props.content}`: `it is  ${props.content}`}
             */}
             <span className=' capitalize pr-6'>item(s)</span> : {props.content}
        </CardContent>
        <CardFooter className='flex  capitalize justify-end'>
            <Link href={props.link}>read more</Link>
        </CardFooter>
    </Card>
    </>
  )
}
