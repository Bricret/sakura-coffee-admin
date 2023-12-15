import { ErrorToast, SuccessToast } from "@/app/plugins/sonner";
import { LoginUserSchema } from "@/app/plugins/zod";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function HandlerVerify(formData : any) {
    const { username, password } = LoginUserSchema.parse({
        username: formData.get('nickname'),
        password: formData.get('password')
      });
    
      if( !username || !password ) return ErrorToast('Los campos no pueden estar vacios');
    
      const res = await signIn('credentials', { 
        username, 
        password, 
        redirect: false 
      });
    
      if( res?.error ) {
        ErrorToast(res.error);
      } else {
        SuccessToast(`Bienvenido ${username}`);
        redirect('/dashboard');
      }
}