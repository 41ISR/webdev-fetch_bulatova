import { NavLink } from "react-router-dom"

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="brand">
                <div className="brand-mark">L</div>
                <div>
                    <div className="brand-name">Libria</div>
                    <div className="brand-caption">Open Library</div>
                </div>
            </div>
            <nav className="navigation">
                <div className="nav-section-title">Библиотека</div>
                <NavLink className="nav-item" to="">
                    <span>⌂</span>
                    Обзор
                </NavLink>
            </nav>
            <div className="sidebar-bottom">
                <div className="profile">
                    <div className="avatar">А</div>
                    <div>
                        <strong>Читатель</strong>
                        <span>Моя библиотека</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
