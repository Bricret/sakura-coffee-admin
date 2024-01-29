import ErrorPage from "./UI/ErrorPage"

export default function NotFound() {

    return (
        <ErrorPage ErrorCase="Pagina no encontrada" >
            Verifique su direccion <strong>URL</strong>.
        </ErrorPage>
    )
}