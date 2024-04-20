import { NextAuthOptions } from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials"
// import { PrismaAdapter } from "NextAuth/prisma-adapter"
import { PrismaAdapter } from "@auth/prisma-adapter"
import db from './db'
import { compare } from "bcrypt"
import { NextResponse } from "next/server"
import { json } from "stream/consumers"





export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret:process.env.NEXTAUTH_SECRET,
  session:{
    strategy: 'jwt'
  },
    pages: {
        signIn: "/auth/login",
      },
   
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          credentials: {
            phoneNumber: { label: "Username", type: "number", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            // const pNumber = parseInt(credentials?.pNumber)
      
            if (!credentials?.phoneNumber || !credentials?.password) {
              return null
            } 
          

            const existingUser = await db.user.findUnique({
              where:{phoneNumber: parseInt(credentials?.phoneNumber)}
            })

            if (!existingUser) {
              return null
            }
            // console.log(existingUser)
            // console.log(credentials?.password)
            const passwordMatch = compare(credentials.password , existingUser.password)
            // if (!passwordMatch) {
            //   console.log('password wont match')
            //   return null
            const passwords  = await compare(credentials.password, existingUser.password)
            // }
            // console.log(passwords)
            if (!passwords) {
              return null
            }
           
           
            return {
              id: `${existingUser.id}`,
              name: `${existingUser.firstName} ${existingUser.lastName}`,
              phoneNumber: `${existingUser.phoneNumber}`,
              role: existingUser.role,
              active:existingUser.active,
            }
            },
          
        })
      ],
      callbacks:{
        async jwt({token , user}){
          if (user) {
            return {
              ...token,
              phoneNumber: user.phoneNumber,
              role: user.role,
              id: user.id,
              active: user.active
            }
          }
          return token
          // return token
        },
        async session({session, token}){
        // console.log(token)
          return {
            ...session,
            phoneNumber: token.phoneNumber,
            role: token.role,
            id: token.id,
            active: token.active
          
          }
        }
      }
}