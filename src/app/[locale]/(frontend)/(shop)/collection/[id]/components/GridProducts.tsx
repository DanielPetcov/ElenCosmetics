'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/app/[locale]/(frontend)/components/productList/ProductCard';
import { Product } from '@/payload-types';
import CollectionPagination from './CollectionPagination';
import VolumeType from '@/app/[locale]/(frontend)/types/VolumeType';
import BrandType from '@/app/[locale]/(frontend)/types/BrandType';

import { Skeleton } from '@/components/ui/skeleton';
interface Props {
    locale: string,
    id: number,
    sort: 'ascending' | 'descending',
    priceFilter?: { min: number; max: number } | null;
    volumes: VolumeType[];
    selectedVolumes: VolumeType[];
    setVolumes: React.Dispatch<React.SetStateAction<VolumeType[]>>;
    setSelectedVolumes: React.Dispatch<React.SetStateAction<VolumeType[]>>;
    brands: BrandType[];
    selectedBrands: BrandType[];
    setBrands: React.Dispatch<React.SetStateAction<BrandType[]>>;
    setSelectedBrands: React.Dispatch<React.SetStateAction<BrandType[]>>;
}

const GridProducts = ({
    locale,
    id,
    sort,
    priceFilter,
    selectedVolumes,
    setVolumes,
    selectedBrands,
    setBrands
}: Props) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);  // Store total pages
    const [loading, setLoading] = useState(true);
    const limit = 20;

    useEffect(() => {
        const fetchProducts = async () => {
            const sortType = sort === 'ascending' ? 'price' : '-price';
            try {
                const query = new URLSearchParams({
                    'joins[relatedCollections][equals]': id.toString(),
                    locale: locale,
                    limit: limit.toString(),
                    page: page.toString(),
                    sort: sortType,
                });

                if (priceFilter) {
                    query.append('where[price][greater_than_equal]', priceFilter.min.toString());
                    query.append('where[price][less_than_equal]', priceFilter.max.toString());
                }

                if (selectedVolumes.length > 0) {
                    const idArray: string[] = []
                    selectedVolumes.forEach((volume) => idArray.push(volume.id))
                    query.append('where[volumeRelation][equals]', idArray.toString()); // the id
                }

                if (selectedBrands.length > 0) {
                    const idArray: string[] = []
                    selectedBrands.forEach((brand) => idArray.push(brand.id))
                    query.append('where[brandRelation][equals]', idArray.toString()); // the id
                }

                query.append('depth', '2');

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
                console.log(data);
                setProducts(data.docs);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, locale, id, sort, priceFilter]);

    useEffect(() => {
        setVolumes((prevVolumes: VolumeType[]) => {
            const newVolumes = [...prevVolumes];

            products.forEach((product) => {
                const volume = product.volumeRelation;

                if (volume && typeof volume === 'object' && 'id' in volume && 'slug' in volume) {
                    if (!newVolumes.some((v) => v.id === volume.id)) {
                        newVolumes.push({
                            id: volume.id,
                            slug: volume.slug,
                        });
                    }
                }
            });

            return newVolumes;
        });
        setBrands((prevBrands: BrandType[]) => {
            const newBrands = [...prevBrands];

            products.forEach((product) => {
                const brand = product.brandRelation;

                if (brand && typeof brand === 'object' && 'id' in brand && 'slug' in brand) {
                    if (!newBrands.some((v) => v.id === brand.id)) {
                        newBrands.push({
                            id: brand.id,
                            slug: brand.slug,
                        });
                    }
                }
            });

            return newBrands;
        });
    }, [products]);

    // Function to handle page change
    const goToPage = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const renderSkeletons = () => {
        return Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className='flex flex-col gap-2'>
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        ))
    }

    return (
        <div className='flex flex-col items-center gap-5'>
            <div className="grid grid-cols-2 sm:flex flex-wrap lg:justify-end 2xl:justify-normal 2xl:grid 2xl:grid-cols-4 gap-4">
                {loading
                    ? renderSkeletons()
                    : products.map((product) => (
                        <div key={product.id}>
                            <ProductCard
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                featuredImg={product.featuredImg}
                                comparePrice={product.compare_price}
                                locale={locale}
                                updatedAt={product.updatedAt}
                                createdAt={product.createdAt}
                            />
                        </div>
                    ))
                }
            </div>

            {totalPages > 1 && (
                <CollectionPagination goToPage={goToPage} page={page} totalPages={totalPages} />
            )}
        </div>
    );
};

export default GridProducts;
