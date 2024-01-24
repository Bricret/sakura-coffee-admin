'use client'


export default function GenerateButton({ Products } : {Products : any }) {


    const handleClick = async () => {
        console.log(Products);
    };

    return <button onClick={handleClick}>Generate Excel</button>;
}
