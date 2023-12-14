import { createUser } from "@/app/lib/actions";
import { fonts } from "../../Fonts";
import { Button } from "../button";


export default function RegisterForm() {



  return (
    <section className="container mx-auto ">
        <article className="flex flex-col lg:flex-row  w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg              overflow-hidden">   
            <section 
                className="w-full lg:w-1/2 text-black flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center relative "
                style={{backgroundImage: 'url(/sideImage.jpg)'}}    
            >
                <div className="bg-white/80 p-2 rounded-lg text-center cursor-default">
                    <h1 className={`${ fonts.merriweather.className } text-3xl font-bold text-third`}>
                        Bienvenido
                    </h1>
                    <p>Buenos amigos, buen café y buenos tiempos.</p>
                </div>
            </section>
            <section className="w-full lg:w-1/2 py-16 px-12">
                <h2 className={`${fonts.merriweather.className} text-2xl mb-4 cursor-default`}>Registrar <span className="text-secundary ">Usuario</span></h2>
                <p className="mb-4 text-zinc-600 cursor-default">Complete todos los campos</p>
                <form action={createUser}>
                    <div className="my-5 ">
                        <input
                            id="username"
                            name="username"
                            type="text" 
                            placeholder="Nombre" 
                            className="border border-gray-400 py-1 px-2 w-full mb-4" 
                            required
                        />
                        <input
                            id="password"
                            name="password" 
                            type="password" 
                            placeholder="Contraseña" 
                            className="border border-gray-400 py-1 px-2 w-full mb-4"
                            required
                        />
                        <select 
                            name="selectRol"
                            id="selectRol" 
                            defaultValue={1}
                            className="border border-gray-400 py-1 px-2 w-full mb-4 cursor-pointer"
                            required
                        >
                            <option value={1}>Administrador</option>
                            <option value={2}>Mesero</option>
                        </select>
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