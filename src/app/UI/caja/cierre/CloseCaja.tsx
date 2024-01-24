'use client'

import { ExcelCloseCash } from "@/app/lib/exportExcel/ExcelCloseCash";


export default function GenerateButton({ Products } : {Products : any }) {


    const handleClick = async () => {
        ExcelCloseCash(Products);
    };

    return <button onClick={handleClick}>Generate Excel</button>;
}
