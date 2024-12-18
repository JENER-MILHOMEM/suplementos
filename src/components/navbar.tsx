"use client"

import { auth } from '@/firebase/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { House, LogIn, Scroll, Search, ShoppingCart, SquarePlus } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { DialogLogout } from './dialog-logout'
import { Input } from './ui/input'
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion'

type NavbarPages = {
    name: string,
    icon: ReactNode,
    href: string
}

const normalPages: NavbarPages[] = [
    {
        name: "Inicio",
        icon: <House className='w-full' />,
        href: '/'
    },
    {
        name: "Pedidos",
        icon: <Scroll className='w-full' />,
        href: '/requests'
    },
    {
        name: "Carrinho",
        icon: <ShoppingCart className='w-full' />,
        href: '/cart'
    },
    {
        name: "Entrar",
        icon: <LogIn className='w-full' />,
        href: '/auth'
    },
]

const adminPages: NavbarPages[] = [
    {
        name: "Inicio",
        icon: <House className='w-full' />,
        href: '/'
    },
    {
        name: "Create",
        icon: <SquarePlus className='w-full'/>,
        href: '/admin/create'
    },
]

export type NavBarsProps = {
    pages: NavbarPages[]
    user: User | undefined
}

export const Navbar = () => {

    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [user, setUser] = useState<User>()

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            setUser(user)
            const idTokenResult = await user.getIdTokenResult()
            const userRole = idTokenResult.claims.role === "admin"
            setIsAdmin(userRole)
        }
    })

    const isMobile = useMediaQuery({ maxWidth: 767 });

    const page = isAdmin ? adminPages : normalPages

    return isMobile ? <TabBar pages={page} user={user}/> : <NavbarDesktop pages={page} user={user}/>

}

export const NavbarDesktop = ({pages, user} : NavBarsProps) => {

    const route = useRouter()
    const path = usePathname()

    return (
        <header className='bg-white flex md:px-10 lg:px-20 xl:px-32 items-center justify-between border-b h-[60px] fixed top-0 w-full'>

            <img
                onClick={() => route.push('/')}
                src="/logo_vetor.svg"
                alt="logo eri suplementos"
                className='size-[50px] cursor-pointer'
            />

            <form className='flex items-center justify-center gap-3'>
                <Input className='sm:w-[200px] lg:w-[350px]' placeholder='Procure um produto' />
                <Search className='text-gray-700 hover:scale-110 cursor-pointer' />
            </form>

            <ul className='flex gap-5'>
                {
                    pages.map((item) => {
                        if (user && item.href !== "/auth") {
                            return (
                                (
                                    <li key={item.href}
                                        className={`flex gap-2 cursor-pointer ${path === item.href ? 'text-black' : 'text-neutral-500'}`}
                                        onClick={() => route.push(item.href)}>
                                        <span className='w-5'>{item.icon}</span>{item.name}
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
                {
                    user && <li><DialogLogout /></li>
                }
            </ul>
        </header>
    )
}

export function TabBar({pages, user} : NavBarsProps) {

    const router = useRouter()
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50">
            <ul className="flex h-16 items-center justify-around bg-background/80 backdrop-blur-lg">
                {pages.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <li key={item.href} className="relative">
                            <button
                                onClick={() => router.push(item.href)}
                                className={`flex flex-col items-center justify-center p-2 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                                    }`}
                                aria-label={item.name}
                            >
                                {item.icon}
                                <span className="text-xs mt-1">{item.name}</span>
                            </button>
                            {isActive && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                    layoutId="activeTab"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}