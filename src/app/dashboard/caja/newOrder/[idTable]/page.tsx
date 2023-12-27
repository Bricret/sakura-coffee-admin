import AgreeProduct from "@/app/UI/caja/NewOrderByTable/AgreeProduct";


export default function NewOrderTablePage({ params } : any) {

    const { idTable } = params;

    return (
        <header className="mt-4">
            <AgreeProduct />       
        </header>
    )
}