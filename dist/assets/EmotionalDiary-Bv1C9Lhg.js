import{j as e,A as t,m as o}from"./chunk-C02y-XeT.js";import{r as i}from"./chunk-DtX1tuCI.js";import{p as r}from"./chunk-BuVI32lr.js";import{u as a,p as n,c as l,t as s}from"./index-B2inpYTP.js";import{S as d}from"./chunk-BG1X0chb.js";import"./chunk-BeE17Zin.js";import"./chunk-CJaK7wvR.js";const p={sun:"солнце",clouds:"облака",rain:"дождь",wind:"ветер",storm:"гроза",rainbow:"радуга",moon:"луна",stars:"звёзды",leaves:"листья"},c={sun:"☀️",clouds:"☁️",rain:"🌧️",wind:"🌬️",storm:"⛈️",rainbow:"🌈",moon:"🌙",stars:"⭐",leaves:"🍃"},m={1:"слабо",2:"средне",3:"сильно"},h=r.div`
  padding: ${s.space.lg};
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    padding: ${s.space.md};
  }
`,g=r.div`
  text-align: center;
  margin-bottom: ${s.space.xl};
  
  @media (max-width: 480px) {
    margin-bottom: ${s.space.lg};
  }
`,y=r.h2`
  font-size: ${s.typography.fontSize["2xl"]};
  font-weight: ${s.typography.fontWeight.semibold};
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 ${s.space.sm} 0;
  font-family: ${s.typography.fontFamily.primary};
  line-height: ${s.typography.lineHeight.tight};
  
  @media (max-width: 480px) {
    font-size: ${s.typography.fontSize.xl};
  }
`,$=r.p`
  font-size: ${s.typography.fontSize.base};
  color: ${({theme:e})=>e.color.textMuted};
  margin: 0;
  font-family: ${s.typography.fontFamily.primary};
  line-height: ${s.typography.lineHeight.relaxed};
  
  @media (max-width: 480px) {
    font-size: ${s.typography.fontSize.sm};
  }
`,f=r.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${s.space.sm};
  margin-bottom: ${s.space.lg};
  
  @media (max-width: 480px) {
    gap: ${s.space.xs};
  }
`,x=r(o.div)`
  background: ${({theme:e,isSelected:t})=>t?`linear-gradient(135deg, ${e.color.pet.accent}20, ${e.color.warm.medium}20)`:e.color.surface};
  border: 3px solid ${({theme:e,isSelected:t})=>t?e.color.pet.accent:e.color.border};
  border-radius: ${s.radius.card};
  padding: ${s.space.lg};
  text-align: center;
  cursor: pointer;
  transition: all ${s.motion.fast} ${s.motion.easing};
  position: relative;
  overflow: hidden;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: ${({theme:e,isSelected:t})=>t?`0 4px 16px ${e.color.pet.accent}30`:`0 2px 8px ${e.color.border}20`};
  padding: ${s.space.md} ${s.space.xs};
  
  @media (max-width: 480px) {
    min-height: 80px;
    padding: ${s.space.sm} ${s.space.xs};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${({theme:e})=>e.color.warm.light}10, transparent);
    opacity: ${({isSelected:e})=>e?1:0};
    transition: opacity ${s.motion.base} ${s.motion.easing};
  }

  &:hover {
    border-color: ${({theme:e})=>e.color.pet.accent};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${s.color.shadow};
  }
`,u=r.div`
  font-size: 28px;
  margin-bottom: ${s.space.xs};
  line-height: 1;
  position: relative;
  z-index: 1;
  
  @media (max-width: 480px) {
    font-size: 24px;
  }
`,b=r.div`
  font-size: ${s.typography.fontSize.sm};
  font-weight: ${s.typography.fontWeight.medium};
  color: ${({theme:e})=>e.color.text};
  font-family: ${s.typography.fontFamily.primary};
  line-height: ${s.typography.lineHeight.tight};
  position: relative;
  z-index: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: ${s.typography.fontSize.xs};
  }
