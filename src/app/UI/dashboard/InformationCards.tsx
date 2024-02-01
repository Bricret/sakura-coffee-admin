
export default function InformationCards({title, data} : {title : string, data : any }) {

    return (
    <article className="w-1/4 bg-white rounded-lg shadow-md p-4 flex justify-between items-center border-b-large border-b-blue-800">
        <header>
            <h2 className="text-xs font-semibold text-gray-500 uppercase">{title}</h2>
            <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M5 15l7-7 7 7" />
            </svg>
            <span className="text-3xl font-bold text-gray-800">{data} <span className="text-xl text-gray-500">%</span></span>
            </div>
        </header>
        <figure className="text-blue-500 bg-blue-100 rounded-full h-10 w-10 flex items-center justify-center"></figure>
    </article>
    )
}