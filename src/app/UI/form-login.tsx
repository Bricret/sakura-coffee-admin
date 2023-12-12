import Image from "next/image";
import { fonts } from "./Fonts";



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
      <form className="space-y-4">
        <div className="space-y-2">
          <label
            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${fonts.merriweather.className}`}
            htmlFor="nickname"
          >
            Usuario
          </label>
          <input
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            id="nickname"
            placeholder="Sakura"
            required
            type="nickname"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <label
              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${fonts.merriweather.className}`}
              htmlFor="password"
            >
              contraseña
            </label>
          </div>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="password"
            required
            type="password"
            placeholder="********"
          />
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