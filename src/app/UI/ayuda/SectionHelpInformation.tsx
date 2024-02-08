

export default function SectionHelpInformation({title, children, id} : {title: string, id:string, children: React.ReactNode}) {

    return (
        <article className="border-2 border-black/40 text-inherit rounded-lg shadow-lg p-4 mb-28 bg-white" id={id}>
                <h1 className="font-bold text-2xl pb-2">{title}</h1>
                <div className="w-full">
                    {children}
                </div>
            </article>
    )
}