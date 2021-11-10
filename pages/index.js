import Link from 'next/link'
import Layout from '../components/layout'

import { getPosts } from '../lib/posts'

import { nanoid } from 'nanoid'

// ↓これを定義するとビルド時に外部のデータを取得する処理をしてくれる
// 取得したらHomeコンポーネントにpropsとして渡される
export const getStaticProps = async () => {
  return {
    props: {
      posts: getPosts()
    }
  }
}

export default function Home({ posts }) {

  return (
    <>
      <Layout pageTitle={'Home'}>
        <Link href="/about">
          <a>About</a>
        </Link>
        <ul>
          {
            posts.map(({ title, id }) => {
              return (
                <li key={nanoid()}>
                  <Link href={`/posts/${id}`}>
                    <a>{title}</a>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </Layout>
    </>
  )
}

// pages/index.js => /
