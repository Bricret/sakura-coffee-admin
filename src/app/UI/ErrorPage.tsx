'use client'

import Image from "next/image"
import { BackIcon } from "../plugins/Icons";
import Link from "next/link";

export default function ErrorPage({ ErrorCase, children } : { ErrorCase : string, children: React.ReactNode }) {
    return (
    <main className="relative bg-primary overflow-hidden h-screen">
    <article className="absolute flex justify-start items-start py-2 px-4 ">
        <Link href={'/dashboard'}>
            <BackIcon />
        </Link>
        </article>
        <section className="flex items-start md:items-center justify-center h-full mt-10 md:mt-0">
            <article className="flex flex-col justify-center px-6 items-center">
                <Image
                    alt="404 image"
                    src={'/Image/404.webp'}
                    width={350}
                    height={350}
                    className="w-300 sm:w-300 md:w-auto lg:w-auto xl:w-auto 2xl:w-auto h-300 sm:h-300 md:h-auto lg:h-auto xl:h-auto 2xl:h-auto"
                />
                <h1 className="text-[#390000] text-4xl text-center font-semibold pb-4">Error inesperado - {ErrorCase}</h1>
                <h4 className="mb-2 text-xl text-center text-black/70">{children}</h4>
            </article>
        </section>
    </main>
    )
}