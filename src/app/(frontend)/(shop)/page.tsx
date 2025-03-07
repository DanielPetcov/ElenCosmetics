import payload from '@/queries'
import ProductList from '../components/productList/ProductList'
import ImgSlider from '../components/ImgSlider/ImgSlider'
import GeneralCategories from '../components/GeneralCategories/GeneralCategories'

export default async function HomePage() {

  const homePageBlock = payload.findGlobal(
    {
      slug: 'homepage',
      depth: 4
    }
  )

  const layout = (await homePageBlock).Layout;

  return (
    <div className="flex flex-col gap-14 lg:gap-20 py-5 pt-0">
      <div>this is homepage</div>
      {
        layout.map((block, index) => {
          switch (block.blockType) {
            case 'productList':
              return <ProductList key={index} title={block.title} category={block.category} />
            case 'imgslider':
              return <ImgSlider key={index} slides={block.slides} />
            case 'general-big-categories':
              return <GeneralCategories key={index} categories={block.categories} />
            default:
              return null
          }
        })
      }
    </div>
  )
}
