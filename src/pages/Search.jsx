import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import BookCard from "../components/BookCard"
import Loader from "../components/Loader"

const Search = () => {
    const [books, setBooks] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setIsError] = useState(null)
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
            setIsError(null)
            setIsLoading(true)

            try {
                const res = await fetch(
                    "https://openlibrary.org/search.json?q=" +
                        queryParam +
                        "&limit=10",
                )
                if (!res.ok) {
                    const error = await res.json()
                    throw new Error(error.detail[0].msg)
                }
                const data = await res.json()
                setBooks(data)
            } catch (error) {
                console.error(error)
                setIsError(error.message ?? "Что-то пошло не так")
            } finally {
                setIsLoading(false)
            }
        }
        load()
    }, [queryParam])

    return (
        <section className="content">
            <div className="search-page-header">
                <div className="section-label">ПОИСК</div>
                <h1>Найдите свою следующую книгу</h1>
                <form
                    onSubmit={handleSubmit}
                    className="search"
                    id="searchForm"
                >
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
                {books?.numFound && (
                    <span className="result-count" id="resultCount">
                        {books.numFound}
                    </span>
                )}
            </div>
            {isLoading && <Loader />}
            {!isLoading && error && <div className="error">{error}</div>}
            {!isLoading && !error && books?.docs.length > 0 && (
                <div className="book-grid" id="results">
                    {books.docs.map((el, i) => (
                        <BookCard {...el} book_key={el.key} key={i} />
                    ))}
                </div>
            )}
            {!isLoading && !error && books?.docs.length === 0 && (
                <div>Книги не были найдены</div>
            )}
        </section>
    )
}

export default Search