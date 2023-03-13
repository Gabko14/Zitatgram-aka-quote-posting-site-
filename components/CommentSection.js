import CommentForm from "@components/CommentForm";
import styles from "./CommentSection.module.css"
import {updatePost} from "@lib/api";
import {useEffect, useState} from "react";

export default function CommentSection({quoteToedit, session}) {
    const [quote, setQuote] = useState("")

    useEffect(() => {
        if (quoteToedit) {
            setQuote(quoteToedit)
        }
    }, [quoteToedit])

    return (
        <>
        <span className={styles.commentsButton} onClick={() => {
            let comments = document.getElementById("comments" + quoteToedit.id);
            comments.classList.toggle(styles.detailsOpen);
            if (document.getElementsByClassName("comment" + quoteToedit.id)) {
                let comments = document.getElementsByClassName("comment" + quoteToedit.id);
                Array.prototype.forEach.call(comments, function (comm) {
                    comm.classList.toggle(styles.visible);
                });

            }

        }}>
                <span>Comments</span> <span className={styles.commentCounter}>{quote && quote.comments.length}</span>
            </span>
            <div id={"comments" + quoteToedit.id} className={styles.details}>

                <CommentForm quoteToComment={quote} session={session}>Comment: </CommentForm>
                <div className={styles.commentSection}>
                    <ul className={styles.commentList}>

                        {
                            quote.comments && quote.comments.map(comment => {
                                return (
                                    <>
                                        <li key={comment.id}
                                            className={`${styles.details} ${styles.comment} ${"comment" + quoteToedit.id}`}>
                                            {comment.text}

                                            {session.user && session.user.id === comment.owner &&
                                                <button onClick={async () => {
                                                    let newCommentList = quote.comments

                                                    const commentIndex = newCommentList.indexOf(comment);
                                                    if (commentIndex > -1) {
                                                        newCommentList.splice(commentIndex, 1); // Removes the number which is index out of the array
                                                    }
                                                    const newQuote = {...quote, comments: newCommentList}
                                                    try {
                                                        await updatePost(newQuote, session.accessToken)
                                                        setQuote(newQuote)
                                                    } catch (e) {
                                                        console.log(e)
                                                    }

                                                }}>Delete</button>}
                                        </li>
                                    </>
                                )
                            })}

                    </ul>
                </div>
            </div>
        </>
    )
}
