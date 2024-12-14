'use client'
import Image from 'next/image'

import PlaceHolder from '@/app/imgs/LogoEscura.jpg'
import Header from "@/app/components/header";
import StoreInfo from "@/app/components/storeInfo";
import Categories from "@/app/components/categories/index"
import Products from "@/app/components/Products/index"
import FooterBar from "@/app/components/footer/index";

export default function Home() {
    return (
        <div className="min-h-screen bg-white">

            <div className="">
                <div>
                    <Header/>
                </div>

                <div className="relative h-[550px] ">
                    <Image
                        src={PlaceHolder}
                        alt="Banner"
                        fill
                        className="object-cover"
                    />
                </div>

                <div>
                    <StoreInfo/>
                </div>

                <div>
                    <Categories/>
                </div>
            </div>

            <div>
                <Products/>
            </div>
            <div>
                <Products/>
            </div>
            <div>
                <Products/>
            </div>
            <div>
                <Products/>
            </div>
            <div>
                <Products/>
            </div>
            <div>
                <Products/>
            </div>
            <div>
                <Products/>
            </div>
            <div>
                <Products/>
            </div>
            <div>
                <Products/>
            </div>
            <div>
                <FooterBar/>
            </div>
        </div>
    )
}
