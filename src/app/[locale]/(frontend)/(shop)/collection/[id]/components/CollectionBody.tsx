'use client'
import { useState } from "react";
import CollectionSelector from "./CollectionSelector";
import FilterWindow from "./FilterWindow";
import GridProducts from "./GridProducts";
interface Props {
    locale: string,
    data: {
        id: string
        title: string
    }
    id: number
}
const CollectionBody = ({ locale, data, id }: Props) => {
    const [sortType, setSortType] = useState<'ascending' | 'descending'>('ascending');
    return (
        <>
            <div className="flex justify-between items-baseline text-gray-700">
                <h1 className="font-semibold text-3xl">{data.title}</h1>
                <CollectionSelector sort={sortType} setSortType={setSortType} />
            </div>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-[auto_1fr] 2xl:grid-cols-[300px_1fr]">
                <FilterWindow />
                <GridProducts locale={locale} id={id} sort={sortType} />
            </div>
        </>
    )
}

export default CollectionBody;