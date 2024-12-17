"use client"

import { auth } from '@/firebase/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { House, LogIn, Scroll, ShoppingCart } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { DialogLogout } from './dialog-logout'
import { Input } from './ui/input'
import Logo from '/logo_vector.svg'

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
    {
        name: "Entrar",
        icon: <LogIn className='w-5' />,
        href: '/auth'
    },
]

export const Navbar = () => {

    const route = useRouter()
    const path = usePathname()

    const [user, setUser] = useState<User>()
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            setUser(user)
            const idTokenResult = await user.getIdTokenResult()
            const userRole = idTokenResult.claims.role === "admin"
            setIsAdmin(userRole)
        }
    })

    return (
        <header className='bg-white flex px-32 py-2 items-center justify-between border-b'>

            <div className='flex space-x-5 items-center'>
                <img
                    onClick={() => route.push('/')}
                    src="/logo_vetor.svg"
                    alt="logo eri suplementos"
                    className='size-[50px] cursor-pointer'
                />

                <div className='w-[400px]'>
                    <Input placeholder='Procure um produto' />
                </div>
            </div>

            <ul className='flex gap-5'>
                {
                    navbarPages.map((item) => {
                        if (user && item.href !== "/auth") {
                            return (
                                (
                                    <li key={item.href}
                                        className={`flex gap-2 cursor-pointer ${path === item.href ? 'text-black' : 'text-neutral-500'}`}
                                        onClick={() => route.push(item.href)}>
                                        <span>{item.icon}</span>{item.name}
                                    </li>
                                )
                            )
                        }

                        if (!user) {
                            return (
                                (
                                    <li key={item.href}
                                        className={`flex gap-2 cursor-pointer ${path === item.href ? 'text-black' : 'text-neutral-500'}`}
                                        onClick={() => route.push(item.href)}>
                                        <span>{item.icon}</span>{item.name}
                                    </li>
                                )
                            )
                        }
                    })
                }
                <li>
                    {
                        user && <DialogLogout />
                    }
                </li>
                <li>
                    {
                        isAdmin && "admin"
                    }
                </li>
            </ul>
        </header>
    )
}