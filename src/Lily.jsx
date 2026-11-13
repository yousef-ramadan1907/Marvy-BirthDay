import {useEffect,useRef} from 'react'

const PAL={
  pink:['#fff0f6','#f59bbd','#c2306f'],
  white:['#ffffff','#f6efe6','#e0cdb6'],
  red:['#ff8a7a','#d8232f','#7d0a1c'],
  yellow:['#fff7c2','#f6cf4a','#d18a12'],
  peach:['#fffaf0','#ffc9a8','#e5805e']
}
const names=Object.keys(PAL)
const clamp=(v)=>Math.max(0,Math.min(1,v))
const ease=(t)=>1-Math.pow(1-t,3)

function petal(c,L,W,col,curl){
  const g=c.createLinearGradient(0,0,0,-L)
  g.addColorStop(0,'#cfe08a');g.addColorStop(.18,col[0]);g.addColorStop(.55,col[1]);g.addColorStop(1,col[2])
  c.beginPath();c.moveTo(0,0)
  c.bezierCurveTo(W*.9,-L*.2,W*1.1,-L*.7,W*.15,-L*(1+curl*.05))
  c.lineTo(0,-L*1.04)
  c.lineTo(-W*.15,-L*(1+curl*.05))
  c.bezierCurveTo(-W*1.1,-L*.7,-W*.9,-L*.2,0,0)
  c.fillStyle=g;c.fill()
  c.save();c.clip()
  const s=c.createLinearGradient(-W,0,W,0)
  s.addColorStop(0,'rgba(0,0,0,.18)');s.addColorStop(.5,'rgba(255,255,255,.18)');s.addColorStop(1,'rgba(0,0,0,.14)')
  c.fillStyle=s;c.fillRect(-W*1.2,-L*1.1,W*2.4,L*1.2)
  c.strokeStyle='rgba(120,40,60,.16)';c.lineWidth=L*.012
  for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(0,-L*.04);c.quadraticCurveTo(i*W*.2,-L*.5,i*W*.14,-L*.95);c.stroke()}
  c.fillStyle='rgba(110,20,50,.45)'
  for(let i=0;i<22;i++){
    const y=-L*(.12+Math.random()*.4),x=(Math.random()-.5)*W*(.9-Math.abs(y/L)*.7)
    c.beginPath();c.arc(x,y,L*(.008+Math.random()*.012),0,7);c.fill()
  }
  c.restore()
}

export function drawLily(c,x,y,S,rot,pal,open=1,tilt=.8){
  const col=PAL[pal],o=ease(clamp(open))
  c.save();c.translate(x,y);c.rotate(rot);c.scale(1,tilt)
  c.shadowColor='rgba(40,20,60,.28)';c.shadowBlur=S*.12;c.shadowOffsetY=S*.05
  const L=S*(.15+.85*o),W=S*.28*(.5+.5*o)
  for(let k=0;k<6;k++){
    const inner=k%2,a=k*60*Math.PI/180+(inner?0:.05)
    c.save();c.rotate(a)
    c.scale(1,inner?.94:1)
    petal(c,L*(inner?.95:1),W*(inner?1.1:1),col,o);c.restore()
  }
  c.shadowColor='transparent'
  const t=c.createRadialGradient(0,0,0,0,0,S*.18);t.addColorStop(0,'rgba(200,230,110,.9)');t.addColorStop(1,'rgba(200,230,110,0)')
  c.fillStyle=t;c.beginPath();c.arc(0,0,S*.18,0,7);c.fill()
  if(o>.4)for(let k=0;k<6;k++){
    const a=k*60*Math.PI/180+.3,l=S*.5*o,ex=Math.sin(a)*l*.55,ey=-Math.cos(a)*l*.55
    c.strokeStyle='#e8efc0';c.lineWidth=S*.012;c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(ex*.4,ey*.4-S*.04,ex,ey);c.stroke()
    c.save();c.translate(ex,ey);c.rotate(a);c.fillStyle='#8a3d10';c.beginPath();c.ellipse(0,0,S*.012,S*.045,0,0,7);c.fill()
    c.fillStyle='rgba(255,190,90,.8)';c.beginPath();c.ellipse(0,-S*.01,S*.006,S*.025,0,0,7);c.fill();c.restore()
  }
  c.restore()
}

