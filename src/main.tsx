import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import HomePage from './home-page.tsx'
import ChaptersPage from './chapters-page.tsx'
import ChapterPage from './chapter-page.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:bookTitle/chapters" element={<ChaptersPage />} />
        <Route path="/:bookTitle/chapters/:chapterId" element={<ChapterPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)