import ActiveCajaForm from "@/app/UI/caja/cierre/ActiveCaja-Form";
import InfoCash from "@/app/UI/caja/cierre/Info-Cash";
import NominationForm from "@/app/UI/caja/cierre/Nomination-Forms";
import { FetchCaja, FetchCajaActive } from "@/app/lib/data";




export default async function MainCloseCash() {

    
    const caja = await FetchCaja();
    const cajaActive = await FetchCajaActive();

    return (
        <main className="flex flex-col mb-10">
        {cajaActive === null ? (
            <header>
            <article className="flex flex-col w-full md:w-1/3">
                <ActiveCajaForm caja={caja}/>
            </article>
            <article className="flex items-center justify-center my-auto mx-auto h-60 md:h-96">
                <h1 className="text-3xl md:text-5xl text-zinc-600/40 cursor-default">Active una caja</h1>
            </article>
            </header>
        ) : (
            <>
            <InfoCash cajaActiva={cajaActive} />
            <NominationForm cajaActiva={cajaActive}  />
            </>
            
        )}
    </main>
    )
}