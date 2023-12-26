import NavBar from "@/app/UI/dashboard/nav-bar";
import ProductForm from "@/app/UI/inventario/newProduct/ProductForm";
import { FetchCategorys, FetchUnicProduct } from "@/app/lib/data";


interface IdPageProps {
    params: {id: string};
}

export default async function IdPage({ params } : IdPageProps) {

    const categorias = await FetchCategorys();
    const productData = await FetchUnicProduct(Number(params.id));

    return (
        <>
            <NavBar title={"Editar producto "}/>
            <ProductForm categorias={ categorias } ProductData={ productData }/>
            
        </>
    )

}