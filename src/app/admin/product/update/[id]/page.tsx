import { ProductForm } from "@/components/product-form";
import { getAllDocs } from "@/firebase/queries/get-all-docs";
import { Category, Product } from "@/types/products.type";
import { getProductById } from "@/firebase/queries/get-product-by-id";

type ProductUpdateProps = {
    params: {
        id: string
    }
}
export default async function ProductUpdate({ params }: ProductUpdateProps) {
    
    const categories = await getAllDocs('productCategories')
    const product = await getProductById(params.id);

    if (product) {
        return (
            <ProductForm categories={categories as Category[]} product={product as Product} />
        )
    }

}