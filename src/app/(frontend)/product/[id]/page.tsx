type Params = Promise<{ id: string[] }>

const ProductPage = async ({params} : {params: Params}) => {
    const {id} = await params;
    
    return (
        <div className="text-gray-500">
            product page of the product {id}
        </div>
    )
}
export default ProductPage;