import { Metadata } from "next";
import { Suspense } from "react";
import MainComponent from "../UI/auth/Main-Component";

export const metadata: Metadata = {
  title: 'Registro | Sakura Coffee Shop',
};

export default async function RegisterPage() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainComponent title="Registrar Nuevo" edit={false} />
    </Suspense>  
  )
}