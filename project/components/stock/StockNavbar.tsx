"use client"
import React from 'react'
import { Card } from '../ui/card'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu'
import Link from 'next/link'
import ModeToggle from '../ModeToggle'
import UserNav from '../user-nav'



export default function StockNavbar() {
    return (
        <Card className='py-2 flex justify-end px-3'>
            <div className="flex gap-6">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/stock/addproduct" legacyBehavior passHref>
                                <NavigationMenuLink className='capitalize text-sm px-2 ' >
                                    add product
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/stock/viewproduct" legacyBehavior passHref>
                                <NavigationMenuLink className='capitalize text-sm px-2 ' >
                                    view product
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/stock/addStock" legacyBehavior passHref>
                                <NavigationMenuLink className='capitalize text-sm px-2 ' >
                                    add stock
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/docs" legacyBehavior passHref>
                                <NavigationMenuLink className='capitalize text-sm px-2 '>
                                    view stock
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <ModeToggle />
                <UserNav />
            </div>
        </Card>
    )
}