`,w=r(o.div)`
  background: ${({theme:e})=>e.color.surface};
  border: 2px solid ${({theme:e})=>e.color.border};
  border-radius: ${s.radius.card};
  padding: ${s.space.lg};
  margin-bottom: ${s.space.lg};
  
  @media (max-width: 480px) {
    padding: ${s.space.md};
    margin-bottom: ${s.space.md};
  }
`,v=r.h3`
  font-size: ${s.typography.fontSize.lg};
  font-weight: ${s.typography.fontWeight.medium};
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 ${s.space.md} 0;
  font-family: ${s.typography.fontFamily.primary};
  line-height: ${s.typography.lineHeight.normal};
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: ${s.typography.fontSize.base};
    margin: 0 0 ${s.space.sm} 0;
  }
`,S=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${s.space.md};
`,j=r(o.button)`
  background: ${({theme:e,isSelected:t})=>t?`linear-gradient(135deg, ${e.color.pet.primary}, ${e.color.warm.medium})`:e.color.bg};
  color: ${({theme:e,isSelected:t})=>t?"white":e.color.text};
  border: 3px solid ${({theme:e,isSelected:t})=>t?e.color.pet.primary:e.color.border};
  border-radius: ${s.radius.button};
  padding: ${s.space.md} ${s.space.lg};
  min-height: 44px;
  font-size: ${s.typography.fontSize.sm};
  
  @media (max-width: 480px) {
    padding: ${s.space.sm} ${s.space.md};
    min-height: 40px;
    font-size: ${s.typography.fontSize.xs};
  }
  font-weight: ${({isSelected:e})=>e?s.typography.fontWeight.semibold:s.typography.fontWeight.medium};
  font-family: ${s.typography.fontFamily.primary};
  cursor: pointer;
  transition: all ${s.motion.fast} ${s.motion.easing};
  position: relative;
  overflow: hidden;
  box-shadow: ${({theme:e,isSelected:t})=>t?`0 4px 12px ${e.color.pet.primary}40`:`0 2px 6px ${e.color.border}20`};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({theme:e,isSelected:t})=>t?`0 6px 16px ${e.color.pet.primary}50`:`0 4px 12px ${e.color.border}30`};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
  
  flex: 1;
  margin: 0 ${s.space.xs};
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`,z=r(o.div)`
  background: ${({theme:e})=>e.color.surface};
  border: 2px solid ${({theme:e})=>e.color.border};
  border-radius: ${s.radius.card};
  padding: ${s.space.lg};
  margin-bottom: ${s.space.lg};
`,k=r.h3`
  font-size: ${s.typography.fontSize.lg};
  font-weight: ${s.typography.fontWeight.medium};
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 ${s.space.md} 0;
  font-family: ${s.typography.fontFamily.primary};
  line-height: ${s.typography.lineHeight.normal};
  text-align: center;
`,H=r.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${s.space.sm};
  margin-bottom: ${s.space.md};
