"use client"

import { auth } from '@/firebase/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { motion } from 'framer-motion'
import { House, LogIn, Scroll, Search, ShoppingCart, SquarePlus, User as UserIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { FormEvent, ReactNode, useState } from 'react'
import { Input } from './ui/input'

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

const loggedPages: NavbarPages[] = [
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
]

const adminPages: NavbarPages[] = [
    {
        name: "Inicio",
        icon: <House className='w-full' />,
        href: '/'
    },
    {
        name: "Criar",
        icon: <SquarePlus className='w-full' />,
        href: '/admin/create'
    }
]

export type NavBarsProps = {
    pages: NavbarPages[]
    user: User | undefined
    isAdmin: boolean
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

    const page = isAdmin ? adminPages : user ? loggedPages : normalPages

    return (
        <>
            <TabBar pages={page} user={user} isAdmin={isAdmin} />
            <NavbarDesktop pages={page} user={user} isAdmin={isAdmin} />
        </>
    )

}

export const NavbarDesktop = ({ pages, user }: NavBarsProps) => {

    const route = useRouter()
    const path = usePathname()

    const [search, setSearch] = useState<string>('')

    const redirectToProducts = (event: FormEvent) => {
        event.preventDefault()
        return route.push(`/products?search=${search}`)
    }

    if (user) pages = pages.filter((page) => page.href !== '/auth')
    if (user) pages.push({
        href: '/user',
        icon: <UserIcon />,
        name: "Usuário"
    })

    return (
        <header className='bg-white hidden md:flex md:px-10 lg:px-20 xl:px-32 items-center justify-between border-b h-[60px] fixed top-0 w-full'>

            <img
                onClick={() => route.push('/')}
                src="/logo_vetor.svg"
                alt="logo eri suplementos"
                className='size-[40px] cursor-pointer'
            />

            <form onSubmit={redirectToProducts} className='flex items-center justify-center gap-3'>
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='sm:w-[200px] lg:w-[350px]'
                    placeholder='Procure um produto' />
                <Search
                    onClick={redirectToProducts}
                    className='text-gray-700 hover:scale-110 cursor-pointer' />
            </form>

            <ul className='flex gap-5'>
                {
                    pages.map((item) => (
                        <li key={item.href}
                            className={`flex gap-2 cursor-pointer ${path === item.href ? 'text-black' : 'text-neutral-500'}`}
                            onClick={() => route.push(item.href)}>
                            <span className='w-5'>{item.icon}</span>{item.name}
                        </li>
                    ))
                }
            </ul>
        </header>
    )
}

export function TabBar({ pages, user }: NavBarsProps) {

    const route = useRouter()
    const pathname = usePathname()
    const [search, setSearch] = useState<string>('')

    const redirectToProducts = (event: FormEvent) => {
        event.preventDefault()
        return route.push(`/products?search=${search}`)
    }

    if (user) pages = pages.filter((page) => page.href !== '/auth')
    if (user) pages.push({
        href: '/user',
        icon: <UserIcon />,
        name: "Usuário"
    })

    return (
        <>
            <form onSubmit={redirectToProducts} className='flex items-center justify-center gap-3 px-5 py-3 fixed top-0 w-full bg-background/80 backdrop-blur-lg z-50 md:hidden'>
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='sm:w-[200px] lg:w-[350px] bg-white'
                    placeholder='Procure um produto' />
                <Search
                    onClick={redirectToProducts}
                    className='text-gray-700 hover:scale-110 cursor-pointer' />
            </form>
            <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
                <ul className="flex h-16 items-center justify-around bg-background/80 backdrop-blur-lg">
                    {pages.map((item) => {

                        const isActive = pathname === item.href

                        return (
                            <li key={item.href} className="relative">
                                <button
                                    onClick={() => route.push(item.href)}
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
        </>
    )
}