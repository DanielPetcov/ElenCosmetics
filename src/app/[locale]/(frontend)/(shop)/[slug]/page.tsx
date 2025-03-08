import PageTitle from "../../components/PageTitle";
import payload from "@/queries";
import { TermsPage } from "@/payload-types";
import RichText from "@/blocks/richtext/Server";

const GeneralPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>
}) => {
    const { slug } = await params;
    const formattedStr = slug.replace(/%20/g, " ");

    if (!formattedStr) {
        return null;
    }

    const data = await payload.find({
        'collection': "termsPage",
        where: {
            title: {
                equals: formattedStr
            }
        }
    })

    console.log(formattedStr)

    return (
        <div className="container mx-auto text-gray-700 px-5 md:px-10 py-5 flex flex-col gap-5">
            <PageTitle title={formattedStr} />
            <div>
                {data.docs.map((item: TermsPage, index) => {
                    if (item.description) {
                        return <RichText key={index} data={item.description} className="text-sm md:text-base" />
                    } else {
                        return <div key={index}>Content not found</div>
                    }
                })}
            </div>
        </div>
    )
}

export default GeneralPage