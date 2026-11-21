import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Lenis from 'lenis'
import { ArrowUpRight, Check, ChevronDown, CirclePlus, Flame, LayoutGrid, MoreHorizontal, Plus, Settings2, Sparkles, Target, TrendingUp, X } from 'lucide-react'
import { GlassSlabLogo } from './components/glass-slab-logo'

type Habit = { id: number; name: string; category: string; time: string; done: boolean; streak: number; tint: string }
const starter: Habit[] = [
  { id: 1, name: 'Drink a glass of water', category: 'WELLNESS', time: '08:00 AM', done: true, streak: 8, tint: 'orange' },
  { id: 2, name: 'Read 10 pages', category: 'GROWTH', time: '09:00 AM', done: true, streak: 12, tint: 'grey' },
  { id: 3, name: 'Move your body', category: 'MOVEMENT', time: '12:30 PM', done: false, streak: 4, tint: 'orange' },
  { id: 4, name: 'Write a daily journal', category: 'MINDFULNESS', time: '08:30 PM', done: false, streak: 6, tint: 'grey' },
]
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function App() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    try { return JSON.parse(localStorage.getItem('ritual-habits') || 'null') || starter } catch { return starter }
  })
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [activeNav, setActiveNav] = useState('Overview')
  const [week, setWeek] = useState([true, true, false, true, false, false, false])
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    localStorage.setItem('ritual-habits', JSON.stringify(habits))
  }, [habits])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = reduce ? null : new Lenis({ duration: 1.15, smoothWheel: true })
    let raf = 0
    const tick = (time: number) => { lenis?.raf(time); raf = requestAnimationFrame(tick) }
    if (lenis) raf = requestAnimationFrame(tick)
    if (!reduce && heroRef.current) gsap.fromTo(heroRef.current.querySelectorAll('.intro-animate'), { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .12, ease: 'power3.out', delay: .12 })
    return () => { cancelAnimationFrame(raf); lenis?.destroy() }
  }, [])

  const completed = habits.filter(h => h.done).length
  const progress = habits.length ? Math.round(completed / habits.length * 100) : 0
  const toggleHabit = (id: number) => setHabits(items => items.map(h => h.id === id ? { ...h, done: !h.done } : h))
  const addHabit = () => {
    if (!newName.trim()) return
    setHabits(items => [...items, { id: Date.now(), name: newName.trim(), category: 'PERSONAL', time: 'ANYTIME', done: false, streak: 0, tint: 'grey' }])
    setNewName(''); setShowAdd(false)
  }
  const greeting = useMemo(() => new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()), [])

  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#"><span className="brand-mark">r.</span><span>ritual<span className="brand-dot">.</span></span></a>
      <div className="side-label">WORKSPACE</div>
      <nav>{[{ name: 'Overview', icon: LayoutGrid }, { name: 'My habits', icon: Target }, { name: 'Insights', icon: TrendingUp }].map(item => <button key={item.name} className={`nav-item ${activeNav === item.name ? 'selected' : ''}`} onClick={() => setActiveNav(item.name)}><item.icon size={17}/>{item.name}{item.name === 'My habits' && <span className="nav-count">{habits.length}</span>}</button>)}</nav>
      <div className="sidebar-bottom">
        <div className="upgrade-card"><div className="upgrade-icon"><Sparkles size={16}/></div><p className="upgrade-title">Make room for better.</p><p className="upgrade-copy">Small steps. Big shifts. Keep showing up.</p><a href="#pricing">Explore Ritual Plus <ArrowUpRight size={14}/></a></div>
        <button className="nav-item"><Settings2 size={17}/>Settings</button>
        <div className="profile"><div className="avatar">A</div><div><strong>Alex Morgan</strong><small>Free plan</small></div><MoreHorizontal size={18}/></div>
      </div>
    </aside>

    <main className="main-content">
      <header className="topbar"><div className="crumb">Workspace <span>/</span> <b>{activeNav}</b></div><div className="top-actions"><span className="date-pill">{greeting}</span><button className="icon-btn" aria-label="More options"><MoreHorizontal size={19}/></button></div></header>
      <div className="page-wrap">
        <section className="hero-grid" ref={heroRef}>
          <div className="hero-copy">
            <div className="eyebrow intro-animate"><span className="eyebrow-line"/> YOUR DAILY PRACTICE</div>
            <h1 className="intro-animate">Build a life<br/>that <em>flows.</em></h1>
            <p className="hero-description intro-animate">Consistency isn't about doing everything.<br/>It's about doing the little things, often.</p>
            <div className="hero-meta intro-animate"><span className="meta-dot"/> YOUR MOMENTUM, IN MOTION</div>
          </div>
          <div className="glass-stage intro-animate">
            <div className="stage-glow"/>
            <GlassSlabLogo logo="/logo.svg" slabs={17} renderMode={"detailed"} thickness={0.026} depth={1.25} elevation={38} ior={1.34} density={0.25} colors={["#f97316","#171717","#171717","#171717","#171717"]} reflectivity={1.55} logoScale={0.76} backgroundImage={"/background.svg"} backgroundX={0} backgroundY={0} backgroundScale={1} backgroundTint={"#000000"} backgroundTintOpacity={0} colorOpacity={0.47} style={{ height: 520 }} />
            <div className="stage-caption"><span>01 / THE PRACTICE</span><span>SHOW UP, EVERY DAY.</span></div>
          </div>
        </section>

        <section className="stats-row">
          <div className="stat-card stat-dark"><div className="stat-top"><span>DAILY COMPLETION</span><Target size={17}/></div><div className="stat-value">{progress}<small>%</small></div><div className="progress-track"><span style={{ width: `${progress}%` }}/></div><div className="stat-foot">{completed} of {habits.length} habits completed</div></div>
          <div className="stat-card"><div className="stat-top"><span>CURRENT STREAK</span><Flame size={17}/></div><div className="stat-value">08<small> days</small></div><div className="stat-foot"><span className="positive">↗ 2 days</span> from last week</div></div>
          <div className="stat-card"><div className="stat-top"><span>WEEKLY CONSISTENCY</span><TrendingUp size={17}/></div><div className="week-bars">{week.map((v,i) => <button key={i} aria-label={`Toggle day ${i+1}`} onClick={() => setWeek(old => old.map((x,j) => j===i ? !x : x))} className={`week-bar ${v ? 'filled' : ''}`}><span/></button>)}</div><div className="week-labels">{days.map((d,i)=><span key={i}>{d}</span>)}</div></div>
        </section>

        <section className="habits-section">
          <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> KEEP YOUR RHYTHM</div><h2>Your daily rituals<span className="heading-period">.</span></h2></div><button className="add-button" onClick={() => setShowAdd(true)}><Plus size={17}/> Add a habit</button></div>
          <div className="habit-table">
            <div className="table-head"><span>HABIT</span><span>TIME</span><span>STREAK</span><span>STATUS</span></div>
            {habits.map(h => <div className={`habit-row ${h.done ? 'is-done' : ''}`} key={h.id}>
              <button className={`check-control ${h.done ? 'checked' : ''}`} onClick={() => toggleHabit(h.id)} aria-label={`Mark ${h.name} ${h.done ? 'incomplete' : 'complete'}`}>{h.done && <Check size={14}/>}</button>
              <div className="habit-name"><strong>{h.name}</strong><span className={`category ${h.tint}`}>{h.category}</span></div>
              <span className="habit-time">{h.time}</span><span className="streak"><Flame size={14}/>{h.streak} days</span>
              <span className={`status ${h.done ? 'complete' : ''}`}>{h.done ? 'COMPLETED' : 'UP NEXT'}</span>
              <button className="row-more" aria-label="Habit options" onClick={() => setHabits(items => items.filter(x => x.id !== h.id))}><MoreHorizontal size={18}/></button>
            </div>)}
            {habits.length === 0 && <div className="empty-state">A little space for a new ritual. Add your first habit above.</div>}
          </div>
          <div className="table-foot"><span>YOUR PACE. YOUR PROGRESS.</span><span>{completed}/{habits.length} COMPLETE TODAY</span></div>
        </section>
        <footer className="footer"><span>© 2026 RITUAL STUDIO</span><span>MADE FOR THE LONG GAME <span className="footer-dot">●</span></span></footer>
      </div>
    </main>

    {showAdd && <div className="modal-backdrop" onClick={() => setShowAdd(false)}><div className="modal" onClick={e => e.stopPropagation()}><div className="modal-head"><div><span className="eyebrow">START SMALL</span><h3>Add a ritual.</h3></div><button className="icon-btn" onClick={() => setShowAdd(false)}><X size={19}/></button></div><label htmlFor="habit-name">HABIT NAME</label><input id="habit-name" autoFocus value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addHabit()} placeholder="e.g. Take a mindful walk"/><button className="add-button modal-submit" onClick={addHabit}><Plus size={17}/> Create habit</button></div></div>}
  </div>
}