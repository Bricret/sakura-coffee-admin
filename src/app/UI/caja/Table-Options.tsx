import { Icons } from "@/app/plugins/Icons";
import { Tooltip } from "@nextui-org/react";
import Link from "next/link";
import ChangeTables from "./Change-Tables";
import { FetchOrdersByIdTable, FetchTablesActives } from "@/app/lib/data";

const { MoreIcon, CashRegisterIcon } = Icons;
 

export default async function TableCashOption({ state, idTable }: { state? : string, idTable? : string }) {

    const infoOrder = await FetchOrdersByIdTable(idTable);
    const TablesActives = await FetchTablesActives();

    return (
        <div className="relative flex items-center justify-center">
          {
            state === 'libre' ? (
                <Link 
                    href={`/dashboard/caja/newOrder/${idTable}/create`}
                    className="text-base text-white cursor-pointer active:opacity-50 bg-fourth/60 px-4 py-2 rounded-xl"
                    rel="preload"
                >
                    Nueva Orden
                </Link>
            ) : (
                <div className="flex flex-row gap-6 md:gap-10 border-0 ">
                <Tooltip closeDelay={2} delay={500} content="Ver Orden">
                    <Link 
                        href={`/dashboard/caja/newOrder/${idTable}/view`}
                        className="text-2xl text-black/70 cursor-pointer active:opacity-50"
                    >
                        <MoreIcon />
                    </Link>
                </Tooltip>
                <Tooltip closeDelay={2} delay={500} content="Facturar">
                    <Link 
                        href={`/dashboard/caja/newOrder/${idTable}`}
                        className="text-2xl text-black/70 cursor-pointer active:opacity-50"
                    >
                        <CashRegisterIcon />
                    </Link>
                </Tooltip>
                <ChangeTables tables={ TablesActives } infoOrder={ infoOrder } />
                </div>
            )
          }
        </div>
    )
}