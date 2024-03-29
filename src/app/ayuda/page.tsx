import Image from "next/image";
import SectionHelpInformation from "../UI/ayuda/SectionHelpInformation";


export default function AyudaPage() {

    return (
        <main className="flex flex-col justify-center items-center  p-5 md:p-16">
            <header className="text-center mb-28" id="top">
                <h1 
                    className="text-2xl md:text-4xl font-bold text-[#390000] pb-2"
                >
                    Bienvenido al manual de usuario del sistema de manejo de inventario y caja automatizado
                </h1>
                <h2 className="text-fourth text-2xl md:text-4xl font-bold pb-6">Sakura Coffee Shop</h2>
                <p className="text-base md:text-xl text-black/70">
                    Nuestro sistema de gestión de inventario y punto de venta se basa en un esquema de base de datos que organiza y rastrea todos los productos disponibles para la venta.
                </p>
            </header>
            <SectionHelpInformation title="Dashboard" id="dashboard" >
            <div className="flex justify-center items-center my-4">
                <Image
                    alt="dashboard img"
                    src="/dashboard.png" 
                    width={800} 
                    height={600}
                    priority
                    className="object-cover flex-grow-0 flex-shrink-0 border-1 rounded-md border-black/60"
                />
            </div>
            <p className="pb-2">
                    <span className="font-semibold text-black">La primera página</span> que verás después de iniciar sesión en el sistema de manejo de inventario y caja automatizado presenta cuatro tarjetas dispuestas de manera horizontal. Estas tarjetas proporcionan información sobre las facturas y pedidos del negocio. 
                </p>
                <p className="pb-2">
                    Después encontrarás <span className="font-semibold text-black">dos gráficas</span> que proporcionan información valiosa sobre las ventas. Estas gráficas son herramientas de análisis visual que ayudan a los usuarios a comprender rápidamente las tendencias de ventas y a tomar decisiones basadas en datos para mejorar la operación del negocio
                </p>
                <p>
                    En la <span className="font-semibold text-black">última sección</span> de la página se presentan otras cuatro tarjetas que proporcionan información adicional sobre el rendimiento financiero y operativo del negocio. Estas tarjetas proporcionan una visión general rápida de la salud financiera y la eficiencia operativa del negocio, permitiendo a los usuarios tomar decisiones informadas basadas en datos actualizados y relevantes.
                </p>
            </SectionHelpInformation>
            <SectionHelpInformation title="Panel de Navegacion (Izquierda)" id="sidebar" >
                <p className="pb-6">
                Es un menú vertical con el logo de la cafetería en la parte superior, el cual, si se le da clic, lo lleva al panel antes mencionado. Con opciones para navegar por diferentes secciones de la aplicación.
                </p>
                <article className="flex items-center gap-x-4">
                    <section className="w-3/5 pr-6">
                        <ul className="py-2 [&>li]:py-6">
                            <li><span className="text-lg text-black font-semibold">Panel:</span> Este botón lleva al usuario a un panel de control o dashboard donde se visualizan datos generales y estadísticas importantes para la gestión del negocio.</li>
                            <li><span className="text-lg text-black font-semibold">Caja:</span> Esta opción lleva a la sección de la aplicación que maneja las transacciones de venta, como abrir y cerrar la caja, registrar ventas, emitir recibos y realizar pedidos</li>
                            <li><span className="text-lg text-black font-semibold">Catalogo:</span> Aquí el usuario podra acceder al listado de productos o servicios que ofrece el negocio, con la posibilidad de añadir, editar o eliminar productos y agregar categorias.</li>
                            <li><span className="text-lg text-black font-semibold">Reportes:</span> Esta sección contiene informes y análisis de ventas, inventario, ganancias y otros datos relevantes para la toma de decisiones.</li>
                            <li><span className="text-lg text-black font-semibold">Salir:</span> Este botón es para cerrar la sesión o salir de la aplicación.</li>
                        </ul>
                    </section>
                    <section className="ml-12">
                        <Image
                            alt="sideNav img"
                            src="/sidenav.png" 
                            width={200} 
                            height={200}
                            priority
                            className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto border-1 rounded-md border-black/60"
                        />
                    </section>
                </article>
            </SectionHelpInformation>
            <SectionHelpInformation title="Panel de Navegacion (Superior)" id="navbar" >
                <div className="flex justify-center items-center py-4">
                    <Image
                        alt="navbar img"
                        src="/navbar.png" 
                        width={700} 
                        height={700}
                        priority
                        className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto border-1 rounded-md border-black/60"
                    />
                </div>
                <p className="pb-2">
                La barra de navegación superior muestra un mensaje de bienvenida personalizado o la pagina donde se encuentra al usuario que ha iniciado sesión, en este caso, un administrador llamado Brian. El mensaje de bienvenida está acompañado del logo de la empresa. Además, se proporciona información relevante como la tasa de cambio actual, situada debajo del saludo o de la pagina donde se encunetra.
                </p>
                <p className="pb-2">
                En el lado derecho, el nombre del usuario y su rol dentro del sistema con opciones que puede realizar dependiendo el rol del usuario ingresado.
                </p>
            </SectionHelpInformation>
            <SectionHelpInformation title="Acciones por Usuario" id="user-options" >
                <div className="flex gap-x-4 items-center">
                    <p className="leading-loose">
                    Estas opciones generales han sido cuidadosamente elaboradas con el objetivo de facilitar la gestión y supervisión eficiente del negocio. Se busca optimizar los procesos para que sean más rápidos y accesibles, mejorando así la productividad y la toma de decisiones. Sin embargo, es importante destacar que el acceso a estas herramientas está restringido y se concede únicamente a los individuos que cuentan con la autorización necesaria. Esto garantiza la seguridad de la información y asegura que solo el personal calificado pueda realizar cambios o consultas críticas para la operación del negocio.
                    </p>
                    <Image
                        alt="userMenu img"
                        src="/user-menu.png" 
                        width={300} 
                        height={300}
                        priority
                        className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto border-1 rounded-md border-black/60"
                    />
                </div>
            </SectionHelpInformation>
            <SectionHelpInformation title="Crear Usuario" id="create-user" >
                <div className="flex flex-col items-center">
                    <Image
                        alt="create-user img"
                        src="/create-user.png" 
                        width={600} 
                        height={600}
                        priority
                        className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto py-4"
                    />
                    <p>
                    {`
                        Al seleccionar 'Crear Usuario', ingresará a una página donde podrá ingresar el nombre, la contraseña y elegir un rol para el usuario. Si todo sale bien, le aparecerá una notificación en la esquina superior izquierda confirmando la creación del usuario.
                    `} 
                    </p>
                </div>
            </SectionHelpInformation>
            <SectionHelpInformation title="Editar Usuario" id="edit-user" >
                <div className="flex flex-col items-center">
                    <Image
                        alt="edit-user img"
                        src="/edit-user.png" 
                        width={600} 
                        height={600}
                        priority
                        className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto py-4"
                    />
                    <p>
                    {`
                        Al seleccionar 'Editar Usuario', ingresará a una página donde tendrá la lista completa de los usuarios registrados. Aquí podrá cambiar el rol del usuario, la contraseña y decidir si estará activo o inactivo.
                        `} 
                    </p>
                </div>
            </SectionHelpInformation>
            <SectionHelpInformation title="Agregar Mesa" id="agree-table" >
                <div className="flex gap-x-4 items-center">
                    <p className="leading-loose">
                    {`
                        Al hacer clic en el botón "Agregar Mesa", automáticamente se agregará una nueva mesa al sistema, calculando y asignando un número secuencial basado en la última mesa existente, y la ubicará al final de la lista.
                        `} 
                    </p>
                    <Image
                        alt="edit-table img"
                        src="/edit-table.png" 
                        width={600} 
                        height={600}
                        priority
                        className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto py-4 border-1 rounded-md border-black/70"
                    />
                </div>
            </SectionHelpInformation>
            <SectionHelpInformation title="Ayuda y Cerrar Sesion" id="last-options" >
                <div className="flex gap-x-4 items-center">
                    <p>
                    {`
                        El botón 'Ayuda' te dirige a la página de ayuda para el manejo del sistema. El botón 'Cerrar Sesión' cierra la sesión del usuario que está actualmente logueado. Este tiene la misma función que el botón 'Salir' del Panel de Navegación (izquierda).
                    `} 
                    </p>
                    <Image
                        alt="end-options img"
                        src="/end-options.png" 
                        width={600} 
                        height={600}
                        priority
                        className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto py-4 border-1 rounded-md border-black/70"
                    />
                </div>
            </SectionHelpInformation>
            <SectionHelpInformation title="Caja" id="cash" >
                <p className="pb-2 text-lg">
                La pantalla está dividida en varias secciones claramente definidas, cada una con un propósito específico para el usuario. 
                </p>
                <section>
                    <h2 className="text-xl font-semibold pb-2">Barra de Navegacion Superior</h2>
                    <div className="flex flex-col items-center justify-center">
                        <Image
                            alt="nav-caja img"
                            src="/nav-caja.png" 
                            width={800} 
                            height={800}
                            priority
                            className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto py-4"
                        />
                        <ul className="py-2 [&>li]:py-6">
                            <li><span className="font-bold text-lg">Mesas:</span> Este botón, representado con un icono de mesa, sirve para mostrar la vista actual donde se pueden gestionar las mesas del establecimiento.</li>
                            <li><span className="font-bold text-lg">Pastelería:</span> Este botón, con un icono asociado a la pastelería, lleva a la sección donde se gestionan los pedidos.</li>
                            <li><span className="font-bold text-lg">Cierre:</span> Con un icono de cerradura, este botón es para finalizar el día de trabajo en el sistema.</li>
                        </ul>
                    </div>
                    <h2 className="text-xl pb-2"><span className="font-bold">Sección Central:</span> Gestión de Mesas</h2>
                    <div className="flex flex-col gap-y-3 items-center justify-center">
                        <Image
                            alt="main-caja img"
                            src="/main-caja.png" 
                            width={800} 
                            height={800}
                            priority
                            className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto py-4 border-1 rounded-md border-black/70"
                        />
                        <ul className="py-2 [&>li]:py-6">
                            <li><span className="font-bold text-lg">ICONO DE RUEDA:</span> Sirve para actualizar el estado de las mesas.</li>
                            <li><span className="font-bold text-lg">FACTURAR:</span> Permite crear una nueva orden sin necesidad de una mesa.</li>
                            <li><span className="font-bold text-lg">UBICACIÓN:</span> Bajo este encabezado, se listan las mesas disponibles en el establecimiento, enumeradas.</li>
                            <li><span className="font-bold text-lg">ESTADO:</span> Indica el estado actual de cada mesa.</li>
                            <li><span className="font-bold text-lg">ACCIONES:</span> Junto a cada mesa, hay un botón Nueva Orden que, al ser presionado, permitira al usuario ingresar una nueva orden para la mesa correspondiente.</li>
                        </ul>
                    </div>
                </section>
            </SectionHelpInformation>
            <SectionHelpInformation title="Paso a paso para crear una Orden en una Mesa" id="create-order" >
                <section>
                    <div className="pb-4">
                        <Image
                            alt="step-1 img"
                            src="/step-1.png" 
                            width={800} 
                            height={800}
                            priority
                            className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto py-4 border-1 rounded-md border-black/70 mb-2"
                        />
                        <h3 className="font-bold text-lg">Paso 1</h3>
                        <p>Seleccionar una mesa y dar clic en el boton Nueva Orden.</p>
                    </div>
                    <div>
                        <Image
                            alt="step-2 img"
                            src="/step-2.png" 
                            width={800} 
                            height={800}
                            priority
                            className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto py-4 border-1 rounded-md border-black/70 mb-2"
                        />
                        <h3 className="font-bold text-lg">Paso 2</h3>
                        <p>Seleccionar un Producto de la lista de productos que apareceran en la barra que cita: Buscar un producto... Puedes seleccionar uno o buscarlo con ayuda del auto completado</p>
                    </div>
                    <div>
                        <Image
                            alt="step-3 img"
                            src="/step-3.png" 
                            width={800} 
                            height={800}
                            priority
                            className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto py-4 border-1 rounded-md border-black/70 mb-2"
                        />
                        <h3 className="font-bold text-lg">Paso 3</h3>
                        <p>Elegir la cantidad de dicho producto seleccionado y dar clic al boton Agregar. Automaticamente sera agregado a la lista de Detalles de Ordenes de la Orden de la Mesa seleccionada</p>
                    </div>
                    <div>
                        <Image
                            alt="step-4 img"
                            src="/step-4.png" 
                            width={800} 
                            height={800}
                            priority
                            className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto py-4 border-1 rounded-md border-black/70 mb-2"
                        />
                        <h3 className="font-bold text-lg">Paso 4</h3>
                        <p>Una vez agregados todos los productos que el cliente solicito dar al boton Finalizar, automaticamente le generara la comanda y abrira una nueva pestaña donde solo tendra que imprimir dicha comanda</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Importante</h3>
                        <p>Cuando agregue un producto al Detalle de Orden podra editarlo o borrarlo en caso de ser necesario.</p>
                    </div>
                </section>
            </SectionHelpInformation>
            <SectionHelpInformation title="Cambiar Orden de Mesa" id="change-table">
                <div className="flex flex-col justify-center items-center">
                <Image
                    alt="change-table img"
                    src="/change-table.png" 
                    width={800} 
                    height={800}
                    priority
                    className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto py-4 border-1 rounded-md border-black/70 mb-2"
                />
                <p className="pb-4">Una vez que una mesa tiene una orden registrada cambiara su estado y apareceran 3 iconos reemplazando el boton Nueva Orden. Dar clic al tercer icono contando de izquierda a derecha con forma de flechas apuntando circularmente.</p>
                <p>Aparecera una ventana que te dara a elegir entre una lista de todas las mesas que estan actualmente libre. Escogue una da clic en el boton Cambiar, automaticamente te cambiara a la mesa seleccionada.</p>
                </div>
            </SectionHelpInformation>
            <SectionHelpInformation title="Facturar Orden de Mesa" id="create-invoice">
                <div className="flex flex-col justify-center items-center">
                <Image
                    alt="page-invoice img"
                    src="/page-invoice.png" 
                    width={800} 
                    height={800}
                    priority
                    className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto py-4 border-1 rounded-md border-black/70 mb-2"
                />
                <p className="pb-3">Cuando este listo para facturar tiene que darle clic al icono de en medio de la lista de 3 iconos de cada mesa. Lo dirigira a una pantalla donde vera sus detalles de ordenes sin poder modificarlos.</p>
                <p className="pb-3">A la derecha tendra una caja que lleva un boton que dice Dividir Cuenta al costado derecho del titulo. La caja contiene dos botones grandes que diferencian el tipo de cambio con el que se va a trabajar los campos monto y cambio.</p>
                <p className="pb-3">Al ingresar un numero en el campo monto Cambio automaticamente te dira cuanto falta o cuanto tienes que dar de cambio para el cliente.</p>
                <p className="pb-3">Despues tienes que elegir el metodo de pago que el cliente ha elegido acto siguiente dar clic al boton imprimir el cual te generara una nueva pestaña en la cual solo tienes que imprimir la factura</p>
                <p className="pb-3">Al regresar al sistema veras un nuevo cuadro que dice Propina lo tienes que marcar segun lo que te haya pagado el cliente. Si no pago propina no la marcas y si pago propina marcas la casilla.</p>
                <p>Una vez completado todos estos pasos puedes terminar la orden para finalizar la facturacion y cambiar el estado de la mesa.</p>
                </div>
            </SectionHelpInformation>
            <SectionHelpInformation title="Dividir Cuentas" id="divide-invoice">
                <div className="flex flex-col justify-center items-center">
                <Image
                    alt="divide-invoice img"
                    src="/divide-invoice.png" 
                    width={800} 
                    height={800}
                    priority
                    className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto py-4 border-1 rounded-md border-black/70 mb-2"
                />
                <p>Dentro de la pagina de facturacion dar clic al boton dividir orden, saldra una ventana la cual tiene que elegir los detalles de ordenes que quiere dividir en una nueva orden y ahora tendra dos ordenes las cuales tendra que seguir los pasos de <a href="#create-invoice" className="font-semibold">Facturar una Orden.</a></p>
                </div>
            </SectionHelpInformation>
            <SectionHelpInformation title="Crear Factura sin Mesa" id="create-invoiceClear">
                <div className="flex flex-col justify-center items-center">
                    <Image
                        alt="invoice img"
                        src="/invoice.png" 
                        width={800} 
                        height={800}
                        priority
                        className="object-cover flex-grow-0 flex-shrink-0 w-auto h-auto py-4 border-1 rounded-md border-black/70 mb-2"
                    />
                    <p>Al darle clic al boton Facturar nos dirigira a una pagina donde podremos hacer los mismos pasos de Crear una orden y Facturar una Orden, todo en el mismo lugar pero con la limitacion de que aqui no podremos dividir una orden en dos facturas.</p>
                </div>
            </SectionHelpInformation>
        </main>
    )
}