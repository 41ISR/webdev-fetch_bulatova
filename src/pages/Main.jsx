import { useNavigate } from "react-router-dom"

const Main = () => {
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (e.target.query.value.trim().length === 0) return
        navigate("/search?q=" + encodeURIComponent(e.target.query.value))
    }
    return (
        <section className="hero">
            <div className="hero-content">
                <div className="eyebrow">OPEN LIBRARY</div>
                <h1>
                    Книги, которые
                    <br />
                    хочется читать.
                </h1>
                <p>
                    Исследуйте миллионы книг, находите новые истории и
                    открывайте авторов.
                </p>
                <form onSubmit={handleSubmit} className="search" id="searchForm">
                    <span className="search-icon">⌕</span>
                    <input
                        id="searchInput"
                        name="query"
                        type="text"
                        placeholder="Название книги, автор или ISBN..."
                    />
                    <button type="submit">Найти</button>
                </form>
            </div>
            <div className="hero-decoration">
                <div className="floating-book book-one">
                    <div className="book-cover">
                        <span>THE</span>
                        <strong>BOOK</strong>
                    </div>
                </div>
                <div className="floating-book book-two">
                    <div className="book-cover">
                        <span>READ</span>
                        <strong>MORE</strong>
                    </div>
                </div>
                <div className="floating-book book-three">
                    <div className="book-cover">
                        <span>NEW</span>
                        <strong>WORLD</strong>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main
