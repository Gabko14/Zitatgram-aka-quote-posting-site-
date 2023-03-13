import { useRedirectToLogin } from "../lib/session"
import QuoteForm from "../components/QuoteForm";

export default function Create({ session }) {
    useRedirectToLogin(session)
    return (
        <>
            <h1>Create Page</h1>
            <QuoteForm session={session} ></QuoteForm>
        </>
    )
}