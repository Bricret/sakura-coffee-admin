'use client'
import HandleParams from "@/app/lib/HandleParams";
import { Icons } from "@/app/plugins/Icons";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const { SearchIcon } = Icons;


export default function Search({ placeholder }: { placeholder: string } ) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const paramsName = 'query';

    const handleParams = (term: any, ) => {
        HandleParams({term, searchParams, paramsName, pathname, replace});
    }

    return (
        <Input
            onChange={ (e) => handleParams(e.target.value) }
            className="w-full sm:max-w-[44%]"
            placeholder={placeholder}
            startContent={ <SearchIcon /> }
            defaultValue={ searchParams.get('query')?.toString() }
          />
    )
}