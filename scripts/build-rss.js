import fs from 'fs'
import ReactDOMServer from 'react-dom/server'
import { MDXProvider } from '@mdx-js/react'
import { Feed } from 'feed'

import { getAllPosts } from '../rss/getAllPostPreviews'


const feed = new Feed({
    title: 'Tailwind CSS Blog',
    description: 'All the latest Tailwind CSS news, straight from the team.',
    language: 'en',

    copyright: `All rights reserved ${new Date().getFullYear()}, Tailwind Labs`,
    author: {
        name: 'Adam Wathan',
    },
})

getAllPosts().forEach(({ link, module: { meta, default: Content } }) => {
    const mdx = (
        <MDXProvider>
            <Content />
        </MDXProvider>
    )
    const html = ReactDOMServer.renderToStaticMarkup(mdx)
    const postText = `aaa`
    feed.addItem({
        title: meta.title,
        id: meta.title,
        link,
        description: meta.description,
        content: html + postText,
        author: meta.authors.map(({ name, twitter }) => ({
            name,
        })),
        date: new Date(meta.date),
        ...(meta.discussion
            ? {
                comments: meta.discussion,
                extensions: [
                    {
                        name: '_comments',
                        objects: {
                            about: 'Link to discussion forum',
                            comments: meta.discussion,
                        },
                    },
                ],
            }
            : {}),
    })
})

fs.writeFileSync('./out/feed.xml', feed.rss2())
fs.writeFileSync('./out/atom.xml', feed.atom1())
fs.writeFileSync('./out/feed.json', feed.json1())