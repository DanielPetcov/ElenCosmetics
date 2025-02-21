const CategoryPage = async ({params} : {params: {id: string}}) => {
    const {id} = params;
    return (
        <div>
            Category page {id}
        </div>
    )
}

export default CategoryPage