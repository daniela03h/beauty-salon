import { ILoginRequest } from "@/app/core/application/dto";
import { AuthService } from "@/app/infrastructure/services/auth.services";

import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
interface AuthToken {
  id?: string;
  token?: string;
}
interface AuthUser {
  id: string;
  name: string;
  email: string;
  token: string;
}
interface CustomSession extends Session {
  user: {
    id?: string;
    token?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Correo Electrónico", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.password || !credentials.username){
                console.error("Credenciales faltantes")
            return null
        } 
        const loginRequest: ILoginRequest =  {
            password: credentials.password,
            userName: credentials.username
        }
        try {
            const authService = new AuthService()
            const response = await authService.login(loginRequest)
            return {
                email: loginRequest.userName,
                id:  loginRequest.userName,
                name: loginRequest.userName,
                token: response.token
            } as AuthUser
            
        } catch (error) {
            console.log(error)
            return Promise.reject(new Error(JSON.stringify(error)))
        }
        
      },
    }),
    
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as AuthUser;
        token.id = authUser.id;
        token.token = authUser.token;
      }
      return token;
    },
    async session({ session, token }) {
      const customSession = session as CustomSession;
      customSession.user.id = (token as AuthToken).id;
      customSession.user.token = (token as AuthToken).token;
      return customSession;
    },
  },
};
export default NextAuth(authOptions);
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);