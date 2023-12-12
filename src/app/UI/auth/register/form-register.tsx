

export default function RegisterForm() {
  return (
    <main className="bg-fourth p-6">
        <h1 className="text-3xl text-center">Register</h1>
        <form className="flex flex-col">
            <label htmlFor="username">Nombre de usuario</label>
            <input type="text" name="username" id="username" />
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" id="password" />
            <label htmlFor="repeatPass">Confirmar contraseña</label>
            <input type="password" name="repeatPass" id="repeatPass" />

        </form>
    </main>
  )
}