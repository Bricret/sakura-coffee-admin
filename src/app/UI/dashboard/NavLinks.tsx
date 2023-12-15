'use client';
import { Icons } from "@/app/plugins/Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

// const { HostIcon, InvoiceIcon, UserIcon, WorkerIcon } = Icons;

const links = [
    { 
        name: 'Pagina Principal', 
        href: '/home', 
        // icon: HostIcon 
      },
    
      { 
        name: 'Registros', 
        href: '/home/registrar', 
        // icon: WorkerIcon 
      },
    
      {
        name: 'Lista de registros',
        href: '/home/registros',
        // icon: InvoiceIcon
      },
      {
        name: 'Usuarios',
        href: '/home/usuarios',
        // icon: UserIcon
      }
    ];

export default function NavLinks() {

    const pathname = usePathname();

    return (
        <>
        {links.map((link) => {
        // const LinkIcon = link.icon;
        return (
          <Link     
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
            
              ${ pathname === link.href ? 'text-blue-600 bg-sky-100 ': '' }
            `}
          >
            {/* <LinkIcon className="w-6" /> */}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
        </>
    )
}