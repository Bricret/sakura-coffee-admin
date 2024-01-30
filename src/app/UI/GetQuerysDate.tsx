'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import HandleParams from "../lib/HandleParams";

export default function GetQuerysDate({invoice} : { invoice? : boolean }) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();




    const handleParamsStartDate = (term: any, ) => {
        let paramsName = '';
        if (invoice) {
            paramsName = 'startDate'
        } else {
            paramsName = 'startDateFlow'
        }
        HandleParams({term, searchParams, paramsName, pathname, replace});
    }

    const handleParamsEnDate = (term: any, ) => {
        let paramsName = '';
        if (invoice) {
            paramsName = 'endDate'
        } else {
            paramsName = 'endDateFlow'
        }
        HandleParams({term, searchParams, paramsName, pathname, replace});
    }

    return (
        <div className="flex mx-2 gap-x-4">
            <label className="flex items-center text-black font-semibold bg-secundary/60 py-0.5 px-2 rounded-2xl  text-base" htmlFor="startDate">
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
            <label className="flex items-center text-black font-semibold bg-secundary/60 py-0.5 px-2 rounded-2xl  text-base" htmlFor="endDate">
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