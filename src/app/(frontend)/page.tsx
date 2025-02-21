import React from 'react'
import categories from './testdata/categories'
import banners from './testdata/banner'
import products from './testdata/products'
import featuredCategories from './testdata/featuredCategory'
import CategoriesCarousel from './components/CategoriesCarousel/CategoriesCarousel'
import ImgSlider from './components/ImgSlider/ImgSlider'
import ProductList from './components/productList/ProductList'
import FeaturedCategories from './components/FeaturedCollections/FeaturedCollections'


export default async function HomePage() {
  return (
    <div className="flex flex-col gap-20">
      <div><ImgSlider data={banners} /></div>
      <div className="container mx-auto">
        <CategoriesCarousel data={categories} />
      </div>
      <div className="container mx-auto">
        <ProductList data={products} title='TOP VÂNZĂRI'/>
      </div>
      <div className="container mx-auto">
        <ProductList data={products} title='Parfumuri'/>
      </div>
      <div className='container mx-auto'>
        <FeaturedCategories data={featuredCategories}/>
      </div>
      <div className="container mx-auto">
        <ProductList data={products} title='Produse recomandate'/>
      </div>
    </div>
  )
}
