import styles from "./index.module.css"
import QuotesList from "../components/QuotesList";
import CreateButton from "../components/CreateButton";

export default function IndexPage({session}) {
    return (
        <>
            <div className={styles.posts}>
                <CreateButton></CreateButton>
                <QuotesList session={session} ></QuotesList>
            </div>
        </>
    )
}