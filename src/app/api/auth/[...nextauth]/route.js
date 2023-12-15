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
        if (!userFind) return null

        const verifyPass = await ComparePass(credentials.password, userFind.password)

        
        if ( !verifyPass ) return null
        
        if ( !userFind.status ) return null

        return {
            id: userFind.id,
            name: userFind.name,
            status: userFind.status,
            rol_id: userFind.role_id,
        }

      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };





// if (!userFound) throw new Error('No user found')

        // console.log(userFound)

        // const matchPassword = await ComparePass(credentials.password, userFound.password)

        // if (!matchPassword) return null

        // return {
        //     id: userFound.id,
        //     name: userFound.name,
        //     status: userFound.status,
        //     rol_id: userFound.role_id,
        
        // }