'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Links } from "../../lib/data/Local-Data";


export default function NavLinks() {

    const pathname = usePathname();

    return (
        <>
        {Links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link     
            key={link.title}
            href={link.href}
            className={`flex flex-col md:flex-row h-[80px] md:h-[48px] grow items-center justify-center gap-2 rounded-md bg-primary p-3 text-sm font-medium hover:bg-secundary/40 text-zinc-700 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3 transition-all duration-300 ease-in-out 
            
              ${ pathname === link.href ? 'bg-secundary/40 focus:text-black  ': '' }
            `}
          >
            <LinkIcon className="w-6 h-5 " />
            <p className="hidden md:block">{link.title}</p>
          </Link>
        );
      })}
        </>
    )
}