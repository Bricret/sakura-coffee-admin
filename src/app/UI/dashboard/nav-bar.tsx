import { fonts } from "../Fonts";
import UserMenu from "./user-menu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FetchUnicRols } from "@/app/lib/data";
import Image from "next/image";

// user.image = idRol // user.email = estado del usuario

export default async function NavBar({ title, site } : { title: string, site?: boolean }) {

    const session = await getServerSession(authOptions);
    const Rol = await FetchUnicRols(Number(session?.user?.image?.toString()));

    return (
    <div className="flex flex-row justify-between items-center mb-10 py-2 mr-7 md:mr-0">
        <div className="flex flex-col">
            <div className="flex items-center">
                <div className="w-8 h-8 flex flex-wrap bg-secundary rounded-full"></div>
                <p 
                    className={`text-sm md:text-xl font-semibold cursor-default px-2 ${ fonts.merriweather.className }`}
                >
                    {title}
                    {
                        site ? 
                        <span className="text-secundary font-bold">{ session?.user?.name }</span>
                        : null  
                    
                    } 
                </p>
                <Image 
                    src="/logo-unic.png"
                    width={ 60 }
                    height={ 60 }
                    alt="Logo"
                    className="object-contain hidden md:block w-auto h-auto"
                />
            </div>
            <p className="text-lg text-black/40 font-semibold">Cambio: {process.env.NEXT_PUBLIC_CONVERSION_RATE}</p>
        </div>
            <UserMenu username={ session?.user?.name || "" } rol={ Rol.nombre || "" }  />
    </div>
    )
}