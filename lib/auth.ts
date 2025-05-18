import axios from "axios"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                        email: credentials?.email,
                        password: credentials?.password,
                    })

                    if (res.status === 200) {
                        const data = res.data
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            role: data.user.role,
                            accessToken: data.token,
                        }
                    }

                    return null
                } catch (error) {
                    return null
                }
            }

        })
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.role = user.role
                token.accessToken = user.accessToken
            }
            return token
        },
        async session({ session, token }: { session: any, token: any }) {
            session.user = {
                id: token.id,
                email: token.email,
                role: token.role,
            }
            session.accessToken = token.accessToken
            return session
        }    },
    secret: process.env.NEXTAUTH_SECRET,
}
