import { createPost, updatePost } from "@lib/api"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./QuoteForm.module.css"

const defaultModel = {
    text: "",
    author: "",
    postedBy: 0,
    favoritedBy: [],
    comments: []
}

function validateModel(quote) {
    const errors = {
        // title: "",
        text: ""
    }
    let isValid = true

    if (quote.author.trim().length === 0) {
        errors.title = "Title cant't be empty"
        isValid = false
    }

    if (quote.text.trim().length === 0) {
        errors.text = "Text cant't be empty"
        isValid = false
    }

    return { errors, isValid }
}

export default function QuoteForm({ session, quoteToEdit: quoteToEdit }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState(defaultModel)
    const [post, setPost] = useState(defaultModel)

    useEffect(() => {
        if (quoteToEdit) {
            setPost(quoteToEdit)
        }
    }, [quoteToEdit])

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        post.postedBy = session.user.id
        setPost({
            ...post,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors(defaultModel)

        const result = validateModel(post)

        if (!result.isValid) {
            setErrors(result.errors)
            setIsLoading(false)
            return
        }

        if (post.id) {
            try {
                await updatePost(post, session.accessToken)
                router.reload()
            } catch (e) {
                alert("Could not update post")
            }
        } else {
            try {
                const newPost = await createPost(post, session.accessToken)
                router.push(`/`)
            } catch (e) {
                alert("Could not create post")
            }
        }
        setIsLoading(false)
    }

    return (
        <div className={styles.postform}>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>Quote:</label>
                    <textarea name="text" onChange={handleChange} value={post.text} />
                    {errors.text && <div className={styles.error}>{errors.text}</div>}
                </fieldset>
                <fieldset>
                    <label>Author:</label>
                    <input type={"text"} name="author" onChange={handleChange} value={post.author} />
                    {errors.text && <div className={styles.error}>{errors.text}</div>}
                </fieldset>


                <button disabled={isLoading}>
                    {isLoading ? "...Loading" : "Submit"}
                </button>
            </form>
        </div>
    )
}