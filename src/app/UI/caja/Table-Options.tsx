import { EditIcon, Icons } from "@/app/plugins/Icons";
import { Chip, Tooltip } from "@nextui-org/react";
import Link from "next/link";


const { MoreIcon, ChangeIcon } = Icons;
 
export default function TableCashOption({ state, idTable }: { state? : string, idTable? : string }) {
    return (
        <div className="relative flex items-center justify-center">
          {
            state === 'libre' ? (
                <>
                <Chip   
                    classNames={{
                        base: "bg-gradient-to-br from-secundary to-primary border-small border-white/50 shadow-pink-500/30",
                        content: "drop-shadow shadow-black text-white",

                    }}>
                    <Link 
                        href={`/dashboard/caja/newOrder/${idTable}/create`}
                        className="text-base text-white cursor-pointer active:opacity-50"
                    >
                        Nueva Orden
                    </Link>
                </Chip>
                </>
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
                        <EditIcon />
                    </Link>
                </Tooltip>
                <Tooltip closeDelay={2} delay={500} content="Cambiar Mesa">
                    <Link 
                        href={`/dashboard/caja/newOrder/${idTable}`}
                        className="text-2xl text-black/70 cursor-pointer active:opacity-50"
                    >
                        <ChangeIcon />
                    </Link>
                </Tooltip>
                </div>
            )
          }
        </div>
    )
}