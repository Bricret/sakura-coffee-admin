import Link from "next/link";
import NavLinks from "./NavLinks";
import { Icons } from "@/app/plugins/Icons";
import SakuraLogo from "./sakuraLogo";

const { PowerIcon } = Icons;

export default function SideNav() {
    return(
        <div className="flex h-full flex-col px-3 py-4 md:px-2 border-r-2  shadow-primary shadow-2xl ">
        <Link
          className="mb-2 flex h-20 items-center justify-center rounded-md p-4 md:h-32"
          href="/dashboard"
        >
            <SakuraLogo />
        </Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          <form>
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
        </div>
      </div>
    )
}