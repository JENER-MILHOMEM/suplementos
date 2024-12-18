"use client"

import { auth } from '@/firebase/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { House, LogIn, Scroll, Search, ShoppingCart } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { DialogLogout } from './dialog-logout'
import { Input } from './ui/input'
import { useMediaQuery } from 'react-responsive';

type NavbarPages = {
    name: string,
    icon: ReactNode,
    href: string
}

const pages: NavbarPages[] = [
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

export const Navbar = () => {

    const isMobile = useMediaQuery({ maxWidth: 767 });

    return isMobile ? <TabBar /> : <NavbarDesktop />

}

export const NavbarDesktop = () => {

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
                {
                    isAdmin && <li>admin</li>
                }
            </ul>
        </header>
    )
}

const TabBar = () => {

    const route = useRouter()
    const path = usePathname()

    return (
        <ul className='flex h-[90px] w-full fixed bottom-0 bg-white gap-7 justify-center items-center'>
                {
                    pages.map((item) => (
                        <li key={item.href}
                            className={`flex gap-2 size-[70px] bg-gray-100 rounded-xl items-center justify-center cursor-pointer ${path === item.href ? 'text-white bg-primary' : 'text-neutral-500'}`}
                            onClick={() => route.push(item.href)}>
                            {item.icon}
                        </li>
                    ))
                }
            </ul>
    );
};

export default TabBar;