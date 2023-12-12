import { fonts } from "../../Fonts";
import { Button } from "../button";


export default function RegisterForm() {
  return (
    <section className="container mx-auto ">
        <article className="flex flex-col lg:flex-row  w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <section 
                className="w-full lg:w-1/2 text-black flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center relative "
                style={{backgroundImage: 'url(/sideImage.jpg)'}}    
            >
                
                <div className="bg-white/60 p-2 rounded-lg">
                    <h1 className={`${ fonts.merriweather.className } text-3xl font-bold`}>Bienvenido al <span className="text-third">registro</span></h1>
                    <p>Buenos amigos, buen café y buenos tiempos.</p>
                </div>
            </section>
            <section className="w-full lg:w-1/2 py-16 px-12">
                <h2 className={`${fonts.merriweather.className} text-2xl mb-4`}>Registrar <span className="text-secundary">Usuario</span></h2>
                <p className="mb-4 text-zinc-600">Ingrese los datos del nuevo usuario</p>
                <form>
                    <div className="my-5 ">
                        <input type="text" placeholder="Nombre de usuario" className="border border-gray-400 py-1 px-2 w-full mb-4" />
                        <input type="password" placeholder="Contraseña" className="border border-gray-400 py-1 px-2 w-full mb-4" />
                        <select name="selectRol" id="selectRol" className="border border-gray-400 py-1 px-2 w-full mb-4">
                            <option value="" disabled selected>Selecciona un rol</option>
                            <option value="1">Administrador</option>
                            <option value="2">Mesero</option>
                        </select>
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-base text-gray-900 font-bold">Activo</span>
                        </label>
                    </div>
                    <div className="mt-5">
                        <Button>Registrar</Button>
                    </div>
                </form>
            </section>
        </article>
    </section>
  )
}