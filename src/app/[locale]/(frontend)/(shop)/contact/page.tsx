import PageTitle from "../../components/PageTitle"
import ContactAdrese from "./ContactAdrese"
import Map from "../../components/Map"
import ContactForm from "./contactform/ContactForm"

export default function ContactPage() {

  return (
    <div className="conatainer mx-auto w-full px-5 md:px-10 py-5 flex flex-col gap-10 max-w-[1800px]">
      <PageTitle title="Contact" />
      <div className="flex flex-col gap-10 md:gap-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-24 text-gray-700">
          <div className="flex flex-col gap-5">
            <h2 className="uppercase font-semibold text-lg md:text-xl">Ai o intrebare? scriene acum</h2>
            <ContactForm />
          </div>
          <ContactAdrese />
        </div>
        <Map />
      </div>
    </div>
  )
}
