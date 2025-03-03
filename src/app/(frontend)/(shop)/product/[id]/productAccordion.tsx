import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import RichText from "@/blocks/richtext/Server"
import { Product } from "@/payload-types"

type Description = Product['description'];

interface Props {
    description: Description
    ingredients: string | null | undefined
}

const ProductAccordion = ({ description, ingredients }: Props) => {
    return (
        <Accordion type="single" collapsible className="w-full">
            {description ?
                <AccordionItem value="item-1" className="border-none" >
                    <AccordionTrigger className="text-xl hover:underline-none">Descriere</AccordionTrigger>
                    <AccordionContent>
                        <RichText data={description} />
                    </AccordionContent>
                </AccordionItem>
                : null
            }
            {
                ingredients ?
                    <AccordionItem value="item-2" className="border-none">
                        <AccordionTrigger className="text-xl hover:underline-none">Ingrediente</AccordionTrigger>
                        <AccordionContent className="text-gray-500">
                            {ingredients}
                        </AccordionContent>
                    </AccordionItem>
                    : null
            }
        </Accordion>
    )
}

export default ProductAccordion;