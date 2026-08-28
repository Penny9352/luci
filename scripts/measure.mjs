import puppeteer from 'puppeteer-core'
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const b=await puppeteer.launch({executablePath:CHROME,headless:true,args:['--no-sandbox']})
for (const v of [{n:'desktop',w:1440,h:900},{n:'laptop',w:1512,h:945},{n:'mobile',w:390,h:844}]) {
  const p=await b.newPage()
  await p.setViewport({width:v.w,height:v.h,deviceScaleFactor:1})
  await p.goto('http://localhost:4173/',{waitUntil:'networkidle0'})
  await p.evaluate(()=>document.fonts.ready)
  await new Promise(r=>setTimeout(r,4200))
  const r=await p.evaluate(()=>{
    const g=s=>{const e=document.querySelector(s);if(!e)return null;const b=e.getBoundingClientRect();return{top:Math.round(b.top),bottom:Math.round(b.bottom),h:Math.round(b.height),w:Math.round(b.width)}}
    const rails=[...document.querySelectorAll('.stage__rail,.interlude__rail')].map(e=>{const b=e.getBoundingClientRect();return{t:b.top+scrollY,b:b.bottom+scrollY,x:Math.round(b.left)}}).sort((a,b)=>a.t-b.t)
    const gaps=[];for(let i=1;i<rails.length;i++)gaps.push(`${Math.round(rails[i].t-rails[i-1].b)}@${rails[i-1].x}→${rails[i].x}`)
    return{doc:document.documentElement.scrollHeight,vh:innerHeight,
      win:g('.ws__device'),modes:g('.ws__tabs'),side:g('.ws__side'),composer:g('.ws__canvas'),file:g('.ws__badge'),gaps}
  })
  console.log(`\n=== ${v.n} ${v.w}x${v.h} | 文档 ${r.doc} ===`)
  console.log(' 产品窗口', JSON.stringify(r.win))
  // 加了 Tab 条之后，首屏放不下「定位 + Tab + 整幅产品窗口」三件。
  // 断言改为：Tab 条必须完整在折线内（用户要求 Tab 在第一屏），
  // 产品窗口露头即可 —— 底部探出折线是邀请下滚，不是缺陷。
  console.log(' 窗口底 ', r.win&&r.win.bottom, r.win && r.win.bottom<=r.vh ? '完整可见' : '探出折线 '+(r.win.bottom-r.vh)+'px（预期行为）')
  console.log(' 窗口头 ', r.win&&r.win.top, r.win && r.win.top < r.vh - 80 ? '✓ 折线上已露出产品' : '✗ 首屏看不到产品')
  console.log(' Tab 条 ', JSON.stringify(r.modes), r.modes && r.modes.bottom<=r.vh ? '✓ 在首屏内':'✗ 被折线切掉')
  console.log(' 侧栏   ', JSON.stringify(r.side))
  if(r.gaps.length) console.log(' 轨接缝 ', r.gaps.join('  '))
  await p.close()
}
await b.close()
