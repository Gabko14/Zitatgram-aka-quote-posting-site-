import styles from "./createButton.module.css"
import Link from "next/link";
import {useRouter} from "next/router";

export default function CreateButton() {
    const router = useRouter();

    return (
        <div className={styles.buttonBackgroundDiv}>
            <button className={styles.createButton} onClick={() => {router.push("/create")}}>
                Create
            </button>
        </div>
    )
}