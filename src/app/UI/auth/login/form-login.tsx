import Image from "next/image";
import { fonts } from "../../Fonts";
import { Icons } from "../../../plugins/Icons";
import { Button } from "../button";
import { Input } from "@nextui-org/react";


const { UserIcon, PasswordIcon } = Icons;

export default function FormLogin() {
  return (
    <main className="lg:grid lg:grid-cols-[500px,1fr] max-h-screen bg-primary">
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
        <p className="text-secundary hidden lg:block">Ingresa tus credenciales para poder acceder</p>
      </div>
      <form className=""> 
          {/* Input UserName */}
          <label htmlFor="nickname" className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${fonts.merriweather.className}`}>
            Nombre de usuario
          </label>
          <Input
          type="nickname"
          placeholder="Sakura"
          labelPlacement="outside"
          className="my-2"
          startContent={
            <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 h-4 w-4" />
          }
        />
        {/* Input Password */}
        <label htmlFor="password" className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${fonts.merriweather.className}`}>
          Contraseña
          </label>
          <Input
            type="password"
            placeholder="**********"
            labelPlacement="outside"
            className="mt-2 mb-6"
            startContent={
              <PasswordIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 h-4 w-4" />
          }
          />
        <Button>
          Iniciar Sesion
        </Button>
      </form>
    </div>
  </article>
</main>
    )
}