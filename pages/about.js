import Link from 'next/link'
import Layout from '../components/layout'

export default function About() {
    return (
        <Layout pageTitle={'About'}>
            <h2>About</h2>
            <Link href="/">
                <a>Top</a>
            </Link>
        </Layout>
    )
}