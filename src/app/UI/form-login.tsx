import Image from "next/image";
import { fonts } from "./Fonts";
import { Icons } from "../plugins/Icons";


const { UserIcon, PasswordIcon } = Icons;


export default function FormLogin() {
  return (
    <main className="lg:grid lg:grid-cols-[500px,1fr] max-h-screen bg-[#f4dcc0]">
      <article className="hidden items-center justify-center h-screen lg:block">
        <Image
          src="/Carrusel/2.jpg"
          alt="Coffee Shop Image 1"
          className="h-screen object-cover"
          width="500"
          height="500"
          priority
        />
      </article>
    <article className="flex items-center justify-center h-screen  py-9 px-12 lg:p-0">
    <div className="mx-auto w-[350px] space-y-6">
      <div className="flex flex-col items-center space-y-2">
        <Image
            src="/logo.png"
            alt="Coffee Shop Logo"
            className="object-cover mb-4"
            width="200"
            height="200"
            style={{ height: "auto", width: "auto" }}
            priority
        />
        <h1 className="text-3xl font-bold hidden lg:block">Inicia Sesion</h1>
        <p className="text-[#a88165] hidden lg:block">Ingresa tus credenciales para poder acceder</p>
      </div>
      <form className=""> 
          {/* Input UserName */}
          <label htmlFor="nickname" className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${fonts.merriweather.className}`}>
            Nombre de usuario
          </label>
          <div className="relative flex mt-2 mb-4">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Nombre de usuario"
            id="nickname"
          />
          <UserIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        {/* Input Password */}
        <label htmlFor="password" className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${fonts.merriweather.className}`}>
          Contraseña
          </label>
          <div className="relative flex mt-2 mb-6">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder="**************"
            id="password"
          />
          <PasswordIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        <button
          className={`rounded-md text-center h-10 px-4 py-2 w-full bg-[#3b2323] text-white font-bold hover:bg-[#a88165] transition duration-300 ease-in-out ${fonts.merriweather.className}`}
          type="submit"
        >
          Iniciar Sesion
        </button>
      </form>
    </div>
  </article>
</main>
    )
}