import { FetchProductsSoldByCategory } from "@/app/lib/data";
import FirstGraphic from "./FirstGraphic";
import { calculatePercentage } from "@/app/lib/utils";
import SecondGraphic from "./SecondGraphic";


export default async function GraphicsDashboard() {

    const ProductsSoldByCategory =  await FetchProductsSoldByCategory();

    const ProductMostSold = await calculatePercentage()

    return (
        <article className="flex justify-between items-center w-full">
            <FirstGraphic data={ProductsSoldByCategory} />
            <SecondGraphic product={ProductMostSold}/>
        </article>
    )
}