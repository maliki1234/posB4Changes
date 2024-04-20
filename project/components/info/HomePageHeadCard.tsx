import React from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
// import { Icon } from '@radix-ui/react-select'
import { icons } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

type model = {
    title: string,
    icons: JSX.Element,
    desriptions: String,
    amount: String
}

export default function HomePageHeadCard(props: model) {
    return (
        <>
       <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {props.title}
                </CardTitle>
                {props.icons}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{props.amount}</div>
                <p className="text-xs text-muted-foreground">
                    {props.desriptions}
                </p>
            </CardContent>
        </Card> 
        </>

    )
}
