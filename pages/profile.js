import styles from "./profile.module.css"
import {useRedirectToLogin} from "../lib/session";
import MyQuotesList from "../components/MyQuotesList";
import FavoritedQuotesList from "../components/FavoritedQuotesList";

export default function Profile({session}) {
    useRedirectToLogin(session)
    function logout() {
        session.logout()
    }
    return (
        <>
        <div className={styles.profileData}>
            <h1>Profile</h1>
            <div>Username: {session.user ? session.user.name : <p>Loading....</p>}</div>
            <div>Email: {session.user ? session.user.email : <p>Loading....</p>}</div>
            <p>Password: *********</p>
            <button onClick={logout} className={styles.button} >logout
            </button>
        </div>
            <div>
                <details className={styles.collapsibles}>
                    <summary className={styles.summary}>
                        My Quotes
                    </summary>
                    <p>
                        <MyQuotesList session={session} ></MyQuotesList>
                    </p>
                </details>

                <details className={styles.collapsibles}>
                    <summary className={styles.summary}>
                        Favorited Quotes
                    </summary>
                    <p>
                        <FavoritedQuotesList session={session} ></FavoritedQuotesList>
                    </p>
                </details>

            </div>

        </>
    )
}