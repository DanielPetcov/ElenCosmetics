'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/app/[locale]/(frontend)/components/productList/ProductCard';
import { Product } from '@/payload-types';
import CollectionPagination from './CollectionPagination';

interface Props {
    locale: string,
    id: number,
    sort: 'ascending' | 'descending'
}

const GridProducts = ({ locale, id, sort }: Props) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);  // Store total pages
    const limit = 20;

    useEffect(() => {
        const fetchProducts = async () => {
            const sortType = sort === 'ascending' ? 'price' : '-price'
            try {
                const query = new URLSearchParams({
                    'joins[relatedCollections][equals]': id.toString(),
                    locale: locale,
                    limit: limit.toString(),
                    page: page.toString(),
                    sort: sortType
                });

                const response = await fetch(`/api/products?${query.toString()}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setProducts(data.docs);
                setTotalPages(data.totalPages); // Extract total pages from API response
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, [page, locale, id, sort]);

    // Function to handle page change
    const goToPage = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className='flex flex-col items-center gap-5'>
            {/* Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        featuredImg={product.featuredImg}
                        comparePrice={product.compare_price}
                        locale={locale}
                        updatedAt={product.updatedAt}
                        createdAt={product.createdAt}
                    />
                ))}
            </div>

            {/* Pagination Component */}
            {
                totalPages > 1 ?
                    <CollectionPagination
                        goToPage={goToPage}
                        page={page}
                        totalPages={totalPages}
                    /> : null
            }
        </div>
    );
};

export default GridProducts;
