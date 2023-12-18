import { HandleParamsProps } from "./definitions";



export default function HandleParams({ term, searchParams, paramsName, pathname, replace }: HandleParamsProps) {

    const params = new URLSearchParams(searchParams);
    if (term) {
        params.set(paramsName, term);
    } else {
        params.delete(paramsName);
    }

    replace(`${pathname}?${params.toString()}`)
}