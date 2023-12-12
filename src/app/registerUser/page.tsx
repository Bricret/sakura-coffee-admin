import RegisterForm from "../UI/auth/register/form-register";

export default function RegisterPage() {
  return (
    <main 
      className=" h-screen py-28"
      style={{backgroundImage: 'linear-gradient(115deg, #a88165, #efd1bb)'}}
    >
        <RegisterForm />
    </main>
  )
}