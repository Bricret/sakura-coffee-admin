'use client';

import { 
    TableNominationDolarsBanknote, 
    TableNominationNationalBanknote, 
    TableNominationNationalCoin } 
from "@/app/lib/data/Local-Data";

import { useEffect, useState } from "react";

export default function NominationForms() {

    const [montos, setMontos] = useState<Record<string, number>>({});
    const [totalMonto, setTotalMonto] = useState<number>(0);

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>, factor: number, name: string) => {
        const value = parseFloat(e.target.value) || 0;
        const result = value * factor; // Multiplica el valor ingresado por el factor
        setMontos(prevMontos => ({ ...prevMontos, [name]: result })); // Actualiza el estado con el resultado
      };


    const calcularTotalMonto = () => {
        const total = Object.values(montos).reduce((sum, monto) => sum + monto, 0);
        setTotalMonto(total);
    };

    useEffect(() => {
        calcularTotalMonto();
    }, [montos]);

    return (
        <main className="flex flex-row gap-4 mt-6 md:mt-10">
            <article >
                <h2 className="text-xl font-semibold ">Tabla de billetes <span className="text-blue-500">CORDOBAS</span></h2>
                <form action="" className="border-2 border-black/40 p-2 rounded-md">
                    {
                    TableNominationNationalBanknote.map((item) => (
                        <div className="flex flex-row gap-2" key={item.name}>
                            <div className="flex flex-col w-full">
                                <label htmlFor={item.name}>{item.label}</label>
                                <input 
                                type="number" 
                                name={item.name}
                                id={item.name}
                                min="0"
                                max="200"
                                className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                                onChange={(e) => handleInputChange(e, item.factor, item.name)}
                                />
                            </div>
                            <div className="flex flex-col w-full">
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
            <div className="flex flex-col">
            <article className="mb-4">
            <h2 className="text-xl font-semibold ">Tabla de Monedas <span className="text-blue-500">CORDOBAS</span></h2>
                <form action="" className="border-2 border-black/40 p-2 rounded-md">
                    {
                    TableNominationNationalCoin.map((item) => (
                        <div className="flex flex-row gap-2" key={item.name}>
                            <div className="flex flex-col w-full">
                                <label htmlFor={item.label}>{item.label}</label>
                                <input 
                                type="number" 
                                name={item.label}
                                id={item.label}
                                min="0"
                                max="200"
                                className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                                onChange={(e) => handleInputChange(e, item.factor, item.name)}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor={item.montoid}>Monto</label>
                                <input 
                                type="number" 
                                name={item.montoid}
                                id={item.montoid}
                                readOnly
                                className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                                value={montos[item.name] || ''}
                                />
                            </div>
                        </div>

                    ))
                    }
                </form>
            </article>
            <article>
            <h2 className="text-xl font-semibold ">Tabla de billetes <span className="text-red-500">DOLARES</span></h2>
                <form action="" className="border-2 border-black/40 p-2 rounded-md">
                    {
                    TableNominationDolarsBanknote.map((item) => (
                        <div className="flex flex-row gap-2" key={item.name}>
                            <div className="flex flex-col w-full">
                                <label htmlFor={item.name}>{item.label}</label>
                                <input 
                                type="number" 
                                name={item.name}
                                id={item.name}
                                min="0"
                                max="200"
                                className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                                onChange={(e) => handleInputChange(e, item.factor, item.name)}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor={item.montoid}>Monto</label>
                                <input 
                                type="number" 
                                name={item.montoid}
                                id={item.montoid}
                                readOnly
                                className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                                value={montos[item.name] || ''}
                                />
                            </div>
                        </div>

                    ))
                    }
                </form>
            </article>
            </div>
            <section>
                <h2 className="text-xl font-semibold ">Pago con <span className="text-blue-500">Tarjeta</span></h2>
                <form action="" className="border-2 border-black/40 w-full p-2 rounded-md">
                    <div className="flex flex-row gap-2 w-full">
                        <div className="flex flex-col w-full">
                            <label htmlFor="cheques">Cantidad</label>
                            <input 
                            type="number" 
                            name="cheques"
                            id="cheques"
                            min="0"
                            max="200"
                            className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                            />
                        </div>
                    </div>
                </form>
                <section>
                    {/* <div className="flex flex-row gap-2">
                        <div className="flex flex-col w-full">
                            <label htmlFor="total">Total Recuento</label>
                            <input 
                            type="number" 
                            name="total"
                            id="total"
                            readOnly
                            value={totalMonto}
                            className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                            />
                        </div>
                    </div> */}
                    <h1 className="text-5xl font-bold text-green-500">{totalMonto}</h1>
                </section>
            </section>
        </main>
    )
}