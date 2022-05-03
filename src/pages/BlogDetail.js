import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogDetail() {
    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState(true)
    const [NotFound, setNotFound] = useState(false)

    const params = useParams()

    useEffect(function() {
        async function getArticle() {
            const request = await fetch(`https://api.spaceflightnewsapi.net/v3/articles/${params.id}`)

            if(!request.ok) {
                setLoading(false)
                return setNotFound(true)
            }
            
            const response = await request.json()
            
            setArticle(response)
            setLoading(false)
        } 
        getArticle()
    }, [params])

    if(NotFound) {
        return <h1>Articles Not Found</h1>
    }

    return (
        <>
            <section> 
            {loading && <i>Loading article ...</i> }
            {!loading && (
                <article>
                    <h1>{article.title}</h1> 
                    <time>{new Date (article.publishedAt).toLocaleDateString()}</time>
                    <img src={article.imageUrl} alt={article.title} />
                    <p>{article.summary}</p>
                    <p>
                    Source: {` `} 
                        <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noreferrer">
                            {article.newsSite}
                        </a>
                    </p>
                </article>
            )}
            </section>
        </>
    )
}

export default BlogDetail