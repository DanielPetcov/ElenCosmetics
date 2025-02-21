const ProductPage = async ({params} : {params: {id: string}}) => {
    const {id} = params;
    
    return (
        <div className="text-gray-500">
            product page of the product {id}
        </div>
    )
}
export default ProductPage;