`,F=r(o.button)`
  background: ${({theme:e,isSelected:t})=>t?`linear-gradient(135deg, ${e.color.pet.accent}15, ${e.color.warm.medium}15)`:e.color.bg};
  color: ${({theme:e,isSelected:t})=>t?e.color.pet.accent:e.color.text};
  border: 2px solid ${({theme:e,isSelected:t})=>t?e.color.pet.accent:e.color.border};
  border-radius: ${s.radius.button};
  padding: ${s.space.sm} ${s.space.md};
  font-size: ${s.typography.fontSize.sm};
  font-weight: ${({isSelected:e})=>e?s.typography.fontWeight.semibold:s.typography.fontWeight.normal};
  font-family: ${s.typography.fontFamily.primary};
  cursor: pointer;
  transition: all ${s.motion.fast} ${s.motion.easing};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.3s ease;
  }

  &:hover {
    background: ${({theme:e,isSelected:t})=>t?`linear-gradient(135deg, ${e.color.pet.accent}25, ${e.color.warm.medium}25)`:e.color.surface};
    border-color: ${({theme:e,isSelected:t})=>e.color.pet.accent};
    transform: translateY(-1px);
    box-shadow: ${({theme:e,isSelected:t})=>t?`0 4px 12px ${e.color.pet.accent}30`:`0 2px 8px ${e.color.border}40`};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`,C=r.textarea`
  width: 100%;
  min-height: 80px;
  border: 1px solid ${({theme:e})=>e.color.border};
  border-radius: ${s.radius.button};
  padding: ${s.space.md};
  font-size: ${s.typography.fontSize.sm};
  font-family: ${s.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.text};
  background: ${({theme:e})=>e.color.bg};
  resize: vertical;
  transition: border-color ${s.motion.fast} ${s.motion.easing};

  &:focus {
    outline: none;
    border-color: ${({theme:e})=>e.color.pet.accent};
  }

  &::placeholder {
    color: ${({theme:e})=>e.color.textMuted};
  }
`,W=r(o.div)`
  background: linear-gradient(135deg, ${({theme:e})=>e.color.warm.light}10, ${({theme:e})=>e.color.pet.accent}10);
  border: 2px solid ${({theme:e})=>e.color.pet.accent}40;
  border-radius: ${s.radius.card};
  padding: ${s.space.lg};
  margin-bottom: ${s.space.lg};
  text-align: center;
`,O=r.p`
  font-size: ${s.typography.fontSize.lg};
  font-weight: ${s.typography.fontWeight.medium};
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 ${s.space.md} 0;
  font-family: ${s.typography.fontFamily.primary};
  line-height: ${s.typography.lineHeight.relaxed};
`,T=r(o.button)`
  background: ${({theme:e})=>e.color.pet.primary};
  color: white;
  border: none;
  border-radius: ${s.radius.button};
  padding: ${s.space.md} ${s.space.lg};
  font-size: ${s.typography.fontSize.base};
  font-weight: ${s.typography.fontWeight.medium};
  font-family: ${s.typography.fontFamily.primary};
  cursor: pointer;
  transition: all ${s.motion.fast} ${s.motion.easing};

  &:hover {
    background: ${({theme:e})=>e.color.pet.secondary};
    transform: translateY(-1px);
  }
`,Y=r.div`
  background: ${({theme:e})=>e.color.surface};
  border: 2px solid ${({theme:e})=>e.color.border};
  border-radius: ${s.radius.card};
  padding: ${s.space.lg};
  margin-bottom: ${s.space.lg};
`,E=r.h3`
  font-size: ${s.typography.fontSize.lg};
  font-weight: ${s.typography.fontWeight.medium};
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 ${s.space.md} 0;
  font-family: ${s.typography.fontFamily.primary};
  line-height: ${s.typography.lineHeight.normal};
`,M=r(o.div)`
  display: flex;
  align-items: center;
  padding: ${s.space.sm} 0;
  border-bottom: 1px solid ${({theme:e})=>e.color.border};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({theme:e})=>e.color.bg};
    border-radius: ${s.radius.sm};
    padding-left: ${s.space.sm};
    padding-right: ${s.space.sm};
  }
`,P=r.div`
  font-size: ${s.typography.fontSize.xs};
  color: ${({theme:e})=>e.color.textMuted};
  margin-right: ${s.space.md};
  min-width: 60px;
  font-family: ${s.typography.fontFamily.primary};
`,L=r.div`
  font-size: 20px;
  margin-right: ${s.space.sm};
`,R=r.div`
  font-size: ${s.typography.fontSize.sm};
  color: ${({theme:e})=>e.color.text};
  flex: 1;
  font-family: ${s.typography.fontFamily.primary};
  line-height: ${s.typography.lineHeight.normal};
