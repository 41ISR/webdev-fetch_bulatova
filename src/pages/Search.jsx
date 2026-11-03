import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import BookCard from "../components/BookCard"

const Search = () => {
    const [books, setBooks] = useState(undefined)
    const [searchParams] = useSearchParams()
    const queryParam = searchParams.get("q") || ""
    const [query, setQuery] = useState(queryParam)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (e.target.query.value.trim().length === 0) return
        navigate("/search?q=" + encodeURIComponent(e.target.query.value))
    }

    useEffect(() => {
        const load = async () => {
            const res = await fetch ('https://openlibrary.org/search.json?q=' + queryParam + " limit=10")
            const data = await res.json()
            console.log(data)
            setBooks(data)
        }
        load()
    }, [queryParam])

    return (
        <section className="content">
            <div className="search-page-header">
                <div className="section-label">ПОИСК</div>
                <h1>Найдите свою следующую книгу</h1>
                <form onSubmit={handleSubmit} className="search" id="searchForm">
                    <span className="search-icon">⌕</span>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        id="searchInput"
                        name="query"
                        type="text"
                        placeholder="Название, автор или ISBN..."
                    />
                    <button type="submit">Найти</button>
                </form>
            </div>
            <div className="section-header">
                <div>
                    <div className="section-label">РЕЗУЛЬТАТЫ</div>
                    <h2 id="searchTitle">Результаты поиска</h2>
                </div>
                {books?.numFound &&
                <span className="result-count" id="resultCount">
                    {books.numFound}
                </span>
                }
            </div>
            {books?.docs.length > 0 &&(
            <div className="book-grid" id="results">
                {books.docs.map((el, i) => (<BookCard {...el} key={i} />))}
            </div>
            )}
        </section>
    )
}

export default Search
