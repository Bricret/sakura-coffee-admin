'use client'
import Link from "next/link";
import { useEffect } from "react";
import { fonts } from "../Fonts";
import { LinkCaja } from "@/app/lib/data/Local-Data";
import { usePathname } from "next/navigation";


export default function NavCaja() {

    const pathname = usePathname();
    // manejo de backdrop para el menu de caja
    useEffect(() => {
        const listItem = document.querySelectorAll('li');
        const menuBackdrop : any = document.getElementById('menu-backdrop');
        const nav : any = document.querySelector('nav');
        const menuBackdropRect = menuBackdrop.getBoundingClientRect();
    
        listItem.forEach((item) => {
            item.addEventListener('mouseenter', () => {
                const { left, top, width, height } = item.getBoundingClientRect();
                menuBackdrop.style.setProperty('--left', `${left - menuBackdropRect.left}px`);
                menuBackdrop.style.setProperty('--top', `${top - menuBackdropRect.top}px`);
                menuBackdrop.style.setProperty('--width', `${width}px`);
                menuBackdrop.style.setProperty('--height', `${height}px`);
                menuBackdrop.style.opacity = '1';
                menuBackdrop.style.visibility = 'visible';
            })
        });
    
        listItem.forEach((item) => {
            item.addEventListener('mouseleave', () => {
                menuBackdrop.style.opacity = '0';
                menuBackdrop.style.visibility = 'hidden';
            })
        });
    
    }, []);

    return (
        <nav className="relative">
            <ul 
                className={`border-t-2 border-secundary/30 pb-6 pt-2 flex items-center justify-between ${fonts.merriweather.className}`}
            >
                {
                    LinkCaja.map((link) => {
                        const LinkIcon = link.icon;
                        return (
                            <li 
                                key={link.title}
                                className={`flex flex-grow basis-0 justify-center py-2
                                ${ pathname === link.href ? 'text-black font-bold bg-black/20 backgrop-blur-lg rounded': 'text-zinc-700 hover:text-black' }
                                `}
                            >
                                <Link 
                                    href={link.href} 
                                    className="flex flex-grow basis-0 justify-center"
                                >
                                    <LinkIcon className="w-6 h-5 hidden md:block" />
                                    <p className="pl-2">{link.title}</p>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            <div
                id="menu-backdrop"
                className={`
                    absolute bg-black/30 backgrop-blur-lg rounded
                    translate-x-[var(--left)] translate-y-[var(--top)] 
                    w-[var(--width)] h-[var(--height)]
                    transition-all duration-500 ease-in-out opacity-0 -z-10
                `}
            />
        </nav>
    )
}