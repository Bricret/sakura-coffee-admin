import RegisterForm from "../UI/auth/register/form-register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Registro | Sakura Coffee Shop',
};

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