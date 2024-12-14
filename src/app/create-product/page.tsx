import { FormSlider } from "@/components/products-form-slider"
import { getAllDocs } from "@/firebase/queries/getAllDocs"
import { Category } from "@/types/products.type"

const CreateProduct = async () => {

    const categories = await getAllDocs('productCategories')

    console.log(categories);
    

    return (
        <div className="mt-10">
            <FormSlider categories={categories as Category[]}/>
        </div>
    )
}

export default CreateProduct