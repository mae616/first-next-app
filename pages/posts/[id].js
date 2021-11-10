import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/layout'

import { getIds, getPostById } from '../../lib/posts'

export const getStaticPaths = async () => {
    return {
        paths: getIds(),
        fallback: false // ファイル名がないとき404を表示する
    }
}

export const getStaticProps = async ({ params }) => {
    return {
        props: {
            post: getPostById(params.id)
        }
    }
}


export default function Post({ post }) {

    return (
        <Layout pageTitle={'Article'}>
            <h2>{post.title}</h2>
            <p>{post.date}</p>
            <div><ReactMarkdown>{post.content}</ReactMarkdown></div>
            <Link href="/">
                <a>Top</a>
            </Link>
        </Layout>
    )
}