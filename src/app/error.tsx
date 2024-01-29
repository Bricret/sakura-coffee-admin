'use client'

import ErrorPage from "./UI/ErrorPage"

export default function Error() {

    return (
        <ErrorPage ErrorCase="Fallo del sistema" >
            Notifique a un <strong>Administrador</strong>.
        </ErrorPage>
    )
}