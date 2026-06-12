import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-semibold tracking-tight text-lg mb-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent text-white text-sm font-bold">
              V
            </span>
            VaakuWatch
          </div>
          <p className="text-sm text-white/50 max-w-sm leading-relaxed">
            Every manifesto. Every promise. Every outcome. An open record of Tamil Nadu
            election promises, tracked against verified evidence.
          </p>
          <div className="flex items-center gap-3 mt-5 text-white/50">
            <a href="#" className="hover:text-white transition-colors"><Github size={18} /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter size={18} /></a>
            <a href="#" className="hover:text-white transition-colors"><Mail size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 text-white/80">Platform</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li><Link to="/promises" className="hover:text-white transition-colors">Promise Explorer</Link></li>
            <li className="text-white/30">Manifesto Archive · soon</li>
            <li className="text-white/30">Compare Parties · soon</li>
            <li className="text-white/30">Analytics Dashboard · soon</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 text-white/80">About</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li>Methodology</li>
            <li>Data sources</li>
            <li>Corrections policy</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>© {new Date().getFullYear()} VaakuWatch. Demo build — sample data, not verified.</span>
          <span>Built with React, Tailwind & Framer Motion.</span>
        </div>
      </div>
    </footer>
  )
}
