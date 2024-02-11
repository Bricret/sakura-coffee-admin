import OptionsSideNav from "./Options-SideNav";


export default function SideNavHelp() {

    return (
        <article className={`flex h-full flex-col px-3 py-4 md:px-2 overflow-y-auto border-0 md:border-r-2 border-secundary/30 bg-primary drop-shadow-2xl`}>
        <section className="flex flex-col justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <OptionsSideNav title="Introducción" refSection="#top">
            <li><a className="hover:text-black transition-colors duration-300" href="#dashboard">Dashboard</a></li>
            <li><a className="hover:text-black transition-colors duration-300" href="#sidebar">{"Panel de Navegacion (Izquierda)"}</a></li>
            <li><a className="hover:text-black transition-colors duration-300" href="#navbar">{"Panel de Navegacion (Superior)"}</a></li>
          </OptionsSideNav>
          <OptionsSideNav title="Aciones por Usuario" refSection="#user-options">
            <li><a className="hover:text-black transition-colors duration-300" href="#create-user">Crear Usuario</a></li>
            <li><a className="hover:text-black transition-colors duration-300" href="#edit-user">Editar Usuario</a></li>
            <li><a className="hover:text-black transition-colors duration-300" href="#agree-table">Agregar Mesa</a></li>
            <li><a className="hover:text-black transition-colors duration-300" href="#update-table">Actualizar Mesa</a></li>
            <li><a className="hover:text-black transition-colors duration-300" href="#last-options">Ayuda y Cerrar Sesion</a></li>
          </OptionsSideNav>
          <OptionsSideNav title="Caja" refSection="#cash">
            <li><a className="hover:text-black transition-colors duration-300" href="#create-order">Crear Orden en una Mesa</a></li>
            <li><a className="hover:text-black transition-colors duration-300" href="#change-table">Cambiar Orden de Mesa</a></li>
            <li><a className="hover:text-black transition-colors duration-300" href="#create-invoice">Facturar Orden de Mesa</a></li>
            <li><a className="hover:text-black transition-colors duration-300" href="#divide-invoice">Dividir Cuentas</a></li>
            <li><a className="hover:text-black transition-colors duration-300" href="#create-invoiceClear">Crear Factura sin Mesa</a></li>
          </OptionsSideNav>
        </section>
      </article>
    )
}