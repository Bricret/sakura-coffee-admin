import nextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                nickname: { label: 'Nickname', type: 'text', placeholder: 'Sakura' },
                password: { label: 'Password', type: 'password' }
            },
            authorize(credentials, req) {
                console.log(credentials);
                return null;
            },
        }),
    ],
};

const handler = nextAuth( authOptions );

export { handler as GET, handler as POST }