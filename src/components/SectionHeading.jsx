import React from 'react'
import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl mb-10 ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      {eyebrow && (
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-accent mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gradient">{title}</h2>
      {description && <p className="mt-3 text-white/50 leading-relaxed">{description}</p>}
    </motion.div>
  )
}
