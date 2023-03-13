import styles from "./FavoritedQuotesList.module.css"
import {useEffect, useState} from "react";
import {getAllPosts} from "@lib/api";
import QuoteForm from "@components/QuoteForm";

export default function FavoritedQuotesList({session}) {
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
                                quote.favoritedBy.includes(session.user.id) ?
                                    <li key={quote.id}>
                                        <div className={styles.quote}>
                                            {quote.text}
                                            <br/>
                                            ~~{quote.author}
                                        </div>
                                        {
                                            <div id={`edit` + quote.id} className={styles.form}>
                                                <QuoteForm quoteToEdit={quote} session={session}></QuoteForm>
                                            </div>
                                        }
                                    </li>
                                    : <></>
                            ))
                            : <></>
                    }

            </ul>
        )
    }
}