import NavBar from "@/app/UI/dashboard/nav-bar";
import ProductForm from "@/app/UI/inventario/newProduct/ProductForm";
import { FetchCategorys } from "@/app/lib/data";


export default async function NewProductPage() {

    const categorias = await FetchCategorys();

    return (
        <>
            <NavBar title="Nuevo producto" />
            <ProductForm  categorias={ categorias }/>
        </>
    )
}