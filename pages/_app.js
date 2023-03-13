import Header from "../components/Header"
import useSession from "../lib/session"
import Link from "next/link"
import "./_app.css"

export default function App({ Component, pageProps }) {
    const session = useSession()
    const newPageProps = {
        ...pageProps,
        session
    }
    return (
        <>
            <Header>
            </Header>

            <main className="page">
                <Component {...newPageProps} />
            </main>
        </>
    )
}