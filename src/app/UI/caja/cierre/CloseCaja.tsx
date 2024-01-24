'use client'

import { FetchSoldProductsToday } from "@/app/lib/data";

export default function GenerateButton({ Products } : {Products : any }) {


    const handleClick = async () => {
    };

    return <button onClick={handleClick}>Generate Excel</button>;
}
