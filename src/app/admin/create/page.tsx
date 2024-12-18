import { FormSlider } from "@/components/form-slider"
import { getAllDocs } from "@/firebase/queries/get-all-docs"
import { Category } from "@/types/products.type"

const CreateProduct = async () => {

    const categories = await getAllDocs('productCategories')

    return (
        <FormSlider categories={categories as Category[]}/>
    )
}

export default CreateProduct