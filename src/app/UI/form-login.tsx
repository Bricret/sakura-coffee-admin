import Image from "next/image";



export default function FormLogin() {
  return (
    <main className="lg:grid lg:grid-cols-2">
  <article className="flex items-center justify-center lg:block h-screen">
      <div className="image-container">
        <Image
          src="/Carrusel/3.jpg"
          alt="Coffee Shop Image 1"
          className="h-screen w-full object-cover"
          width="500"
          height="500"
          priority
        />
    </div>
  </article>
  <article className="flex items-center justify-center p-12">
    <div className="mx-auto w-[350px] space-y-6">
      <div className="flex flex-col items-center space-y-2">
        <Image
            src="/logo.jpg"
            alt="Coffee Shop Logo"
            className="object-cover mb-4"
            width="200"
            height="200"
            priority
        />
        <h1 className="text-3xl font-bold">Inicia Sesion</h1>
        <p className="text-gray-500 dark:text-gray-400">Ingresa tus credenciales para poder acceder</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="email"
          >
            Usuario
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="email"
            placeholder="Sakura"
            required
            type="text"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          type="submit"
        >
          Login
        </button>
      </div>
    </div>
  </article>
</main>
    )
}