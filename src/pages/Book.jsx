import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../components/Loader"

const Book = () => {
    const[book, setBook] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setIsError] = useState(null)
    const { id } = useParams()
    useEffect(() => {
        const load = async () => {
            try {
                setIsLoading(true)
                const res = await fetch (`https://openlibrary.org/works/${id}.json`)

                if (!res.ok) throw new Error()

                const data = await res.json()
                if (data.authors) {
                    const authorRes = await fetch(`https://openlibrary.org${data.authors[0].author.key}.json`)
                    const authorData = await authorRes.json()
                    data.author = authorData.name
                }

                if (data.genre) {
                    const genreRes = await fetch(`https://openlibrary.org${data.genre[0].genre.key}.json`)
                    const genreData = await genreRes.json()
                    data.genre = genreData.name
                }

                setBook(data)
            } catch (error) {
                console.error(error)
                setIsError(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        load()
    }, [])
    if (isLoading) return <Loader />
    if (!isLoading && error) return <p>{error}</p>
    if (book)
    return (
        <section className="book-page">
            <div className="book-page-cover">
                {book?.covers && (
                <img
                    id="bookCover"
                    src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                    alt=""
                />
                )}
            </div>
            <div className="book-page-content">
                <div className="section-label">КНИГА</div>
                {book?.title && <h1 id="bookTitle">{book.title}</h1>}
                {book?.author && (
                    <div className="book-page-author" id="bookAuthor">
                        {book.author}
                    </div>
                )}
                <div className="book-meta">
                {book?.first_publish_date ? (
                    <span id="bookYear">{book.first_publish_date}</span>
                ) : book?.publish_date ? (
                    <span id="bookYear">{book?.publish_date}</span>
                ) : (
                    ""
                )}
                {book?.genre && (
                    <span>book.genre</span>
                )}
                </div>
                {book?.description && (
                    <div className="description">
                    <h3>Об этой книге</h3>
                    <p id="bookDescription">
                       {book.description.value || book.description}
                    </p>
                </div>)}
                <div className="modal-actions">
                    <button className="primary-button">Читать</button>
                    <button className="secondary-button">♡ Сохранить</button>
                </div>
            </div>
        </section>
    )
}

export default Book
