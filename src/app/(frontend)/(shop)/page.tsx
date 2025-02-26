import config from '@payload-config'
import payload from '@/queries'
import ProductList from '../components/productList/ProductList'
import ImgSlider from '../components/ImgSlider/ImgSlider'

export default async function HomePage() {

  const homePageBlock = payload.findGlobal(
    {
      slug: 'homepage',
      depth: 4
    }
  )

  const layout = (await homePageBlock).Layout;

  return (
    <div className="flex flex-col gap-14 lg:gap-20 py-5">
      {
        layout.map((block) => {
          switch (block.blockType) {
            case 'productList':
              return <ProductList title={block.title} category={block.category} />
            case 'imgslider':
              return <ImgSlider slides={block.slides} />
            default:
              return null
          }
        })
      }
    </div>
  )
}
