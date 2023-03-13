import styles from "./Header.module.css"
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/" passHref>
                HOME
            </Link>
            <Link href="/pages/profile" passHref>
                Profil
            </Link>
        </header>
    )
}