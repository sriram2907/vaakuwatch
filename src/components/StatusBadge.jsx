import React from 'react'
import { statusConfig } from '../data/parties.js'

export default function StatusBadge({ status, size = 'sm' }) {
  const cfg = statusConfig[status] || statusConfig['Insufficient Data']
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${sizeClasses}`}
      style={{
        color: cfg.color,
        borderColor: `${cfg.color}40`,
        backgroundColor: `${cfg.color}14`,
      }}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
      {cfg.label}
    </span>
  )
}
