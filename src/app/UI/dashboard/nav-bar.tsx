import React, { Suspense } from "react";
import { fonts } from "../Fonts";
import UserMenu from "./user-menu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CardSkeleton } from "../Skeleton";
import { FetchUnicRols } from "@/app/lib/data";


export default async function NavBar({ title, site } : { title: string, site?: boolean }) {

    const session = await getServerSession(authOptions);
    const Rol = await FetchUnicRols(Number(session?.user?.image?.toString()));

    return (
        <div >
            <div className="flex flex-row justify-between items-center px-4 py-2 mb-10">
                <div className="flex flex-row items-center gap-2">
                    <div className="w-8 h-8 bg-secundary rounded-full"></div>
                    <p 
                        className={`text-lg md:text-xl font-semibold cursor-default ${ fonts.merriweather.className }`}
                    >
                        {title}
                        {
                            site ? 
                            <span className="text-secundary font-bold">{ session?.user?.name }</span>
                            : null
                        
                        } 🎉
                    </p>
                </div>
                <Suspense fallback={<CardSkeleton />}>
                    <UserMenu username={ session?.user?.name || "" } rol={ Rol.nombre || "" }  />
                </Suspense>
            </div>
        </div>
    )
}