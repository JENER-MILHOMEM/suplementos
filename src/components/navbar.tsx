"use client"

import { House, Scroll, ShoppingCart } from 'lucide-react'
import { ReactNode } from 'react'
import { Input } from './input'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

type NavbarPages = {
    name: string,
    icon: ReactNode,
    href: string
}

const navbarPages: NavbarPages[] = [
    {
        name: "Inicio",
        icon: <House className='w-5' />,
        href: '/'
    },
    {
        name: "Pedidos",
        icon: <Scroll className='w-5' />,
        href: '/requests'
    },
    {
        name: "Carrinho",
        icon: <ShoppingCart className='w-5' />,
        href: '/cart'
    },
]

export const Navbar = () => {

    const route = useRouter()
    const path = usePathname()

    return (
        <header className='bg-white flex px-32 py-2 items-center justify-between'>

            <div className='flex space-x-5 items-center'>
                <img onClick={()=> route.push('/')} src="/logo_square.png" alt="logo eri suplementos" className='size-[70px] cursor-pointer' />

                <div className='w-[400px]'>
                    <Input type={'text'} placeholder='Buscar no catálogo' />
                </div>
            </div>

            <ul className='flex gap-5'>
                {
                    navbarPages.map((item) => (
                        <li key={item.href}
                            className={`flex gap-2 cursor-pointer ${path === item.href ? 'text-black' : 'text-neutral-500'}`}
                            onClick={() => route.push(item.href)}>
                            <span>{item.icon}</span>{item.name}
                        </li>
                    ))
                }
            </ul>

        </header>
    )
}