const cache={}
export function lilyURL(i){
  const p=names[i%names.length];if(cache[p])return cache[p]
  const cv=document.createElement('canvas');cv.width=cv.height=260
  drawLily(cv.getContext('2d'),130,130,150,Math.random()*3,p,1,1);return cache[p]=cv.toDataURL()
}

const FL=[[.5,.22,.34,'pink',0,0],[.3,.34,.3,'white',-.5,1],[.7,.33,.3,'yellow',.6,2],[.42,.44,.32,'red',.3,3],[.62,.47,.3,'pink',-.4,4],[.25,.52,.26,'peach',.8,5],[.76,.54,.26,'white',-.8,6],[.5,.6,.3,'white',.1,7],[.37,.65,.22,'yellow',-.3,8],[.66,.66,.22,'red',.4,9]]

export default function Bouquet({w=520,h=620,onClick}){
  const ref=useRef()
  useEffect(()=>{
    const cv=ref.current,dpr=Math.min(2,devicePixelRatio||1);cv.width=w*dpr;cv.height=h*dpr
    const c=cv.getContext('2d');c.scale(dpr,dpr)
    const bx=w*.5,by=h*.97
    FL.forEach(([fx,fy,s,,,i])=>{
      const x=fx*w,y=fy*h
      const st=c.createLinearGradient(bx,by,x,y);st.addColorStop(0,'#3f7a3a');st.addColorStop(1,'#7cb45a')
      c.strokeStyle=st;c.lineWidth=w*.014;c.lineCap='round';c.beginPath();c.moveTo(bx,by)
      c.quadraticCurveTo(bx+(x-bx)*.2,by-(by-y)*.5,x,y+10);c.stroke()
      if(i%2==0){c.save();c.translate(bx+(x-bx)*.45,by-(by-y)*.45);c.rotate((x<bx?-1:1)*.9)
        const lg=c.createLinearGradient(0,0,0,-90);lg.addColorStop(0,'#2f6a33');lg.addColorStop(1,'#8cc063');c.fillStyle=lg
        c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(14,-45,0,-100);c.quadraticCurveTo(-14,-45,0,0);c.fill();c.restore()}
    })
    FL.slice().sort((a,b)=>a[1]-b[1]).forEach(([fx,fy,s,pal,r])=>drawLily(c,fx*w,fy*h,s*w*.95,r,pal,1,.78))
    c.save();c.translate(bx,by)
    const pg=c.createLinearGradient(-90,-200,90,0);pg.addColorStop(0,'#fffaf0');pg.addColorStop(1,'#cfe0f5')
    c.fillStyle=pg;c.shadowColor='rgba(40,70,140,.3)';c.shadowBlur=18
    c.beginPath();c.moveTo(-w*.26,-h*.3);c.lineTo(w*.26,-h*.3);c.lineTo(w*.05,0);c.lineTo(-w*.05,0);c.closePath();c.fill()
    c.shadowColor='transparent'
    const by2=-h*.2;c.fillStyle='#3b63b8'
    ;[-1,1].forEach(d=>{c.beginPath();c.moveTo(0,by2);c.bezierCurveTo(d*60,by2-45,d*85,by2+20,d*14,by2+8);c.fill()
      c.beginPath();c.moveTo(0,by2+4);c.lineTo(d*26,by2+70);c.lineTo(d*8,by2+62);c.closePath();c.fill()})
    c.fillStyle='#284a96';c.beginPath();c.ellipse(0,by2+4,12,10,0,0,7);c.fill();c.restore()
  },[w,h])
  
  return <canvas ref={ref} className="bq-in" onClick={onClick} style={{width:w,height:h,maxWidth:'92vw',maxHeight:'78vh',cursor:onClick?'pointer':'default'}}/>
}
