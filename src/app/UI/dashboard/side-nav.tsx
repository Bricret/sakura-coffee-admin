'use client';

import Link from "next/link";
import NavLinks from "./nav-links";
import { Icons } from "@/app/plugins/Icons";
import SakuraLogo from "./sakura-logo";
import { Button } from "@nextui-org/react";
import { fonts } from "../Fonts";
import { signOut } from "next-auth/react";

const { PowerIcon } = Icons;
const { merriweather } = fonts;

export default function SideNav() {
  return (
    <div className={`flex h-full flex-col px-3 py-4 md:px-2 border-0 md:border-r-2 border-secundary/30 bg-primary drop-shadow-2xl ${merriweather.className}`}>
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md p-4 md:h-32"
        href="/dashboard"
      >
          <SakuraLogo />
          <div className="block md:hidden">
            <h1 
              className="text-3xl font-bold text-fourth">
                Sakura  
                <span className="text-third"> Coffee </span> 
                Shop
            </h1>
          </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-primary md:block"></div>
        <form>
          <Button 
            className={`flex flex-col md:flex-row h-[80px] md:h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-primary p-3 text-sm font-medium hover:bg-red-600/40 hover:text-red-700 md:flex-none md:justify-start md:p-2 md:px-3 text-zinc-700`}
            startContent={<PowerIcon className="w-6 h-4" />}
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <p className="hidden md:block">Cerrar Sesion</p>
          </Button>
        </form>
      </div>
    </div>
  )
}