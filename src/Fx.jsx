import { useMemo } from 'react'
import { lilyURL } from './Lily.jsx'
const BLUES = ['#7fa8ee', '#a8c6f5', '#4f7fd8', '#cfe0fb', '#fff6e3']
const MIX = ['#7fa8ee', '#f6b8cf', '#f7d96b', '#fff6e3', '#a8c6f5', '#e8707f', '#c3a6f2']
export function Balloons({ blue = false, n = 34, flowers = 0 }) {
    const items = useMemo(() => Array.from({ length: n }, (_, i) => ({ i, l: Math.random() * 100, s: 70 + Math.random() * 80, d: Math.random() * 1.6, t: 3.8 + Math.random() * 2.6, c: (blue ? BLUES : MIX)[i % 5 + (blue ? 0 : i % 2)] || '#7fa8ee', dx: (Math.random() - .5) * 80 })), [n, blue])
    const fl = useMemo(() => Array.from({ length: flowers }, (_, i) => ({ i, l: Math.random() * 95, s: 50 + Math.random() * 70, d: Math.random() * 2.5, t: 4 + Math.random() * 3, r: Math.random() * 360 })), [flowers])
    return <div className="fx">
        {fl.map(f => <img key={'f' + f.i} src={lilyURL(f.i)} className="fl" style={{ left: f.l + '%', width: f.s, animationDelay: f.d + 's', animationDuration: f.t + 's', '--r': f.r + 'deg' }} />)}
        {items.map(b => <div key={b.i} className="bal" style={{ left: b.l + '%', width: b.s, height: b.s * 1.22, animationDelay: b.d + 's', animationDuration: b.t + 's', '--c': b.c, '--dx': b.dx + 'px' }}><i /></div>)}
    </div>
}
export function Sparkles({ n = 26 }) {
    const a = useMemo(() => Array.from({ length: n }, (_, i) => ({ i, x: (Math.random() - .5) * 520, y: (Math.random() - .5) * 420, d: Math.random() * .5 })), [n])
    return <div className="spark">{a.map(s => <b key={s.i} style={{ '--x': s.x + 'px', '--y': s.y + 'px', animationDelay: s.d + 's' }}>✦</b>)}</div>
}
