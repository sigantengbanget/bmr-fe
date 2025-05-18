import { authOptions } from "@/lib/auth"
import NextAuth from "next-auth"

const handler = NextAuth({
    ...authOptions,
    session: {
        strategy: "jwt" as const
    }
})
export { handler as GET, handler as POST }
