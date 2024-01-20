import { handleInputChangeMontos } from "@/app/lib/utils";

export default function NominationTableForm({ Nomination, montos, setMontos, title, dolar = false } : { Nomination: any, montos: any, setMontos: any, title: string, dolar?: boolean }) {

    return (
        <article className="mb-4">
            <h2 className="text-xl font-semibold">
                { title }   
                <span className={`${dolar === true ? 'text-red-500' : 'text-blue-500'}`}>
                    { dolar === true ? ' DOLARES U$' : ' CORDOBAS C$'}
                </span>
            </h2>
            <form action="" className="border-2 border-black/40 p-2 rounded-md">
            {
            Nomination.map((item : any) => (
                <div className="flex flex-row gap-2" key={item.name}>
                    <div className="flex flex-col w-1/2">
                        <label htmlFor={item.name}>{item.label}</label>
                        <input 
                        type="number" 
                        name={item.name}
                        id={item.name}
                        min="0"
                        max="200"
                        className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                        onChange={(e) => handleInputChangeMontos(e, item.factor, item.name, setMontos)}
                        />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label htmlFor={item.montoid}>Monto</label>
                        <input 
                        type="number" 
                        name={item.montoid}
                        id={item.montoid}
                        value={montos[item.name] || ''}
                        readOnly
                        className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                        />
                    </div>
                </div>

            ))
            }
        </form>
    </article>
    )
}