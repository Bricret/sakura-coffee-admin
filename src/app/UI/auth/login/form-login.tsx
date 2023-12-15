'use client';

import { fonts } from "../../Fonts";
import { Icons } from "../../../plugins/Icons";
import { Button } from "../button";
import { Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { LoginUserSchema } from "@/app/plugins/zod";


const { UserIcon, PasswordIcon } = Icons;

export default function FormLogin() {

  async function GetForm( formData: FormData ) {
    const { username, password } = LoginUserSchema.parse({
      username: formData.get('nickname'),
      password: formData.get('password')
    });
    const res = await signIn('credentials', { 
      username, 
      password, 
      redirect: false 
    });
    console.log(res);

}


  return (
    
      <form action={GetForm}> 
          {/* Input UserName */}
          <label htmlFor="nickname" className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${fonts.merriweather.className}`}>
            Nombre de usuario
          </label>
          <Input
          name="nickname"
          id="nickname"
          type="text"
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
            name="password"
            id="password"
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
    )
}