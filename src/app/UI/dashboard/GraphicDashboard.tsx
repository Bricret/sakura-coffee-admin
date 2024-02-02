import { FetchProductsSoldByCategory } from "@/app/lib/data";
import FirstGraphic from "./FirstGraphic";
import { calculatePercentage } from "@/app/lib/utils";
import SecondGraphic from "./SecondGraphic";


export default async function GraphicsDashboard() {

    const ProductsSoldByCategory =  await FetchProductsSoldByCategory();

    const ProductMostSold = await calculatePercentage()

    return (
        <article className="flex justify-between items-center w-full">
            <section className='w-8/12 h-96 bg-white rounded-lg p-3'>
                <FirstGraphic data={ProductsSoldByCategory} />
            </section>
            <section className="w-auto h-96 bg-white rounded-lg p-3">
                <h1 className="font-semibold text-2xl pb-4 text-zinc-500">Producto mas Vendido</h1>
                <SecondGraphic product={ProductMostSold}/>
            </section>
        </article>
    )
}