import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import StatusBadge from './StatusBadge.jsx'
import { parties, statusConfig } from '../data/parties.js'

export default function PromiseCard({ promise, index = 0 }) {
  const party = parties.find((p) => p.abbreviation === promise.party)
  const cfg = statusConfig[promise.status] || statusConfig['Insufficient Data']

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
    >
      <Link
        to={`/promise/${promise.id}`}
        className="group block h-full glass hover:glass-strong rounded-xl2 p-5 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold px-2 py-1 rounded-md"
              style={{ color: party?.color, backgroundColor: `${party?.color}1A` }}
            >
              {promise.party}
            </span>
            <span className="text-xs text-white/40 font-mono">{promise.electionYear}</span>
          </div>
          <ArrowUpRight size={16} className="text-white/30 group-hover:text-white transition-colors" />
        </div>

        <h3 className="font-semibold leading-snug mb-2 text-[15px]">{promise.title}</h3>
        <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
          {promise.description}
        </p>

        <div className="flex items-center justify-between gap-3 mb-3">
          <StatusBadge status={promise.status} />
          <span className="text-xs text-white/40 font-mono">{promise.category}</span>
        </div>

        <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${promise.fulfillmentPercentage}%`, backgroundColor: cfg.color }}
          />
        </div>
        <div className="mt-1.5 text-[11px] text-white/40 font-mono">
          {promise.fulfillmentPercentage}% fulfilled
        </div>
      </Link>
    </motion.div>
  )
}
