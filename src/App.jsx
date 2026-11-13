import { useState, useEffect, useRef } from 'react'
import Bouquet from './Lily.jsx'
import { Balloons, Sparkles } from './Fx.jsx'
import * as C from './config.js'

const Back = ({ go }) => <button className="back" onClick={() => go('menu')}>← Back</button>
function Pic({ src, className, style }) {
  const [bad, setBad] = useState(false)
  return bad ? <div className={'ph ' + (className || '')} style={style} /> : <img className={className} style={style} src={src} onError={() => setBad(true)} />
}
function Intro({ go }) {
  return <div className="center col"><Bouquet onClick={() => go('login')} /><p className="script hint">tap the flowers 💙</p></div>
}
function Login({ go }) {
  const [u, setU] = useState(''), [p, setP] = useState(''), [msg, setMsg] = useState(''), [shake, setShake] = useState(0), [n, setN] = useState(0)
  const submit = () => {
    if (u.trim().toLowerCase() === C.USERNAME && p.trim() === C.PASSWORD) return go('burst')
    setMsg(C.WRONG[n % C.WRONG.length]); setN(n + 1); setShake(shake + 1)
  }
  return <div className="center">
    <div className="card login" key={shake} style={{ animation: shake ? 'shake .5s' : 'pop .8s both' }}>
      <h1 className="script">Welcome, beautiful</h1>
      <p className="sm">Enter your details to open your surprise</p>
      <input placeholder="Username" value={u} onChange={e => setU(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} />
      <input placeholder="Password (hint: your birthday, DDMMYYYY)" type="password" value={p} onChange={e => setP(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} />
      <button className="btn" onClick={submit}>Open my surprise</button>
      {msg && <p className="msg script">{msg}</p>}
    </div></div>
}
function Home({ go }) {
  const [pop, setPop] = useState(false)
  const open = () => { setPop(true); setTimeout(() => go('menu'), 2400) }
  return <div className="center col">
    {pop && <Balloons blue n={30} />}
    <h1 className="script big rise">Happy Birthday, baby!</h1>
    <div className={'gift' + (pop ? ' jump' : '')} onClick={open}>
      <svg viewBox="0 0 200 200" width="230"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stopColor="#fff8e8" /><stop offset="1" stopColor="#ecdcb8" /></linearGradient></defs>
        <path d="M30 80 L100 55 L170 80 L100 108Z" fill="#fffdf4" stroke="#3558b0" strokeWidth="2" />
        <path d="M30 80 L100 108 L100 180 L30 150Z" fill="url(#g)" stroke="#3558b0" strokeWidth="2" />
        <path d="M170 80 L100 108 L100 180 L170 150Z" fill="#efe2c4" stroke="#3558b0" strokeWidth="2" />
        <path d="M85 60 L115 105 L115 178 L85 178Z" fill="#3558b0" opacity=".9" />
        <path d="M100 56 C60 10 40 50 100 58 C160 50 140 10 100 56Z" fill="#3b63b8" /><circle cx="100" cy="58" r="9" fill="#284a96" />
        <path d="M60 135 c-6-8 6-14 10-6 c4-8 16-2 10 6 l-10 10z" fill="#3b63b8" transform="translate(-8 0)" /></svg>
    </div>
    <p className="script sub">You have a surprise waiting for you</p>
  </div>
}
const TILES = [['photos', '🖼️'], ['music', '🎵'], ['flowers', '💐'], ['cake', '🎂']]
function Menu({ go }) {
  const [fx, setFx] = useState(false)
  const pick = (k) => { if (k === 'photos') { setFx(true); setTimeout(() => go('photos'), 1300) } else go(k) }
  return <div className="center col">
    {fx && <Sparkles n={30} />}
    <div className="grid">{TILES.map(([k, e], i) => <button key={k} className={'tile' + (fx && k === 'photos' ? ' spin' : '')} style={{ animationDelay: i * .12 + 's' }} onClick={() => pick(k)}><span>{e}</span></button>)}</div>
    <p className="script sub">Click one to proceed!</p></div>
}
const POS = [[6, 8, -6, 200], [34, 4, 3, 260], [68, 8, 5, 210], [4, 50, 4, 230], [34, 44, -3, 200], [68, 48, -5, 230]]
function Photos({ go }) {
  return <div className="stage photos"><Back go={go} />
    {C.PHOTOS.map((p, i) => (
      <div key={i} className="polaroid" style={{ left: POS[i % 6][0] + '%', top: POS[i % 6][1] + '%', '--rot': POS[i % 6][2] + 'deg', animationDelay: i * .25 + 's' }}>
        <Pic src={p} /><div className="tape" />
      </div>
    ))}
    <Balloons n={6} />
  </div>
}
function Music({ go }) {
  return <div className="center"><div className="player"><Back go={go} />
    <div className="screen"><iframe src={`https://www.youtube.com/embed/${C.YT_ID}?rel=0`} allow="autoplay; encrypted-media" allowFullScreen />
      <p className="script">Our song 💙</p></div><div className="vinyl" /></div></div>
}
function Flowers({ go }) {
  return <div className="center"><div className="player wide"><Back go={go} />
    <div className="list">{C.FLOWER_NOTES.map((t, i) => <div key={i} className="note" style={{ animationDelay: i * .18 + 's' }}>🌷 {t}</div>)}</div>
    <div className="bq"><Bouquet w={300} h={380} /><p className="script">Flowers for you!</p></div></div></div>
}
function Cake({go}){
 const [out,setOut]=useState(false)
 const blow=()=>{setOut(true);setTimeout(()=>go('memory'),1700)}
 return (
  <div className="center col">
   <Back go={go}/>
   {out&&<Sparkles n={30}/>}
   <div className="cake" onClick={blow}>
    <svg viewBox="0 0 220 240" width="300">
     {[80,110,140].map(x=>(
      <g key={x}>
       <rect x={x-4} y="50" width="9" height="46" rx="3" fill="#5b82d6"/>
       {!out&&<ellipse className="flame" cx={x} cy="40" rx="7" ry="13" fill="#ffc94a"/>}
      </g>
     ))}
     <path d="M45 110 Q45 96 62 96 H158 Q175 96 175 110 V160 H45Z" fill="#fff6e3" stroke="#3558b0" strokeWidth="2"/>
     <path d="M45 118 q14 14 28 0 t28 0 t28 0 t28 0 t26 0" fill="none" stroke="#7fa8ee" strokeWidth="5"/>
     <ellipse cx="110" cy="168" rx="85" ry="16" fill="#a8c6f5" stroke="#3558b0" strokeWidth="2"/>
     <path d="M45 160 H175 V166 H45Z" fill="#ecdcb8"/>
     <path d="M110 148 c-8-8 4-14 8-6 c4-8 14-2 8 6 l-8 8z" fill="#3b63b8" transform="translate(-6 -6)"/>
    </svg>
   </div>
   <p className="script sub">{out?'Make a wish… 💫':'Blow your candle, my baby!'}</p>
  </div>
 )
}
function Memory({go}){
 return <div className="stage memory"><Back go={go}/>
  <Balloons n={8}/>
  <div className="frame"><Pic src={C.KID_PHOTO}/><span className="script cap">happy birthday! my baby!</span></div>
  <div className="letter"><h2 className="script">Happy birthday, baby!</h2><p>{C.LETTER}</p></div></div>
}
const PAGES={intro:Intro,login:Login,home:Home,menu:Menu,photos:Photos,music:Music,flowers:Flowers,cake:Cake,memory:Memory}
export default function App(){
 const [s,setS]=useState('intro')
 const au=useRef(null)
 const play=()=>au.current&&au.current.play().catch(()=>{})
 const nav=(n)=>{
  if(n==='burst')play()
  else if(n==='music')au.current&&au.current.pause()
  else if(s==='music')play()
  setS(n)
 }
 useEffect(()=>{if(s==='burst'){const t=setTimeout(()=>setS('home'),5200);return()=>clearTimeout(t)}},[s])
 const P=PAGES[s]
 return <div className="bg"><audio ref={au} src="/song.mp3" loop preload="auto"/>
  <div key={s} className="page">{s==='burst'?<div className="center col"><Balloons n={30} flowers={10}/><h1 className="script big rise">Welcome, Marvy 💙</h1></div>:<P go={nav}/>}</div></div>
}
