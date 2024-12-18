import Image from "next/image"

export const StoreBanner = () => {

    return (
        <Image
                src={'/banner_escuro.jpg'}
                width={1500}
                height={1500}
                alt="Banner Eri Suplementos"
                className="w-full md:w-5/6"
            />
    )
}