import{j as e,m as t}from"./chunk-C02y-XeT.js";import{r as o}from"./chunk-DtX1tuCI.js";import{p as a,f as r}from"./chunk-BuVI32lr.js";import{t as n}from"./index-B2inpYTP.js";import{a as s,b as i}from"./chunk-CJaK7wvR.js";import"./chunk-BeE17Zin.js";const l=r`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-10px, -10px) rotate(180deg); }
`,c=r`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`,d=a.div`
  background: linear-gradient(135deg, ${({theme:e})=>e.color.warm.light}20, ${({theme:e})=>e.color.pet.accent}20);
  border: 2px solid ${({theme:e})=>e.color.pet.accent};
  border-radius: ${n.radius.card};
  padding: ${n.space.lg};
  margin-bottom: ${n.space.lg};
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${({theme:e})=>e.color.pet.accent}10 0%, transparent 70%);
    animation: ${l} 6s ease-in-out infinite;
  }
`,m=a.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 ${n.space.sm} 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  z-index: 1;
`,p=a.p`
  font-size: 14px;
  color: ${({theme:e})=>e.color.textMuted};
  margin: 0 0 ${n.space.lg} 0;
  line-height: 1.5;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  z-index: 1;
`,h=a.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${n.space.sm};
  margin-bottom: ${n.space.lg};
  position: relative;
  z-index: 1;
`,u=a(t.button)`
  background: ${({theme:e,isSelected:t})=>t?e.color.pet.primary:e.color.surface};
  color: ${({theme:e,isSelected:t})=>t?"white":e.color.text};
  border: 2px solid ${({theme:e,isSelected:t})=>t?e.color.pet.primary:e.color.border};
  border-radius: ${n.radius.button};
  padding: ${n.space.sm} ${n.space.md};
  font-size: 12px;
  font-weight: 600;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: all ${n.motion.base} ${n.motion.easing};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${n.space.xs};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${n.color.shadow};
  }

  &:active {
    transform: translateY(0);
  }
`,f=a.div`
  font-size: 14px;
  font-weight: 700;
`,x=a.div`
  font-size: 10px;
  opacity: 0.8;
`,g=a.div`
  background: ${({theme:e})=>e.color.surface};
  border: 1px solid ${({theme:e})=>e.color.border};
  border-radius: ${n.radius.button};
  padding: ${n.space.md};
  margin-bottom: ${n.space.lg};
  position: relative;
  z-index: 1;
`,$=a.div`
  font-size: 14px;
  color: ${({theme:e})=>e.color.text};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.4;
  text-align: center;
`,b=a(t.button)`
  background: linear-gradient(135deg, ${({theme:e})=>e.color.pet.primary}, ${({theme:e})=>e.color.pet.accent});
  color: white;
  border: none;
  border-radius: ${n.radius.button};
  padding: ${n.space.md} ${n.space.lg};
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: all ${n.motion.base} ${n.motion.easing};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${n.space.sm};
  width: 100%;
  position: relative;
  z-index: 1;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 25px ${n.color.shadow};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,y=a.span`
  font-size: 16px;
  animation: ${c} 2s ease-in-out infinite;
`,j=[{amount:5,label:"кофе",emoji:"☕"},{amount:10,label:"обед",emoji:"🍽️"},{amount:25,label:"ужин",emoji:"🌙"}],v=["спасибо за поддержку! твоя забота помогает развивать gropy 💚","ты делаешь мир добрее, поддерживая заботу о ментальном здоровье ✨","каждая поддержка — это шаг к более тёплому и понимающему миру 🌿","твоя поддержка помогает другим найти место, где можно просто быть 💫"],w=({className:t})=>{const[a,r]=o.useState(null),[n,l]=o.useState(!1),[c,w]=o.useState(!1),k=o.useCallback(e=>{r(e),s("success")},[]),z=o.useCallback(()=>{return e=void 0,t=null,o=function*(){if(a&&!n){l(!0);try{(yield i.openStarsPayment(a,`Поддержка Gropy - ${a} ⭐`))&&(w(!0),s("success"),setTimeout(()=>{w(!1),r(null)},3e3))}catch(e){s("error")}finally{l(!1)}}},new Promise((a,r)=>{var n=e=>{try{i(o.next(e))}catch(t){r(t)}},s=e=>{try{i(o.throw(e))}catch(t){r(t)}},i=e=>e.done?a(e.value):Promise.resolve(e.value).then(n,s);i((o=o.apply(e,t)).next())});var e,t,o},[a,n]);return c?e.jsxs(d,{className:t,children:[e.jsx(m,{children:"спасибо! 💚"}),e.jsx(p,{children:"твоя поддержка помогает развивать gropy и делать мир добрее"}),e.jsx(y,{children:"💚"})]}):e.jsxs(d,{className:t,children:[e.jsx(m,{children:"поддержать gropy"}),e.jsx(p,{children:"если gropy приносит тебе тепло и поддержку, можешь поддержать развитие проекта"}),e.jsx(h,{children:j.map(t=>e.jsxs(u,{isSelected:a===t.amount,onClick:()=>k(t.amount),whileHover:{scale:1.02},whileTap:{scale:.98},transition:{duration:.1,ease:"easeOut"},children:[e.jsxs(f,{children:[t.emoji," ",t.amount]}),e.jsx(x,{children:t.label})]},t.amount))}),a&&e.jsx(g,{children:e.jsx($,{children:v[Math.floor(Math.random()*v.length)]})}),e.jsxs(b,{onClick:z,disabled:!a||n,whileHover:{scale:1.02},whileTap:{scale:.98},children:[e.jsx(y,{children:"💚"}),n?"обрабатываю...":`поддержать ${a||""} ⭐`]})]})};export{w as SupportCard};
