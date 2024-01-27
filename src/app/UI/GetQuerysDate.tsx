'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import HandleParams from "../lib/HandleParams";

export default function GetQuerysDate() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleParamsStartDate = (term: any, ) => {
        const paramsName = 'startDate';
        HandleParams({term, searchParams, paramsName, pathname, replace});
    }

    const handleParamsEnDate = (term: any, ) => {
        const paramsName = 'endDate';
        HandleParams({term, searchParams, paramsName, pathname, replace});
    }

    return (
        <div className="flex mx-2 gap-x-4">
            <label className="flex items-center text-black font-semibold bg-secundary/60 py-0.5 px-2 rounded-2xl  text-base w-1/5 md:w-full" htmlFor="startDate">
                Fecha Inicio:
                <input
                    className="bg-transparent outline-none text-black/60 font-normal text-base"
                    type="date"
                    id="startDate"
                    name="startDate"
                    onChange={ (e) => handleParamsStartDate(e.target.value) }
                    defaultValue={ searchParams.get('startDate') || '' }
                />
            </label>
            <label className="flex items-center text-black font-semibold bg-secundary/60 py-0.5 px-2 rounded-2xl  text-base w-1/5 md:w-full" htmlFor="endDate">
                Fecha Final:
                <input
                    className="bg-transparent outline-none text-black/60 font-normal text-base"
                    type="date"
                    id="endDate"
                    name="endDate"
                    onChange={ (e) => handleParamsEnDate(e.target.value) }
                    defaultValue={ searchParams.get('endDate') || '' }
                />
            </label>
        </div>
    )
}