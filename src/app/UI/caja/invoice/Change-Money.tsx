'use client';

export default function ChangeMoney({ isDollar, setIsDollar } : { isDollar : boolean, setIsDollar : any }) {

    const handleButtonClick = (currency : any) => {
        setIsDollar(currency === 'dollar');
    };

    return (
        <ul className="flex flex-row items-center justify-between bg-black/20 h-16 mb-2">
                <li className="flex-grow flex items-center justify-center  hover:bg-green-500/40 h-full text-xl font-semibold">
                    <button 
                        autoFocus={!isDollar}
                        className="focus:bg-green-500 border-none text-blue-800 h-full w-full flex items-center justify-center text-center"
                        onClick={() => handleButtonClick('cordoba')}
                    >
                        Cordoba
                    </button>
                </li>
                <li className="flex-grow flex items-center justify-center focus:bg-green-500 h-full hover:bg-green-500/40 text-xl font-semibold">
                    <button 
                        autoFocus={isDollar}
                        className="focus:bg-green-500 border-none text-red-800 h-full w-full flex items-center justify-center text-center"
                        onClick={() => handleButtonClick('dollar')}
                    >
                        Dolar
                    </button>
                </li>
            </ul>
    )
}