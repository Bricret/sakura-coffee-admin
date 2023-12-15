import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '../../../lib/db'
import { ComparePass } from "@/app/plugins/incript/argon2";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {

        const userFind = await prisma.users.findFirst({
            where: {
                name: credentials.username
            }
        })
        if (!userFind) throw new Error('Usuario no encontrado, verifique sus credenciales')

        const verifyPass = await ComparePass(credentials.password, userFind.password)

        
        if ( !verifyPass ) throw new Error('Contraseña incorrecta, verifique sus credenciales')
        
        if ( !userFind.status ) throw new Error('Usuario inactivo, contacte con el administrador')

        return {
            id: userFind.id,
            name: userFind.name,
            status: userFind.status,
            rol_id: userFind.role_id,
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


