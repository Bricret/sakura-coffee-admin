import Image from "next/image";
import FormLogin from "./UI/auth/login/form-login";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {

  // ! Codigo para bloquear la ruta si el usuario esta logueado
  const session = await getServerSession(authOptions);
  if(session) {
    redirect('/dashboard');
  }

  return (
    <div>
      <main className="lg:grid lg:grid-cols-[500px,1fr] h-full bg-primary">
        <article className="hidden items-center justify-center h-full lg:block">
          <Image
            src="/Carrusel/2.jpg"
            alt="Coffee Shop Image 1"
            className="h-screen object-cover w-auto"
            width="500"
            height="500"
            priority
          />
        </article>
        <article className="flex items-center justify-center h-screen overflow-auto py-9 px-12 lg:p-0">
          <div className="mx-auto w-[350px] space-y-6 h-auto">
            <div className="flex flex-col items-center space-y-2 h-full">
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
            <FormLogin />
          </div>
        </article>
      </main>
    </div>
  )
}
