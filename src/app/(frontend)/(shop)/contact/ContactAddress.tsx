import { Contact } from "@/payload-types";
import RichText from "@/blocks/richtext/Server";
import FacebookIcon from "../../components/Icons/FacebookIcon";
import InstagramIcon from "../../components/Icons/InstagramIcon";
import Link from "next/link";
type ContactAddressProps = {
    contact: Contact['contacts'][0];
};

const ContactAddress = ({ contact }: ContactAddressProps) => {
    return (
        <div className="flex flex-col gap-2 w-fit h-fit">
            <h3 className="text-sm font-semibold">{contact.title}</h3>
            <div>
                {contact.type === 'richtext' && contact.richtext ?
                    <RichText className="text-xs" data={contact.richtext} />
                    :
                    contact.type === 'link' && contact.link ?
                        <Link href={contact.link.url} className="flex gap-2 items-center group">
                            {contact.link.type === 'facebook' && <div className="w-4"><FacebookIcon color="#838383" /></div>}
                            {contact.link.type === 'instagram' && <InstagramIcon color="#838383" />}
                            <span className="text-xs group-hover:underline">{contact.link.label}</span>
                        </Link> : null
                }
            </div>
        </div>
    )
}

export default ContactAddress;