import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import { getSession, useSession } from "next-auth/react"
import { Session, SessionOptions } from "next-auth"

export async function getServerSideProps(context: any) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (!session) {
        return {
            redirect: { destination: "/login", permanent: false }
        }
    }
    return {
        props: { auth: session.user?.name }
    }

}

export default function ServerSideAuth(session: Session) {
    if (session) {
        return (
            <>
                <h1>Protected Page</h1>
                <p>You can view this page because you are signed in.</p>
            </>
        )
    }
    return <p>Access Denied - should have redirected</p>
}
