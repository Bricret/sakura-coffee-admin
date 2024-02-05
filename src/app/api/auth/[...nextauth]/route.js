import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '../../../lib/db'
import { ComparePass } from "@/app/plugins/incript/argon2";
import { FetchUnicRols } from "@/app/lib/data";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {

        let userFind = null
        // Comprobar si la conexion a la base de datos esta activa
        try {
            userFind = await prisma.users.findFirst({
            where: {
                name: credentials.username
            }
        })
        } catch (error) {
          throw new Error('Error en la conexion a la base de datos')
        }

        // Comprobar si el usuario existe y esta activo
        if (!userFind) throw new Error('Usuario no encontrado, verifique sus credenciales')
        if ( !userFind.status ) throw new Error('Usuario inactivo, contacte con el administrador')

        // Comprobar si la contraseña es correcta
        const verifyPass = await ComparePass(credentials.password, userFind.password)
        if ( !verifyPass ) throw new Error('Contraseña incorrecta, verifique sus credenciales')
        
        // Conseguir el rol del usuario

        const rol = await FetchUnicRols(userFind.rol_id);

        return {  
            name: userFind.name,
            email: userFind.status,
            image: rol.nombre,
        }

      },
      
    }),
  ],
  pages: {
    signIn: '/'
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


