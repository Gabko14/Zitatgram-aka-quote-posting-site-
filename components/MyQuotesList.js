import styles from "./MyQuotesList.module.css"
import {useEffect, useState} from "react";
import {deletePost, getAllPosts} from "@lib/api";
import QuoteForm from "@components/QuoteForm";

export default function MyQuotesList({session}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [quotes, setQuotes] = useState([]);
    const [users, setUsers] = useState([]);
    const [reloadMyQuotes, setReloadMyQuotes] = useState(false);

    useEffect(() => {
        const loadPosts = async () => {
            try {

                const quotes = await getAllPosts()
                setQuotes(quotes)
                setIsLoaded(true)
            } catch (e) {
                alert("Could not load posts!")
            }
        }
        loadPosts()
    }, [])
    useEffect(() => {
        const loadPosts = async () => {
            try {

                const quotes = await getAllPosts()
                setQuotes(quotes)
                setIsLoaded(true)
            } catch (e) {
                alert("Could not load posts!")
            }
        }
        loadPosts()
    }, [reloadMyQuotes])

function toggleButtonsVisibility(id) {
    let button1 = document.getElementById("deleteButton" + id);
    let button2 = document.getElementById("acceptButton" + id);
    let button3 = document.getElementById("cancelButton" + id);
    button1.classList.toggle(styles.visibleButton);
    button2.classList.toggle(styles.visibleButton);
    button3.classList.toggle(styles.visibleButton);
}

    if (!isLoaded) {
        return <></>;
    } else {

        return (
            <ul className={styles.quotesList}>
                    {
                        session.user ?
                            quotes.map(quote => (
                                quote.postedBy === session.user.id ?
                                    <li key={quote.id}>
                                        <div className={styles.quote}>
                                            {quote.text}
                                            <br/>
                                            ~~{quote.author}
                                            <br/>
                                            Favorites: {quote.favoritedBy.length}
                                            <button onClick={() => {
                                                let editForm = document.getElementById("edit" + quote.id);
                                                editForm.classList.toggle(styles.visibleForm);
                                            }}>Edit
                                            </button>
                                            <button id={"deleteButton" + quote.id} className={`${styles.visibleButton} ${styles.button}`} onClick={async () => {
                                                toggleButtonsVisibility(quote.id)
                                            }}>Delete
                                            </button>
                                            <button id={"cancelButton" + quote.id} className={`${styles.button} ${styles.cancelButton}`} onClick={async () => {
                                                toggleButtonsVisibility(quote.id)

                                            }}>Cancel
                                            </button>
                                            <button id={"acceptButton" + quote.id} className={`${styles.button} ${styles.acceptButton}`} onClick={async () => {
                                                toggleButtonsVisibility(quote.id)
                                                try {
                                                    await deletePost(quote.id, session.accessToken)
                                                    setReloadMyQuotes(!reloadMyQuotes)
                                                } catch (e) {
                                                    console.log(e)
                                                    alert("Could not delete quote")
                                                }
                                            }}>Accept
                                            </button>
                                        </div>
                                        {
                                            <div id={`edit` + quote.id} className={styles.form}>
                                                <QuoteForm quoteToEdit={quote} session={session}></QuoteForm>
                                            </div>
                                        }
                                    </li>
                                    : <div></div>
                            ))
                            : <></>
                    }

            </ul>
        )
    }
}