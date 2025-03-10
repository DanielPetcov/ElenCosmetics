import payload from "@/queries";
import CollectionBody from "./components/CollectionBody";
import CollectionBreadCrumbs from "./components/CollectionBreadCrumbs";

const Page = async ({ params }: { params: Promise<{ locale: string, id: number }> }) => {
    const { locale, id } = await params;
    try {
        const data = await payload.findByID({
            'collection': 'collection',
            id: id,
            depth: 0,
            select: {
                title: true,
            },
            locale: locale as 'ro' | 'ru' || 'all'
        })
        return (
            <div className="text-gray-700 px-5 md:px-10 py-5">
                <div className="flex flex-col gap-5">
                    <CollectionBreadCrumbs locale={locale} title={data.title} />
                    <CollectionBody
                        data={data}
                        locale={locale}
                        id={id}
                    />
                </div>
            </div>
        )
    } catch (error) {
        console.log(error)
    }
    return null
}

export default Page;