import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions as any)
  if (!session) {
    redirect('/login')
  }else{
    redirect('/dashboard')
  }
}