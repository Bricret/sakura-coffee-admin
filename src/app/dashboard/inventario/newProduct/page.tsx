import NavBar from "@/app/UI/dashboard/nav-bar";
import ProductForm from "@/app/UI/inventario/newProduct/ProductForm";


export default function NewProductPage() {
    return (
        <>
            <NavBar title="Nuevo producto" />
            <ProductForm />
        </>
    )
}