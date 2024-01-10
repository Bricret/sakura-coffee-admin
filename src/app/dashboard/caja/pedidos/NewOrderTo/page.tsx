import { fonts } from "@/app/UI/Fonts";
import NewOrderToForm from "@/app/UI/caja/pedidos/NewOrderTo-Form";



export default function NewOrderToPage() {

    return (
        <div>
            <h1 
                className={`${fonts.merriweather.className} text-4xl font-bold mb-4`}>
                Creando Nuevo <span className="text-secundary">Pedido</span>
            </h1>
        <NewOrderToForm type="new" />
        </div>
    )
}