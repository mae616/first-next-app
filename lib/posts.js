import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import dayjs from 'dayjs'

// Nodeでpostsディレクトリへのパスを取得する
// process.cwd() => Nodeが実行される際のワーキングディレクトリの場所
// postsDirPath => postへの絶対パスになる
const postsDirPath = path.join(process.cwd(), 'posts')

export function getPosts() {
    // 同期的にディレクトリを読み込む
    // ディレクトリの中に入ってるファイル名が配列で返される
    const postNames = fs.readdirSync(postsDirPath)
    // postsNames === ['first-post.md']

    return postNames.map((postName) => {
        // 各postを取得、front matterを解析
        const postPath = path.join(postsDirPath, postName)
        const result = matter(fs.readFileSync(postPath, 'utf8'))

        return {
            id: postName.replace(/\.md$/, ''),
            ...result.data
        }
    })
}

export function getIds() {
    const postNames = fs.readdirSync(postsDirPath)

    return postNames.map(postName => {
        return {
            params: {
                id: postName.replace(/\.md$/, '')
            }
        }
    })
}

export function getPostById(id) {
    const postPath = path.join(postsDirPath, `${id}.md`)

    // ファイルの更新日時
    const stats = fs.statSync(postPath);
    // const date = JSON.parse(JSON.stringify(stats.mtime))
    const date = dayjs(stats.mtime).format('YYYY年MM月DD日 HH:mm:ss')

    const result = matter(fs.readFileSync(postPath, 'utf8'))

    return {
        id,
        date,
        ...result.data,
        content: result.content
    }
}