`,D=({onSaveEntry:o,showShareCard:r=!0})=>{const{addEntry:s,getPrompt:D,getPetReaction:A,getTodayEntries:U,isLoading:q}=a(),[B,G]=i.useState(null),[I,J]=i.useState(null),[K,N]=i.useState(null),[Q,V]=i.useState([]),[X,Z]=i.useState(""),[_,ee]=i.useState(null),[te,oe]=i.useState(!1),ie=i.useCallback(e=>{G(e),J(null),N(null),V([]),Z(""),ee(null),n()},[]),re=i.useCallback(e=>{J(e),n()},[]),ae=i.useCallback(e=>{"написать своё"!==e?(V(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]),n()):V([])},[]),ne=i.useCallback(()=>{return e=void 0,t=null,i=function*(){if(B){oe(!0),l();try{const e=s(B,I||void 0,X.trim()||void 0,Q.length>0?Q:void 0),t=A(B,e.petReactionSeed);ee(t),o&&o(e),setTimeout(()=>{G(null),J(null),N(null),V([]),Z(""),ee(null)},2e3)}catch(e){}finally{oe(!1)}}},new Promise((o,r)=>{var a=e=>{try{l(i.next(e))}catch(t){r(t)}},n=e=>{try{l(i.throw(e))}catch(t){r(t)}},l=e=>e.done?o(e.value):Promise.resolve(e.value).then(a,n);l((i=i.apply(e,t)).next())});var e,t,i},[B,I,X,Q,s,A,o]);i.useEffect(()=>{if(B&&!K){const e=D(B);N(e)}},[B,K,D]);const le=U();return q?e.jsx(h,{children:e.jsx(y,{children:"загружаю..."})}):e.jsxs(h,{children:[e.jsxs(g,{children:[e.jsx(y,{children:"какая погода в твоей душе?"}),e.jsx($,{children:"выбери, что больше всего похоже на твоё настроение"})]}),e.jsx(f,{children:["sun","clouds","rain","wind","storm","rainbow","moon","stars","leaves"].map(t=>e.jsxs(x,{isSelected:B===t,onClick:()=>ie(t),whileHover:{scale:1.02},whileTap:{scale:.98},transition:{duration:.1,ease:"easeOut"},children:[e.jsx(u,{children:c[t]}),e.jsx(b,{children:p[t]})]},t))}),B&&!I&&e.jsx(t,{children:e.jsxs(w,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.2,ease:"easeOut"},children:[e.jsx(v,{children:"насколько сильно это чувство?"}),e.jsx(S,{children:[1,2,3].map(t=>e.jsx(j,{isSelected:I===t,onClick:()=>re(t),whileHover:{scale:1.05},whileTap:{scale:.95},transition:{duration:.1,ease:"easeOut"},children:m[t]},t))})]})}),B&&I&&K&&!_&&e.jsx(t,{children:e.jsxs(z,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.2,ease:"easeOut"},children:[e.jsx(k,{children:K.text}),K.chips&&e.jsx(H,{children:K.chips.map(t=>e.jsx(F,{isSelected:Q.includes(t),onClick:()=>ae(t),whileHover:{scale:1.05},whileTap:{scale:.95},transition:{duration:.1,ease:"easeOut"},children:t},t))}),e.jsx(C,{value:X,onChange:e=>Z(e.target.value),placeholder:"если хочешь — добавь пару слов…",maxLength:280}),e.jsx(T,{onClick:ne,disabled:te,whileHover:{scale:1.02},whileTap:{scale:.98},transition:{duration:.1,ease:"easeOut"},children:te?"сохраняю...":"это было прекрасно"})]})}),_&&e.jsx(t,{children:e.jsxs(W,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.9},transition:{duration:.3,ease:"easeOut"},children:[e.jsx(O,{children:_}),e.jsx(T,{onClick:()=>{G(null),J(null),N(null),V([]),Z(""),ee(null)},whileHover:{scale:1.02},whileTap:{scale:.98},transition:{duration:.1,ease:"easeOut"},children:"спасибо, что заглянул(а) 💚"})]})}),le.length>0&&e.jsxs(Y,{children:[e.jsx(E,{children:"твои размышления сегодня"}),le.slice(0,3).map(t=>{var o,i;return e.jsxs(M,{whileHover:{x:4},transition:{duration:.1},children:[e.jsx(P,{children:(i=t.ts,new Date(i).toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit"}))}),e.jsx(L,{children:c[t.mood]}),e.jsx(R,{children:t.note||(null==(o=t.chips)?void 0:o.join(", "))||"запись без заметки"})]},t.id)})]}),r&&le.length>0&&e.jsx(d,{type:"diaryEntry",customMessage:`сегодня в моей душе ${p[le[0].mood]}`})]})};export{D as EmotionalDiary};
