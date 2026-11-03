import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Main from "./pages/Main"
import Search from './pages/Search'
import Book from './pages/Book'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="search" element={<Search />} />
          <Route path="book" element={<Book />} />  
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
