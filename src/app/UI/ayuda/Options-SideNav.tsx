

export default function OptionsSideNav({title, refSection, children} : {title : string, refSection : string, children : React.ReactNode}) {

    return (
        <section className="px-4 py-2">
        <a className="font-semibold text-xl text-[#390000] hover:text-[#D00] transition-colors duration-300" href={refSection}>{title}</a>
        <ul className="my-2 space-y-2 [&>li]:text-black/70 [&>li]:text-base">
            {children}
        </ul>
      </section>
    )
}