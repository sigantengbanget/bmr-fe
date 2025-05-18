import LoginForm from "@/components/form/login-form";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
      const session = await getServerSession(authOptions as any);
      if(session){
        redirect('/dashbaord')
      }
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
          <LoginForm/>
      </div>
    );
}