import { Header } from './header'
import { getPayloadSession } from 'payload-authjs'

export async function AuthHeader() {
  const session = await getPayloadSession()

  const user = session?.user
    ? {
        email: session.user.email ?? null,
        name: session.user.name ?? null,
        image: session.user.image ?? null,
      }
    : null

  return <Header user={user} />
}
