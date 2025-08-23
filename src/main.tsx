import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Gallery } from './components/gallery/Gallery.tsx'
import { Music } from './components/music/Music.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="w-full h-screen">
      <Gallery />
      <Music />
    </div>
  </StrictMode>,
)
