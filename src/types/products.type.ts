export type Product = {
    id?: string
    name: string
    category: Category
    shortDescription: string
    description: string
    price: number
    imgUrl: string
    discountPrice?: number
}

export type Category = {
    id?: string
    name: string
}