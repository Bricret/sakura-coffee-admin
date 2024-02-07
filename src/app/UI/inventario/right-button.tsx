import { Icons } from "@/app/plugins/Icons";
import Link from "next/link";

const { PlusIcon } = Icons;


export default function RightButton({ route, title }: {route : string, title : string } ) {

    return (
    <div className="flex gap-3">
    <Link className="bg-fourth/60 text-center py-4 px-6 md:px-4 text-white font-bold rounded-xl " href={ route }>
        { title }
        <PlusIcon className="hidden md:inline-block ml-2" />
    </Link> 
    </div>
    )
}; 