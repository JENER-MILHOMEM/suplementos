import { FormSlider } from "@/components/products-form-slider"
import { getAllDocs } from "@/firebase/queries/get-all-docs"
import { Category } from "@/types/products.type"

const CreateProduct = async () => {

    const categories = await getAllDocs('productCategories')

    return (
        <div className="mt-10">
            <FormSlider categories={categories as Category[]}/>
        </div>
    )
}

export default CreateProduct