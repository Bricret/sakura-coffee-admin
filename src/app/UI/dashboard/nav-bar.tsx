import React, { Suspense } from "react";
import { fonts } from "../Fonts";
import UserMenu from "./user-menu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FetchUnicRols } from "@/app/lib/data";
import Image from "next/image";


export default async function NavBar({ title, site } : { title: string, site?: boolean }) {

    const session = await getServerSession(authOptions);
    const Rol = await FetchUnicRols(Number(session?.user?.image?.toString()));

    return (
        <div >
            <div className="flex flex-row justify-between items-center py-2 mb-10 mr-7 md:mr-0">
                <div className="flex flex-row items-center gap-2">
                    <div className="w-8 h-8 flex flex-wrap bg-secundary rounded-full"></div>
                    <p 
                        className={`text-sm md:text-xl font-semibold cursor-default ${ fonts.merriweather.className }`}
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
                    <UserMenu username={ session?.user?.name || "" } rol={ Rol.nombre || "" }  />
            </div>
        </div>
    )
}