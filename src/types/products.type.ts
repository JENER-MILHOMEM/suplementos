export type Product = {
    id?: string
    name: string
    category: Category
    description: string
    price: number
    imgUrl: string
    discountPrice?: number | null
    quantity: number
}

export type ProductSnake = {
    id?: string
    name: string
    category: Category
    description: string
    price: number
    img_url: string
    discountPrice?: number | null
    quantity: number
}

export type Category = {
    id?: string
    name: string
}


