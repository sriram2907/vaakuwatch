import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import PromiseCard from '../components/PromiseCard.jsx'
import { promises } from '../data/promises.js'
import { parties, categories, electionYears, statusConfig } from '../data/parties.js'

const sortOptions = [
  { value: 'recent', label: 'Most recently updated' },
  { value: 'year-desc', label: 'Election year (newest)' },
  { value: 'year-asc', label: 'Election year (oldest)' },
  { value: 'fulfillment-desc', label: 'Fulfillment % (high to low)' },
  { value: 'fulfillment-asc', label: 'Fulfillment % (low to high)' },
]

export default function PromiseExplorer() {
  const [search, setSearch] = useState('')
  const [party, setParty] = useState('all')
  const [year, setYear] = useState('all')
  const [status, setStatus] = useState('all')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('recent')

  const usedYears = useMemo(
    () => electionYears.filter((y) => promises.some((p) => p.electionYear === y)),
    []
  )
  const usedCategories = useMemo(
    () => categories.filter((c) => promises.some((p) => p.category === c)),
    []
  )

  const filtered = useMemo(() => {
    let result = promises.filter((p) => {
      if (party !== 'all' && p.party !== party) return false
      if (year !== 'all' && p.electionYear !== Number(year)) return false
      if (status !== 'all' && p.status !== status) return false
      if (category !== 'all' && p.category !== category) return false
      if (search.trim()) {
        const q = search.toLowerCase()
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.party.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        )
      }
      return true
    })

    switch (sort) {
      case 'year-desc':
        result = [...result].sort((a, b) => b.electionYear - a.electionYear)
        break
      case 'year-asc':
        result = [...result].sort((a, b) => a.electionYear - b.electionYear)
        break
      case 'fulfillment-desc':
        result = [...result].sort((a, b) => b.fulfillmentPercentage - a.fulfillmentPercentage)
        break
      case 'fulfillment-asc':
        result = [...result].sort((a, b) => a.fulfillmentPercentage - b.fulfillmentPercentage)
        break
      default:
        result = [...result].sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
    }
    return result
  }, [search, party, year, status, category, sort])

  const resetFilters = () => {
    setSearch('')
    setParty('all')
    setYear('all')
    setStatus('all')
    setCategory('all')
    setSort('recent')
  }

  return (
    <div>
      {/* Header */}
      <section className="border-b border-line relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-10">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-accent mb-3">
            Promise Explorer
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gradient mb-3">
            Every promise, searchable.
          </h1>
          <p className="text-white/50 max-w-2xl leading-relaxed">
            Search and filter manifesto promises by party, election year, category, and status.
            Click any promise to see its evidence, sources, and timeline.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="glass rounded-xl2 p-4 md:p-5">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search promises, parties, categories…"
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex gap-3">
              <select
                value={party}
                onChange={(e) => setParty(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              >
                <option value="all">All parties</option>
                {parties.map((p) => (
                  <option key={p.id} value={p.abbreviation}>{p.abbreviation}</option>
                ))}
              </select>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              >
                <option value="all">All years</option>
                {usedYears.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              >
                <option value="all">All categories</option>
                {usedCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              >
                <option value="all">All statuses</option>
                {Object.keys(statusConfig).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 col-span-2 sm:col-span-1"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-line">
            <div className="flex items-center gap-2 text-sm text-white/40">
              <SlidersHorizontal size={14} />
              {filtered.length} of {promises.length} promises
            </div>
            <button
              onClick={resetFilters}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Reset filters
            </button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-xl2 p-16 text-center text-white/40"
          >
            No promises match these filters yet.
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <PromiseCard key={p.id} promise={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
