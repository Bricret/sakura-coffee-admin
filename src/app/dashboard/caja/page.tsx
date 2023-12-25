import NavBar from "@/app/UI/dashboard/nav-bar";
import { Metadata } from "next"
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Caja | Sakura Coffee Shop',
  };

export default function CashPage() {
    return (
        <>
            <h1>Hola soy la caja</h1>
        </>
    )
}