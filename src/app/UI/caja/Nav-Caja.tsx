'use client'
import Link from "next/link";
import { fonts } from "../Fonts";
import { LinkCaja } from "@/app/lib/data/Local-Data";
import { usePathname } from "next/navigation";
import useUserStore from "@/app/context/store";
import { motion } from 'framer-motion';


export default function NavCaja() {

    const pathname = usePathname();
    const { user } = useUserStore();

    return (
        <nav className="relative">
            <ul 
                className={`border-t-2 border-secundary/30 pb-6 pt-2 flex items-center justify-between ${fonts.merriweather.className}`}
            >
                {
                    LinkCaja.map((link) => {
                        const LinkIcon = link.icon;
                        if(link.title !== 'Mesas' && user.role === 'Mesero') return null
                        return (
                            <motion.li 
                                key={link.title}
                                whileHover={{ scale: 0.9}}
                                transition={{ type: "spring", stiffness: 300 }}
                                className={`flex flex-grow basis-0 justify-center py-2
                                ${ pathname === link.href ? 'text-black font-bold bg-black/20 backgrop-blur-lg rounded': 'text-zinc-700 hover:text-black' }
                                `}
                            >
                                <Link 
                                    href={link.href} 
                                    className="flex flex-grow basis-0 justify-center"
                                >
                                    <LinkIcon className="size-8 hidden md:block" />
                                    <p className="pl-2">{link.title}</p>
                                </Link>
                            </motion.li>
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