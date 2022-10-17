import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"

export async function getServerSideProps(context: any) {
    const session = await unstable_getServerSession(
        context.req, context.res, authOptions)

    if (session) {
        return {
            props: { username: session?.user?.name }
        }
    }
    return {
        redirect: { destination: "/", permanent: false }
    }
}

export default function ServerSideAuth(username: string) {
    return (
        <>
            <h1>Protected Page</h1>
            <p>You can view this page because you are signed in as {username}</p>
        </>
    )
}