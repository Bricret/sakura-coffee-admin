import React from "react";
import { fonts } from "../Fonts";
import UserMenu from "./UserMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface UserMenuProps {
    username: string;
    rol: string | null | undefined;
}

export default async function NavBar() {

    const session = await getServerSession(authOptions);

    return (
        <div >
            <div className="flex flex-row justify-between items-center px-4 py-2 ">
                <div className="flex flex-row items-center gap-2">
                    <div className="w-8 h-8 bg-secundary rounded-full"></div>
                    <p className={`text-lg md:text-xl font-semibold ${ fonts.merriweather.className }`}>Bienvenido de nuevo <span className="text-secundary font-bold">{ session?.user?.name }</span> 🎉</p>
                </div>
                <UserMenu username={ session?.user?.name || "" } rol={ session?.user?.image || "" }  />
            </div>
        </div>
    )
}