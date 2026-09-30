import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

export default function Layout() {
  const [query, setQuery] = useState('')

  return (
    <div className="glass-app flex min-h-svh flex-col text-ink">
      <div className="glass-wallpaper" aria-hidden="true" />
      <Header />
      <main className="mx-auto w-full max-w-[1280px] flex-1 overflow-x-hidden px-4 pt-20 pb-24 sm:px-6 sm:pb-16">
        <Outlet context={{ query, setQuery }} />
      </main>
      <Footer />
    </div>
  )
}
