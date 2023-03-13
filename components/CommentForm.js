import {createPost, updatePost} from "@lib/api"
import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import styles from "./CommentForm.module.css"

const defaultModel = {
    text: "",
    author: "",
    postedBy: 0,
    favoritedBy: [],
    comments: []
}



export default function CommentForm({session, quoteToComment: quoteToComment, children}) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState(defaultModel)
    const [quote, setQuote] = useState(defaultModel)
    const [text, setText] = useState("")

    useEffect(() => {
        if (quoteToComment) {
            setQuote(quoteToComment)
        }
    }, [quoteToComment])

    const handleChange = (e) => {
        const value = e.target.value
        setText(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (text.length < 1 || !text) {
            setErrors({text: "Your Comment is too short"})
            setIsLoading(false)
            return
        }

        if (session.user) {
            quote.comments.push({
                    text: text,
                    owner: session.user.id
                }
            )

            try {
                await updatePost(quote, session.accessToken)
                router.reload()

            } catch (e) {
                alert("Could not create Comment")
                console.log(e)
            }
            setIsLoading(false)
        } else {
            errors.text = "Du musst eingelogt sein um Kommentare zu machen"
        }
    }

    return (
        <div>
            <form className={styles.commentForm} onSubmit={handleSubmit}>
                <fieldset className={styles.fieldSetForm}>
                    <label>{children}</label>
                    <input type={"text"} name="text" onChange={handleChange} value={text}/>
                    <button className={styles.commentButton} disabled={isLoading}>
                        {isLoading ? "...Loading" : "Post"}
                    </button>
                    {errors.text && <div className={styles.error}>{errors.text}</div>}
                </fieldset>

            </form>
        </div>
    )
}