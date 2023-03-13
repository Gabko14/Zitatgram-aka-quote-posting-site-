import styles from "./QuotesList.module.css"
import {useEffect, useState} from "react";
import {getAllPosts, updatePost} from "@lib/api";
import {useRouter} from "next/router";
import CommentSection from "@components/CommentSection";

export default function QuotesList({session}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const router = useRouter()
    useEffect(() => {
        loadPosts()
    }, [])


    const loadPosts = async () => {
        try {

            const quotes = await getAllPosts()
            //Sorts the posts so the most liked is at the top
            quotes.sort((a, b) => {
                const postALikes = a.favoritedBy.length
                const postBLikes = b.favoritedBy.length
                if (postALikes > postBLikes) {
                    return -1;
                }
                if (postALikes < postBLikes) {
                    return 1;
                }
                // names must be equal
                return 0;
            })
            setItems(quotes)
            await setItems(quotes)
            setIsLoaded(true)

        } catch (e) {
            alert("Could not load posts!")
        }
    }


    if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (<ul className={styles.quotesList}>
            {items.map(item => (<li key={item.id}>
                {item.text}
                <br/>
                <div className={styles.authorLine}>

                    ~~{item.author}
                    <div>
                        <p className={styles.likeCount}>{item.favoritedBy.length}</p>
                        <button id={"star" + item.id}
                                className={`${styles.star} ${session.user ? item.favoritedBy.includes(session.user.id) ? styles.filled : "" : ""}`}
                                onClick={async () => {
                                    if (session.ready && !session.user) {
                                        router.push("/login")
                                        return
                                    }
                                    let star = document.getElementById("star" + item.id);
                                    if (!item.favoritedBy.includes(session.user.id)) {
                                        const newFavoritesList = item.favoritedBy
                                        newFavoritesList.push(session.user.id)
                                        const newQuote = {...item, favoritedBy: newFavoritesList}
                                        try {
                                            await updatePost(newQuote, session.accessToken)
                                            star.classList.toggle(styles.filled);
                                            loadPosts() //loading the new posts (which have a like more) so it changes
                                        } catch (e) {
                                            console.log(e)
                                        }
                                    } else {
                                        let newList = item.favoritedBy

                                        const index = newList.indexOf(session.user.id);
                                        if (index > -1) {
                                            newList.splice(index, 1); // Removes the number which is index out of the array
                                        }
                                        const newItem = {...item, favoritedBy: newList}
                                        try {
                                            await updatePost(newItem, session.accessToken)
                                            star.classList.toggle(styles.filled);
                                            loadPosts() //loading the new posts (which have a like less) so it changes
                                        } catch (e) {
                                            console.log(e)
                                        }
                                    }

                                }}>
                        </button>
                    </div>
                </div>
                    <CommentSection quoteToedit={item} session={session}/>
            </li>))}
        </ul>)
    }
}