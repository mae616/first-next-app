import Head from 'next/head'
import styles from './layout.module.css'

export default function Layout({ children, pageTitle }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>My Blog | {pageTitle}</title>
            </Head>
            <h1>My Blog</h1>
            {children}
        </div>
    )
}