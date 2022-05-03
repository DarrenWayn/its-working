import { useEffect, useState } from "react";
import BlogDetail from "./BlogDetail";
import { Link } from 'react-router-dom';

function Blog() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(function() {
        async function getArticle() {
            const request = await fetch('https://api.spaceflightnewsapi.net/v3/articles')
            setLoading(true)

            const response = await request.json()

            setArticles(response)
            setLoading(false)
        }
        getArticle()
    }, [])

    return (
        <>
            <section>
                <h1>Blog Page</h1>
                <p>Below are my writing: </p>
                {loading && (<i>Loading articles ...</i>)}
                {!loading && (
                    <div>
                        {articles.map(function(article) {
                            return ( 
                                <article key={article.id}>      
                                    <h2>
                                        <Link to={`/blog/${article.id}`}>{article.title}</Link>
                                    </h2>
                                    <time>{new Date (article.publishedAt).toLocaleDateString()}</time>
                                </article>
                            )
                        })}
                    </div>
                )}
            </section>

            <section> 
                <BlogDetail />
            </section>
        </>
    )
}

export default Blog
