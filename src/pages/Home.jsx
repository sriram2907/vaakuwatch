import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, FileText, Download, Eye, TrendingUp, ShieldCheck, Layers } from 'lucide-react'
import {
  PieChart, Pie, Cell, Tooltip as RTooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts'

import SectionHeading from '../components/SectionHeading.jsx'
import AnimatedCounter from '../components/AnimatedCounter.jsx'
import PromiseCard from '../components/PromiseCard.jsx'
import { promises } from '../data/promises.js'
import { manifestos } from '../data/manifestos.js'
import { parties, statusConfig, electionYears } from '../data/parties.js'

export default function Home() {
  const stats = useMemo(() => {
    const total = promises.length
    const byStatus = Object.keys(statusConfig).reduce((acc, key) => {
      acc[key] = promises.filter((p) => p.status === key).length
      return acc
    }, {})
    const avgFulfillment = Math.round(
      promises.reduce((sum, p) => sum + p.fulfillmentPercentage, 0) / total
    )
    return { total, byStatus, avgFulfillment }
  }, [])

  const pieData = useMemo(
    () =>
      Object.entries(stats.byStatus)
        .filter(([, count]) => count > 0)
        .map(([status, count]) => ({ name: status, value: count, color: statusConfig[status].color })),
    [stats]
  )

  const partyData = useMemo(
    () =>
      parties
        .map((party) => {
          const items = promises.filter((p) => p.party === party.abbreviation)
          if (items.length === 0) return null
          const avg = Math.round(items.reduce((s, p) => s + p.fulfillmentPercentage, 0) / items.length)
          return { name: party.abbreviation, fulfillment: avg, count: items.length, color: party.color }
        })
        .filter(Boolean),
    []
  )

  const recentPromises = promises.slice(0, 6)

  const insights = [
    {
      icon: TrendingUp,
      title: `${stats.avgFulfillment}% average fulfillment`,
      desc: 'Across all tracked promises, weighted by self-reported progress percentages.',
    },
    {
      icon: ShieldCheck,
      title: `${stats.byStatus.Completed} promises marked Completed`,
      desc: 'Each completed promise links to evidence once verified by the editorial team.',
    },
    {
      icon: Layers,
      title: `${parties.length} parties tracked`,
      desc: 'From DMK and AIADMK to regional and national parties active in Tamil Nadu.',
    },
  ]

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-accent border border-accent/30 bg-accentSoft rounded-full px-4 py-1.5 mb-8"
          >
            Every Manifesto · Every Promise · Every Outcome
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-gradient"
          >
            Track Every Political Promise<br className="hidden sm:block" /> Made in Tamil Nadu
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 text-base md:text-lg text-white/55 max-w-2xl mx-auto leading-relaxed"
          >
            Explore manifestos, compare parties, and verify whether promises became reality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to="/promises"
              className="inline-flex items-center gap-1.5 bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
            >
              Explore Promise Explorer <ArrowUpRight size={16} />
            </Link>
            <a
              href="#fulfillment-overview"
              className="inline-flex items-center gap-1.5 glass font-medium px-6 py-3 rounded-full hover:glass-strong transition-colors text-white/80"
            >
              View fulfillment data
            </a>
          </motion.div>
        </div>

        {/* Stat strip */}
        <div className="relative border-t border-line">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
            {[
              { label: 'Promises tracked', value: stats.total, suffix: '' },
              { label: 'Parties tracked', value: parties.length, suffix: '' },
              { label: 'Election years covered', value: electionYears.length, suffix: '' },
              { label: 'Avg. fulfillment', value: stats.avgFulfillment, suffix: '%' },
            ].map((s) => (
              <div key={s.label} className="px-4 md:px-8 py-8 text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold font-mono">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs text-white/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED INSIGHTS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeading
          eyebrow="Featured insights"
          title="What the data shows so far"
          description="A quick read on where things stand across tracked manifestos. This sample dataset will grow as more promises are verified."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {insights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="glass rounded-xl2 p-6"
            >
              <div className="h-10 w-10 rounded-lg bg-accentSoft flex items-center justify-center mb-4">
                <item.icon size={18} className="text-accent" />
              </div>
              <h3 className="font-semibold mb-1.5">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* RECENT MANIFESTOS */}
      <section className="border-y border-line bg-surface/50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionHeading
            eyebrow="Manifesto archive"
            title="Recently added manifestos"
            description="Original manifesto documents, organized by party and election year. PDF previews and downloads will be enabled once documents are uploaded."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {manifestos.map((m, i) => {
              const party = parties.find((p) => p.abbreviation === m.party)
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="glass rounded-xl2 p-5 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-md"
                      style={{ color: party?.color, backgroundColor: `${party?.color}1A` }}
                    >
                      {m.party}
                    </span>
                    <span className="text-xs font-mono text-white/40">{m.year}</span>
                  </div>
                  <FileText size={20} className="text-white/30 mb-3" />
                  <h3 className="font-semibold leading-snug mb-1.5 text-[15px]">{m.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">{m.summary}</p>
                  <div className="flex items-center gap-3 text-xs text-white/40">
                    <button disabled className="inline-flex items-center gap-1 cursor-not-allowed opacity-50">
                      <Eye size={14} /> Preview
                    </button>
                    <button disabled className="inline-flex items-center gap-1 cursor-not-allowed opacity-50">
                      <Download size={14} /> PDF
                    </button>
                    <span className="ml-auto font-mono">{m.promiseCount} promises</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FULFILLMENT OVERVIEW */}
      <section id="fulfillment-overview" className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeading
          eyebrow="Promise fulfillment overview"
          title="Where promises stand right now"
          description="A breakdown of every tracked promise by current status."
        />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
          <div className="lg:col-span-2 glass rounded-xl2 p-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                  stroke="none"
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <RTooltip
                  contentStyle={{ background: '#0F1011', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8 }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pieData.map((entry) => (
              <div key={entry.name} className="glass rounded-xl2 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-sm text-white/70">{entry.name}</span>
                </div>
                <div className="text-3xl font-bold font-mono">
                  <AnimatedCounter value={entry.value} />
                </div>
                <div className="text-xs text-white/40 mt-1">
                  {Math.round((entry.value / stats.total) * 100)}% of tracked promises
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTY PERFORMANCE */}
      <section className="border-y border-line bg-surface/50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionHeading
            eyebrow="Party performance overview"
            title="Average fulfillment by party"
            description="Average self-reported fulfillment percentage across each party's tracked promises in this sample."
          />
          <div className="glass rounded-xl2 p-6 h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={partyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" tickLine={false} axisLine={false} unit="%" />
                <RTooltip
                  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                  contentStyle={{ background: '#0F1011', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8 }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }} />
                <Bar dataKey="fulfillment" name="Avg. fulfillment %" radius={[6, 6, 0, 0]}>
                  {partyData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* RECENT PROMISES PREVIEW */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionHeading
          eyebrow="Promise explorer"
          title="Recently tracked promises"
          description="A preview of the full Promise Explorer — search, filter, and dig into evidence for every entry."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recentPromises.map((p, i) => (
            <PromiseCard key={p.id} promise={p} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl2 glass-strong p-10 md:p-16 text-center"
        >
          <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 text-gradient">
              Hold every promise accountable.
            </h2>
            <p className="text-white/55 max-w-xl mx-auto mb-8 leading-relaxed">
              Dive into the full archive of manifestos and promises, compare parties side by side,
              and follow the evidence behind every status.
            </p>
            <Link
              to="/promises"
              className="inline-flex items-center gap-1.5 bg-accent text-white font-medium px-6 py-3 rounded-full hover:bg-accent/90 transition-colors"
            >
              Open Promise Explorer <ArrowUpRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
