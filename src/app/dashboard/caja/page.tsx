import { LatestInventorySkeleton } from "@/app/UI/Skeleton";
import TableCash from "@/app/UI/caja/Table-Cash";
import { FetchCajaActive } from "@/app/lib/data";
import { Metadata } from "next"
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Caja | Sakura Coffee Shop',
  };

export default async function CashPage() {

    const caja = await FetchCajaActive();

    return (
        <>
            {
            caja === null ? null : (
                <header className="flex justify-end mt-2 mb-6 gap-3 items-center md:items-end">
                    <Link 
                        href={'/dashboard/caja/newOrder'}
                        className="bg-fourth text-center py-4 md:py-2 px-6 md:px-4 text-white rounded-xl "
                    >
                        Facturar
                    </Link>
                </header>   
            )
            }
            <main 
                className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small w-full"
            >
                <Suspense fallback={ <LatestInventorySkeleton /> }>
                    <TableCash caja={ caja }/>
                </Suspense>
            </main>
        </>
    )
}