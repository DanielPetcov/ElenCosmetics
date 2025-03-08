'use client'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const LanguageSelector = () => {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const changeLanguage = (newLocale: string) => {
        const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`);
        router.push(newPath);
    };

    return (
        <div>
            <Select onValueChange={changeLanguage} defaultValue={locale}>
                <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder={locale.toUpperCase()} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="ro">RO</SelectItem>
                        <SelectItem value="ru">RU</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default LanguageSelector;