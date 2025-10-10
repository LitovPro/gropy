import{j as e,m as t}from"./chunk-C02y-XeT.js";import{r as a}from"./chunk-DtX1tuCI.js";import{p as r}from"./chunk-BuVI32lr.js";import{t as s}from"./index-B2inpYTP.js";import{t as o,a as n}from"./chunk-CJaK7wvR.js";const i=r.div`
  background: ${({theme:e})=>e.color.surface};
  border: 2px solid ${({theme:e})=>e.color.border};
  border-radius: ${s.radius.card};
  padding: ${s.space.lg};
  margin-bottom: ${s.space.lg};
  text-align: center;
`,l=r.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 ${s.space.md} 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`,c=r.p`
  font-size: 14px;
  color: ${({theme:e})=>e.color.textMuted};
  margin: 0 0 ${s.space.lg} 0;
  line-height: 1.5;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`,m=r(t.button)`
  background: linear-gradient(135deg, ${({theme:e})=>e.color.pet.primary}, ${({theme:e})=>e.color.pet.accent});
  color: white;
  border: none;
  border-radius: ${s.radius.button};
  padding: ${s.space.md} ${s.space.lg};
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: all ${s.motion.base} ${s.motion.easing};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${s.space.sm};
  margin: 0 auto;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 25px ${s.color.shadow};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,d=r.span`
  font-size: 16px;
`,p={ritualComplete:{title:"ритуал выполнен ✨",message:"сегодня я сделал одно маленькое доброе дело для себя",emoji:"🌿"},diaryEntry:{title:"размышления дня",message:"поделился своими чувствами в gropy",emoji:"📖"},streak:{title:"серия заботы",message:"уже {days} дней подряд забочусь о себе",emoji:"💚"},general:{title:"gropy moment",message:"место, где можно просто быть",emoji:"🌿"}},g=({type:t,customMessage:r,days:s,className:g})=>{const[u,f]=a.useState(!1),h=p[t]||p.general,y=r||h.message.replace("{days}",(null==s?void 0:s.toString())||"0"),x=a.useCallback(()=>{return e=void 0,t=null,a=function*(){if(!u){f(!0);try{const e=`${h.emoji} ${h.title}\n\n${y}\n\n#gropy #selfcare #mindfulness`;(yield o(e))?n("success"):(yield navigator.clipboard.writeText(e),alert("текст скопирован в буфер обмена!"))}catch(e){try{yield navigator.clipboard.writeText(`${h.emoji} ${h.title}\n\n${y}\n\n#gropy #selfcare #mindfulness`),alert("текст скопирован в буфер обмена!")}catch(t){alert("не удалось поделиться. попробуйте позже.")}}finally{f(!1)}}},new Promise((r,s)=>{var o=e=>{try{i(a.next(e))}catch(t){s(t)}},n=e=>{try{i(a.throw(e))}catch(t){s(t)}},i=e=>e.done?r(e.value):Promise.resolve(e.value).then(o,n);i((a=a.apply(e,t)).next())});var e,t,a},[y,h,u]);return e.jsxs(i,{className:g,children:[e.jsx(l,{children:h.title}),e.jsx(c,{children:y}),e.jsxs(m,{onClick:x,disabled:u,whileHover:{scale:1.02},whileTap:{scale:.98},transition:{duration:.1,ease:"easeOut"},children:[e.jsx(d,{children:"📤"}),u?"делюсь...":"поделиться"]})]})};export{g as S};
