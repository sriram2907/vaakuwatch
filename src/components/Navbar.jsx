import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const navItems = [
  { label: 'Home', to: '/', active: true },
  { label: 'Promise Explorer', to: '/promises', active: true },
  { label: 'Manifesto Archive', to: '/manifestos', active: false },
  { label: 'Compare Parties', to: '/compare', active: false },
  { label: 'Analytics', to: '/analytics', active: false },
  { label: 'Timeline', to: '/timeline', active: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-0 glass border-b border-line" />
      <div className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight text-lg">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent text-white text-sm font-bold">
            V
          </span>
          VaakuWatch
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
            item.active ? (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive ? 'text-white bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <span
                key={item.to}
                className="px-3 py-2 rounded-md text-sm text-white/30 cursor-not-allowed flex items-center gap-1"
                title="Coming soon"
              >
                {item.label}
                <span className="text-[10px] uppercase tracking-wider border border-white/10 rounded px-1 py-0.5">
                  soon
                </span>
              </span>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/promises"
            className="inline-flex items-center gap-1.5 text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-white/90 transition-colors"
          >
            Explore promises <ArrowUpRight size={15} />
          </Link>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-white/80"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden relative glass border-t border-line">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) =>
              item.active ? (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-md text-sm ${
                      isActive ? 'text-white bg-white/5' : 'text-white/60'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ) : (
                <span key={item.to} className="px-3 py-2.5 rounded-md text-sm text-white/30">
                  {item.label} · soon
                </span>
              )
            )}
          </div>
        </div>
      )}
    </header>
  )
}
