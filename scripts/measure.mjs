import puppeteer from 'puppeteer-core'
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const b=await puppeteer.launch({executablePath:CHROME,headless:true,args:['--no-sandbox']})
for (const v of [{n:'desktop',w:1440,h:900},{n:'mobile',w:390,h:844}]) {
  const p=await b.newPage()
  await p.setViewport({width:v.w,height:v.h,deviceScaleFactor:1})
  await p.goto('http://localhost:4173/',{waitUntil:'networkidle0'})
  await p.evaluate(()=>document.fonts.ready)
  await new Promise(r=>setTimeout(r,4900)) // 产出卡刚浮出的时刻
  const r=await p.evaluate(()=>{
    const out={doc:document.documentElement.scrollHeight,sections:[],railGaps:[],file:null}
    for (const el of document.querySelectorAll('.hero,.stage,.interlude,.start')) {
      const b=el.getBoundingClientRect()
      out.sections.push({cls:el.className.split(' ')[0],h:Math.round(b.height)})
    }
    const rails=[...document.querySelectorAll('.stage__rail,.interlude__rail')]
      .map(e=>{const b=e.getBoundingClientRect();return{top:b.top+scrollY,bottom:b.bottom+scrollY,x:Math.round(b.left)}})
      .sort((a,b)=>a.top-b.top)
    for (let i=1;i<rails.length;i++) out.railGaps.push({gap:Math.round(rails[i].top-rails[i-1].bottom),xPrev:rails[i-1].x,xNext:rails[i].x})
    const f=document.querySelector('.sim__file')
    if (f){const b=f.getBoundingClientRect();out.file={bottom:Math.round(b.bottom),vh:innerHeight,visible:b.bottom<=innerHeight,opacity:getComputedStyle(f).opacity}}
    return out
  })
  console.log(`\n=== ${v.n} (${v.w}x${v.h}) ===`)
  console.log('文档高:',r.doc)
  console.log('各节高:',r.sections.map(s=>`${s.cls}=${s.h}`).join('  '))
  console.log('轨接缝:',r.railGaps.map(g=>`gap=${g.gap} x:${g.xPrev}→${g.xNext}`).join('  '))
  console.log('产出卡:',JSON.stringify(r.file))
  await p.close()
}
await b.close()
