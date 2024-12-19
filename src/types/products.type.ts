export type Product = {
    id?: string
    name: string
    category: Category
    description: string
    price: number
    imgUrl: string
    discountPrice?: number
    quantity: number
}

export type Category = {
    id?: string
    name: string
}
