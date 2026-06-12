import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, FileSearch, Link2, Clock } from 'lucide-react'
import StatusBadge from '../components/StatusBadge.jsx'
import PromiseCard from '../components/PromiseCard.jsx'
import { promises } from '../data/promises.js'
import { parties, statusConfig } from '../data/parties.js'

export default function PromiseDetail() {
  const { id } = useParams()
  const promise = promises.find((p) => p.id === id)

  if (!promise) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold mb-3">Promise not found</h1>
        <p className="text-white/50 mb-6">This entry may have been removed or the link is incorrect.</p>
        <Link to="/promises" className="inline-flex items-center gap-1.5 text-accent hover:underline">
          <ArrowLeft size={16} /> Back to Promise Explorer
        </Link>
      </div>
    )
  }

  const party = parties.find((p) => p.abbreviation === promise.party)
  const cfg = statusConfig[promise.status]
  const related = promises
    .filter((p) => p.id !== promise.id && (p.party === promise.party || p.category === promise.category))
    .slice(0, 3)

  return (
    <div>
      <section className="border-b border-line relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-12 pb-12">
          <Link to="/promises" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={15} /> Back to Promise Explorer
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-md"
              style={{ color: party?.color, backgroundColor: `${party?.color}1A` }}
            >
              {promise.party}
            </span>
            <span className="text-xs font-mono text-white/40">{promise.electionYear} Election</span>
            <span className="text-xs font-mono text-white/40">· {promise.category}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient mb-4">
            {promise.title}
          </h1>
          <p className="text-white/60 leading-relaxed max-w-2xl mb-6">{promise.description}</p>

          <div className="flex flex-wrap items-center gap-4">
            <StatusBadge status={promise.status} size="md" />
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-32 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${promise.fulfillmentPercentage}%`, backgroundColor: cfg.color }}
                />
              </div>
              <span className="text-sm font-mono text-white/50">{promise.fulfillmentPercentage}% fulfilled</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="md:col-span-2 glass rounded-xl2 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileSearch size={18} className="text-accent" />
            <h2 className="font-semibold">Evidence</h2>
          </div>
          {promise.evidence.length === 0 ? (
            <div className="text-sm text-white/40 leading-relaxed">
              No evidence documents have been linked to this promise yet.
              {!promise.verified && ' This entry has not been independently verified.'}
            </div>
          ) : (
            <ul className="space-y-3">
              {promise.evidence.map((e, i) => (
                <li key={i} className="text-sm text-white/70">{e.title}</li>
              ))}
            </ul>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="glass rounded-xl2 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-accent" />
            <h2 className="font-semibold">Details</h2>
          </div>
          <dl className="text-sm space-y-3">
            <div>
              <dt className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Last updated</dt>
              <dd className="font-mono">{promise.lastUpdated}</dd>
            </div>
            <div>
              <dt className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Election</dt>
              <dd>{promise.electionYear} Tamil Nadu Assembly</dd>
            </div>
            <div>
              <dt className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Category</dt>
              <dd>{promise.category}</dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="md:col-span-3 glass rounded-xl2 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Link2 size={18} className="text-accent" />
            <h2 className="font-semibold">Sources</h2>
          </div>
          {promise.sourceLinks.length === 0 ? (
            <div className="text-sm text-white/40 leading-relaxed">
              No sources have been added yet. Sources (government orders, official scheme pages,
              news articles) will appear here once added through the admin dashboard.
            </div>
          ) : (
            <ul className="space-y-2">
              {promise.sourceLinks.map((link, i) => (
                <li key={i}>
                  <a href={link} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </section>

      {related.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <h2 className="font-semibold mb-5">Related promises</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((p, i) => (
              <PromiseCard key={p.id} promise={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
