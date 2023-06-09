import {login, register} from "../lib/api"
import { useRedirectToHome } from "../lib/session"
import { useRouter } from "next/router"
import { useState } from "react"
import styles from "./login.module.css"

const defaultModel = {
    email: "",
    password: ""
}

function validateModel(model) {
    const errors = {
        email: "",
        password: "",
        confirmPassword: ""
    }
    let isValid = true

    if (model.email.trim().length === 0 || !model.email.includes("@") || !model.email.includes(".")) {
        errors.email = "Email can't be empty and must be valid email"
        isValid = false;
    }

    if (model.password.trim().length === 0 || model.password.length < 8) {
        errors.password = "Password can't be empty and must be at least 8 characters long"
        isValid = false;
    }
    if (model.password.trim() !== model.confirmPassword.trim()) {
        errors.password = "Confirmation Password isnt the same"
        isValid = false;
    }

    return { errors, isValid }
}

export default function LoginPage({ session }) {
    useRedirectToHome(session)

    const router = useRouter()
    const [errors, setErrors] = useState(defaultModel)
    const [isLoading, setIsLoading] = useState(false)
    const [model, setModel] = useState(defaultModel)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value?.trim()

        setModel({
            ...model,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors(defaultModel)

        const result = validateModel(model)

        if (!result.isValid) {
            setErrors(result.errors)
            setIsLoading(false)
            return
        }

        try {
            const resp = await register(model)
            session.login(resp)
            router.push("/")
        } catch (e) {
            setErrors({
                ...errors,
                login: "Registering failed"
            })
            console.log(e)
            setIsLoading(false)
        }
    }

    return session.user ? null : (
        <div className={styles.login}>
            <h1>Register</h1>

            {errors.login && <h2 className={styles.error}>{errors.login}</h2>}

            <form onSubmit={handleSubmit} className={styles.loginform}>
                <fieldset>
                    <label>Email:</label>
                    <input type="text" name="email" onChange={handleChange} value={model.email} autoComplete="email" required />
                    {errors.email && <div className={styles.error}>{errors.email}</div>}
                </fieldset>

                <fieldset>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={handleChange} value={model.password} autoComplete="current-password" required />
                    {errors.password && <div className={styles.error}>{errors.password}</div>}
                </fieldset>
                <fieldset>
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" onChange={handleChange} value={model.confirmPassword} autoComplete="current-password" required />
                    {errors.password && <div className={styles.error}>{errors.confirmPassword}</div>}
                </fieldset>

                <fieldset>
                    <button disabled={isLoading} type="submit">
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </fieldset>
            </form>
        </div>
    )
}
