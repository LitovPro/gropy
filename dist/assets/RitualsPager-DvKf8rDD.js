var e=Object.defineProperty,t=Object.defineProperties,i=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,n=(t,i,o)=>i in t?e(t,i,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[i]=o,s=(e,t)=>{for(var i in t||(t={}))r.call(t,i)&&n(e,i,t[i]);if(o)for(var i of o(t))a.call(t,i)&&n(e,i,t[i]);return e},l=(e,o)=>t(e,i(o));import{j as d,A as c,m as p}from"./chunk-C02y-XeT.js";import{r as h}from"./chunk-DtX1tuCI.js";import{p as m}from"./chunk-BuVI32lr.js";import{s as g,a as u,t as f,p as y,b as x}from"./index-B2inpYTP.js";import{S as $}from"./chunk-BG1X0chb.js";import"./chunk-BeE17Zin.js";import"./chunk-CJaK7wvR.js";const b="gropy-ritual-session",w="gropy-ritual-settings",v=[{id:"inhale",title:"Вдох",description:"Медленно вдохни через нос (4 сек)",duration:4,instruction:"Почувствуй, как воздух наполняет живот"},{id:"hold_in",title:"Задержка",description:"Задержи дыхание (4 сек)",duration:4,instruction:"Оставайся спокойным и расслабленным"},{id:"exhale",title:"Выдох",description:"Медленно выдохни через рот (6 сек)",duration:6,instruction:"Отпусти всё напряжение и стресс"},{id:"hold_out",title:"Пауза",description:"Короткая пауза (2 сек)",duration:2,instruction:"Наслаждайся покоем"}],j=[{id:"inhale",title:"Вдох",description:"Медленно вдохни через нос (4 сек)",duration:4,instruction:"Почувствуй, как воздух наполняет живот"},{id:"hold_in",title:"Задержка",description:"Задержи дыхание (4 сек)",duration:4,instruction:"Оставайся спокойным и расслабленным"},{id:"exhale",title:"Выдох",description:"Медленно выдохни через рот (4 сек)",duration:4,instruction:"Отпусти всё напряжение и стресс"},{id:"hold_out",title:"Пауза",description:"Короткая пауза (4 сек)",duration:4,instruction:"Наслаждайся покоем"}],k=[{id:"inhale",title:"Вдох",description:"Медленно вдохни через нос (5 сек)",duration:5,instruction:"Почувствуй, как воздух наполняет живот"},{id:"exhale",title:"Выдох",description:"Медленно выдохни через рот (5 сек)",duration:5,instruction:"Отпусти всё напряжение и стресс"}],z=[{id:"inhale",title:"Вдох",description:"Медленно вдохни через нос (4 сек)",duration:4,instruction:"Почувствуй, как воздух наполняет живот"},{id:"hold_in",title:"Задержка",description:"Задержи дыхание (4 сек)",duration:4,instruction:"Оставайся спокойным и расслабленным"},{id:"exhale",title:"Выдох",description:"Медленно выдохни через рот (4 сек)",duration:4,instruction:"Отпусти всё напряжение и стресс"}],S=e=>{switch(e){case"calming":default:return v;case"box":return j;case"coherent":return k;case"triangle":return z}},C={calming:{name:"Успокаивающее дыхание",description:"4-4-6-2 (для спокойствия)",cycles:5,totalTime:80},box:{name:"Box Breathing",description:"4-4-4-4 (военная техника)",cycles:5,totalTime:80},coherent:{name:"Coherent Breathing",description:"5-5 (баланс нервной системы)",cycles:6,totalTime:60},triangle:{name:"Triangle Breathing",description:"4-4-4 (фокус и концентрация)",cycles:5,totalTime:60}},F=[{id:"breath",title:"Вдохнуть",description:"Научно обоснованные техники дыхания",icon:"🌬️",category:"breath",defaultDuration:0,guidedSteps:v,quickDescription:"Быстрое дыхательное упражнение",reflectionPrompt:"Стало ли спокойнее?",reflectionOptions:["😊","😐","😣"]},{id:"water",title:"Попить воды",description:"1 стакан воды",icon:"💧",category:"body",defaultDuration:0,quickDescription:"Один жест = выпил",reflectionPrompt:"Сколько выпил?",reflectionOptions:["200мл","300мл","500мл"]},{id:"stretch",title:"Потянуться",description:"Лёгкая растяжка",icon:"🤸",category:"body",defaultDuration:30,guidedSteps:[{id:"neck",title:"Шея",description:"Медленно поворачивай голову влево и вправо",duration:15,instruction:"Дыши глубоко и расслабляйся"},{id:"shoulders",title:"Плечи",description:"Поднимай и опускай плечи",duration:15,instruction:"Снимай напряжение с плеч"}],quickDescription:"Общий таймер 30 сек",reflectionPrompt:"Где стало легче?",reflectionOptions:["шея","плечи","спина"]},{id:"gratitude",title:"Благодарность",description:"1 вещь за которую благодарен",icon:"🙏",category:"mind",defaultDuration:0,quickDescription:"Записать одну благодарность",reflectionPrompt:"Настроение до/после",reflectionOptions:["😊","😐","😣","😌","😊"]},{id:"walk",title:"Прогулка",description:"5 минут на свежем воздухе",icon:"🚶",category:"movement",defaultDuration:300,quickDescription:"Таймер 5:00 с крупным кругом",reflectionPrompt:"Заметил ли что-то приятное?",reflectionOptions:["природа","люди","тишина","свет"]},{id:"kindness",title:"Доброта",description:"Одно доброе дело",icon:"💝",category:"kindness",defaultDuration:0,quickDescription:"Выбери идею и выполни",reflectionPrompt:"Что сделал доброго?",reflectionOptions:["помог","улыбнулся","поблагодарил","выслушал"]}],W=m(p.div).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  background: ${({theme:e,$isSelected:t})=>t?`linear-gradient(135deg, ${e.color.pet.accent}20, ${e.color.warm.medium}20)`:e.color.surface};
  border: 2px solid ${({theme:e,$isSelected:t})=>t?e.color.pet.accent:e.color.border};
  border-radius: ${f.radius.lg};
  padding: ${f.space.md};
  transition: all ${f.motion.fast} ${f.motion.easing};
  position: relative;
  overflow: hidden;
  min-height: 92px;
  display: grid;
  align-content: center;
  box-shadow: ${({theme:e,$isSelected:t})=>t?`0 4px 16px ${e.color.pet.accent}30`:`0 2px 8px ${e.color.border}20`};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({theme:e,$isSelected:t})=>t?`0 6px 20px ${e.color.pet.accent}40`:`0 4px 12px ${e.color.border}30`};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`,T=m.div`
  font-size: 28px;
  margin-bottom: ${f.space.xs};
  transition: transform ${f.motion.fast} ${f.motion.easing};
  text-align: center;
  
  ${W}:hover & {
    transform: scale(1.1);
  }
`,P=m.h3`
  font-size: ${f.typography.fontSize.base};
  font-weight: ${f.typography.fontWeight.semibold};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 ${f.space.xs} 0;
  text-align: center;
  line-height: ${f.typography.lineHeight.tight};

  /* Mobile adaptation */
  @media (max-width: 480px) {
    font-size: ${f.typography.fontSize.sm};
    line-height: 1.2;
  }
`,M=m.p`
  font-size: ${f.typography.fontSize.xs};
  font-weight: ${f.typography.fontWeight.normal};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.textMuted};
  margin: 0 0 ${f.space.sm} 0;
  text-align: center;
  line-height: ${f.typography.lineHeight.normal};

  /* Mobile adaptation */
  @media (max-width: 480px) {
    font-size: 11px;
    line-height: 1.3;
  }
`,D=m(p.button).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  margin-top: ${f.space.sm};
  align-self: end;
  min-height: ${f.size.tapMin};
  border-radius: ${f.radius.lg};
  border: none;
  cursor: pointer;
  font-weight: ${f.typography.fontWeight.medium};
  font-size: ${f.typography.fontSize.sm};
  font-family: ${f.typography.fontFamily.primary};
  padding: ${f.space.sm} ${f.space.md};
  background: ${({theme:e})=>`linear-gradient(135deg, ${e.color.pet.primary}20, ${e.color.warm.medium}20)`};
  color: ${({theme:e})=>e.color.text};
  border: 1px solid ${({theme:e})=>e.color.pet.primary}40;
  transition: all ${f.motion.fast} ${f.motion.easing};
  width: 100%;

  &:hover {
    background: ${({theme:e})=>`linear-gradient(135deg, ${e.color.pet.primary}30, ${e.color.warm.medium}30)`};
    border-color: ${({theme:e})=>e.color.pet.primary};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.color.pet.accent};
    outline-offset: 2px;
  }
`,A=m(p.button).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  position: absolute;
  top: ${f.space.sm};
  right: ${f.space.sm};
  background: ${({theme:e})=>e.color.surface};
  border: 1px solid ${({theme:e})=>e.color.border};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all ${f.motion.fast} ${f.motion.easing};

  &:hover {
    background: ${({theme:e})=>e.color.pet.accent}20;
    border-color: ${({theme:e})=>e.color.pet.accent};
    transform: scale(1.1);
  }
`,H=({ritual:e,settings:t,onStart:i,onSettings:o,isSelected:r=!1})=>{const[a,n]=h.useState(!1),s=h.useRef(null),l=h.useRef(null);h.useEffect(()=>()=>{s.current&&window.clearTimeout(s.current)},[]);return d.jsxs(W,{$isSelected:r,onClick:o=>{o.preventDefault(),a||(i(e.id,t.mode),y())},onMouseDown:t=>{l.current={x:t.clientX,y:t.clientY},n(!0),s.current=window.setTimeout(()=>{l.current&&(o(e.id),y())},500)},onMouseUp:()=>{s.current&&(window.clearTimeout(s.current),s.current=null),n(!1)},onMouseLeave:()=>{s.current&&(window.clearTimeout(s.current),s.current=null),n(!1)},onTouchStart:t=>{const i=t.touches[0];i&&(l.current={x:i.clientX,y:i.clientY}),n(!0),s.current=window.setTimeout(()=>{l.current&&(o(e.id),y())},500)},onTouchEnd:()=>{s.current&&(window.clearTimeout(s.current),s.current=null),n(!1)},onTouchMove:e=>{if(l.current){const t=e.touches[0];if(t){const e=Math.abs(t.clientX-l.current.x),i=Math.abs(t.clientY-l.current.y);(e>10||i>10)&&(s.current&&(clearTimeout(s.current),s.current=null),n(!1))}}},whileTap:{scale:.98},transition:{duration:.1,ease:"easeOut"},children:[d.jsx(c,{children:"quick"===t.mode&&d.jsx(p.div,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},transition:{duration:.2},style:{position:"absolute",top:f.space.sm,left:f.space.sm,background:"var(--warm-medium)",color:"white",borderRadius:f.radius.chip,padding:"2px 6px",fontSize:"10px",fontWeight:f.typography.fontWeight.medium},children:"Быстро"})}),d.jsx(A,{onClick:t=>{t.stopPropagation(),o(e.id),y()},whileHover:{scale:1.1},whileTap:{scale:.9},transition:{duration:.1},children:"⋯"}),d.jsx(T,{children:e.icon}),d.jsx(P,{children:e.title}),d.jsx(M,{children:"guided"===t.mode?e.description:e.quickDescription}),d.jsx(D,{onClick:o=>{o.stopPropagation(),i(e.id,t.mode),y()},whileHover:{scale:1.02},whileTap:{scale:.98},transition:{duration:.1},children:"Начать"})]})},I=m(p.div).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({$isDragging:e})=>e?"rgba(0, 0, 0, 0.3)":"rgba(0, 0, 0, 0.5)"};
  z-index: 1000;
  transition: background-color 0.2s ease;
`,O=m(p.div).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({theme:e})=>e.color.surface};
  border-radius: 20px 20px 0 0;
  max-height: min(88dvh, 720px);
  overflow: hidden;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  
  @media (max-height: 640px) {
    max-height: 92dvh;
  }
`,E=m.div`
  height: ${f.zones.gripArea};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  padding: ${f.space.sm} 0;
  transition: all 0.2s ease;
  
  &::before {
    content: '';
    width: ${({$isDragging:e})=>e?"50px":"40px"};
    height: 4px;
    background: ${({theme:e,$isDragging:t})=>t?e.color.textMuted:e.color.border};
    border-radius: 2px;
    transition: all 0.2s ease;
  }
  
  &:active {
    cursor: grabbing;
  }
`,R=m.div`
  flex: 1 1 auto;
  overflow: auto;
  padding: 12px 20px 20px;
  overscroll-behavior: contain;
  min-width: 0;
`,Y=m.div`
  padding: 12px 20px;
  flex: 0 0 auto;
  text-align: center;
`,q=m.h2`
  font-size: ${f.typography.fontSize.xl};
  font-weight: ${f.typography.fontWeight.semibold};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 ${f.space.sm} 0;
  line-height: ${f.typography.lineHeight.tight};
`,B=m.p`
  font-size: ${f.typography.fontSize.base};
  font-weight: ${f.typography.fontWeight.normal};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.textMuted};
  margin: 4px 0 12px;
  line-height: 1.3;
  white-space: normal;
  overflow-wrap: anywhere;
`,L=m.div`
  flex: 0 0 auto;
  position: sticky;
  bottom: 0;
  padding: 12px 20px calc(16px + env(safe-area-inset-bottom, 0));
  background: color-mix(in oklab, ${({theme:e})=>e.color.surface}, transparent 8%);
  backdrop-filter: blur(6px);
  border-top: 1px solid ${({theme:e})=>e.color.border};
`,_=({isOpen:e,onClose:t,title:i,subtitle:o,children:r,actionBar:a,showGrip:n=!0})=>{const[s,l]=h.useState(0),[p,m]=h.useState(!1),g=h.useRef(null);return h.useEffect(()=>{const i=i=>{"Escape"===i.key&&e&&(t(),y())};return e&&(document.addEventListener("keydown",i),document.body.style.overflow="hidden",document.body.style.touchAction="none"),()=>{document.removeEventListener("keydown",i),document.body.style.overflow="unset",document.body.style.touchAction="auto"}},[e,t]),h.useEffect(()=>{e&&(l(0),m(!1))},[e]),d.jsx(c,{children:e&&d.jsxs(d.Fragment,{children:[d.jsx(I,{$isDragging:p,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:t,transition:{duration:.2}}),d.jsxs(O,{ref:g,initial:{y:"100%"},animate:{y:p?s:0,transition:p?{type:"tween",duration:0}:{type:"spring",damping:30,stiffness:400,mass:.8}},exit:{y:"100%",transition:{type:"spring",damping:25,stiffness:300}},drag:"y",dragConstraints:{top:0,bottom:0},dragElastic:{top:0,bottom:.1},dragMomentum:!1,onDragStart:()=>{m(!0)},onDrag:(e,t)=>{t.offset.y>0&&l(t.offset.y)},onDragEnd:(e,i)=>{m(!1);i.offset.y>80||i.velocity.y>300?(t(),y()):l(0)},style:{willChange:p?"transform":"auto"},children:[n&&d.jsx(E,{$isDragging:p}),(i||o)&&d.jsxs(Y,{children:[i&&d.jsx(q,{children:i}),o&&d.jsx(B,{children:o})]}),d.jsx(R,{children:r}),a&&d.jsx(L,{children:a})]})]})})},X=m(p.div).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  position: sticky;
  bottom: 0;
  z-index: ${f.zones.layerBottomElev};
  padding: ${f.space.lg};
  padding-bottom: calc(${f.space.lg} + env(safe-area-inset-bottom, 0));
  background: color-mix(in oklab, var(--surface, #ffffff), transparent 10%);
  backdrop-filter: blur(6px);
  border-top-left-radius: ${f.radius.lg};
  border-top-right-radius: ${f.radius.lg};
  border-top: 1px solid ${({theme:e})=>e.color.border};
`,K=m.div`
  display: flex;
  gap: ${f.space.md};
  align-items: center;
`,N=m(p.button).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  flex: 1;
  min-height: ${f.size.tapMin};
  border-radius: calc(${f.radius.lg} + 4px);
  font-weight: ${f.typography.fontWeight.semibold};
  font-size: ${f.typography.fontSize.base};
  font-family: ${f.typography.fontFamily.primary};
  padding: ${f.space.md} ${f.space.lg};
  border: none;
  cursor: pointer;
  transition: all ${f.motion.fast} ${f.motion.easing};
  background: ${({theme:e})=>`linear-gradient(135deg, ${e.color.pet.primary}, ${e.color.warm.medium})`};
  color: white;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.color.pet.accent};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,G=m(p.button).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  min-height: ${f.size.tapMin};
  min-width: ${f.size.tapMin};
  border-radius: ${f.radius.lg};
  font-weight: ${f.typography.fontWeight.medium};
  font-size: ${f.typography.fontSize.sm};
  font-family: ${f.typography.fontFamily.primary};
  padding: ${f.space.md};
  border: 2px solid ${({theme:e})=>e.color.border};
  background: ${({theme:e})=>e.color.bg};
  color: ${({theme:e})=>e.color.text};
  cursor: pointer;
  transition: all ${f.motion.fast} ${f.motion.easing};

  &:hover {
    border-color: ${({theme:e})=>e.color.pet.primary};
    background: ${({theme:e})=>e.color.pet.primary}10;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.color.pet.accent};
    outline-offset: 2px;
  }
`,U=({primaryAction:e,secondaryActions:t=[],className:i})=>d.jsx(X,{className:i,initial:{y:"100%"},animate:{y:0},exit:{y:"100%"},transition:{type:"spring",damping:25,stiffness:300},children:d.jsxs(K,{children:[t.map((e,t)=>d.jsxs(G,{onClick:()=>(e=>{e.onClick(),y()})(e),whileHover:{scale:1.02},whileTap:{scale:.98},transition:{duration:.1},children:[e.icon&&d.jsx("span",{style:{marginRight:f.space.xs},children:e.icon}),e.label]},t)),e&&d.jsx(N,{onClick:()=>{e&&!e.disabled&&(e.onClick(),y())},disabled:e.disabled,whileHover:{scale:1.02},whileTap:{scale:.98},transition:{duration:.1},children:e.label})]})}),J=m.div`
  padding: ${f.space.md};
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  
  @media (max-width: 480px) {
    padding: ${f.space.sm};
  }
  
  @media (max-width: 360px) {
    padding: ${f.space.xs};
  }
  
  @media (max-width: 320px) {
    padding: 8px;
  }
`,Q=m.div`
  display: flex;
  align-items: center;
  margin-bottom: ${f.space.md};
  
  @media (max-width: 480px) {
    margin-bottom: ${f.space.sm};
  }
  
  @media (max-width: 360px) {
    margin-bottom: ${f.space.xs};
  }
`,V=m.div`
  font-size: 32px;
  margin-right: ${f.space.sm};
  
  @media (max-width: 480px) {
    font-size: 28px;
    margin-right: ${f.space.xs};
  }
  
  @media (max-width: 360px) {
    font-size: 24px;
  }
`,Z=m.h2`
  font-size: ${f.typography.fontSize.lg};
  font-weight: ${f.typography.fontWeight.semibold};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.text};
  margin: 0;
  line-height: ${f.typography.lineHeight.tight};
  
  @media (max-width: 480px) {
    font-size: ${f.typography.fontSize.base};
  }
  
  @media (max-width: 360px) {
    font-size: ${f.typography.fontSize.sm};
  }
`,ee=m.p`
  font-size: ${f.typography.fontSize.sm};
  font-weight: ${f.typography.fontWeight.normal};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.textMuted};
  margin: ${f.space.xs} 0 ${f.space.md} 0;
  line-height: ${f.typography.lineHeight.relaxed};
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: ${f.typography.fontSize.xs};
    margin: ${f.space.xs} 0 ${f.space.sm} 0;
  }
  
  @media (max-width: 360px) {
    font-size: ${f.typography.fontSize.xs};
    margin: 4px 0 ${f.space.xs} 0;
  }
`,te=m.div`
  display: flex;
  gap: ${f.space.sm};
  margin-bottom: ${f.space.lg};
`,ie=m(p.button).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  flex: 1;
  padding: ${f.space.md};
  border: 2px solid ${({theme:e,$isActive:t})=>t?e.color.pet.primary:e.color.border};
  border-radius: ${f.radius.button};
  background: ${({theme:e,$isActive:t})=>t?`linear-gradient(135deg, ${e.color.pet.primary}, ${e.color.warm.medium})`:e.color.bg};
  color: ${({$isActive:e})=>e?"white":"inherit"};
  font-size: ${f.typography.fontSize.sm};
  font-weight: ${({$isActive:e})=>e?f.typography.fontWeight.semibold:f.typography.fontWeight.medium};
  font-family: ${f.typography.fontFamily.primary};
  cursor: pointer;
  transition: all ${f.motion.fast} ${f.motion.easing};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`,oe=m.div`
  background: ${({theme:e})=>e.color.bg};
  border: 1px solid ${({theme:e})=>e.color.border};
  border-radius: ${f.radius.sm};
  padding: ${f.space.md};
  margin-bottom: ${f.space.lg};
  text-align: center;
`,re=m.div`
  font-size: ${f.typography.fontSize.sm};
  font-weight: ${f.typography.fontWeight.medium};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.text};
  margin-bottom: ${f.space.xs};
`,ae=m.div`
  font-size: ${f.typography.fontSize.lg};
  font-weight: ${f.typography.fontWeight.semibold};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.pet.primary};
`,ne=m.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 100%;
  padding: 0;
  justify-content: center;
  box-sizing: border-box;
  min-width: 0;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 8px;
    margin-bottom: 16px;
  }
  
  @media (max-width: 360px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 6px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 320px) {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 4px;
    margin-bottom: 10px;
  }
`,se=m(p.button).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  min-width: 0;
  border-radius: 14px;
  padding: 12px;
  background: ${({$isSelected:e,theme:t})=>e?t.color.pet.primary:"#f7f7f7"};
  color: ${({$isSelected:e,theme:t})=>e?"#ffffff":t.color.text};
  font-size: 15px;
  font-weight: 500;
  font-family: ${f.typography.fontFamily.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  height: 75px;
  display: grid;
  gap: 6px;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 100%;
  margin: 0;
  box-shadow: 0 1px 0 rgba(0,0,0,.06) inset;
  box-sizing: border-box;
  overflow: hidden;
  border: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    height: 70px;
    font-size: 14px;
    border-radius: 12px;
  }
  
  @media (max-width: 360px) {
    padding: 8px;
    height: 65px;
    font-size: 13px;
    border-radius: 10px;
  }
  
  @media (max-width: 320px) {
    padding: 6px;
    height: 60px;
    font-size: 12px;
    border-radius: 8px;
  }
  
  @media (max-height: 640px) {
    padding: 10px;
    height: 65px;
  }
`,le=m.div`
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
  font-size: 16px;
  
  @media (max-width: 480px) {
    font-size: 15px;
  }
  
  @media (max-width: 360px) {
    font-size: 14px;
  }
  
  @media (max-width: 320px) {
    font-size: 13px;
  }
`,de=m.div`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.2;
  text-align: center;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 360px) {
    font-size: 0.75rem;
  }
  
  @media (max-width: 320px) {
    font-size: 0.7rem;
  }
`,ce=({ritual:e,settings:t,onStart:i,onClose:o,onModeChange:r,onBreathingModeChange:a})=>{const n="breath"!==e.id||t.breathingMode,s=d.jsx(U,{primaryAction:{label:"Начать",onClick:i,disabled:!n},secondaryActions:[{label:"Отмена",onClick:o}]});return d.jsx(_,{isOpen:!0,onClose:o,title:e.title,subtitle:"guided"===t.mode?e.description:e.quickDescription,actionBar:s,children:d.jsxs(J,{children:[d.jsxs(Q,{children:[d.jsx(V,{children:e.icon}),d.jsx(Z,{children:e.title})]}),"breath"!==e.id&&d.jsxs(te,{children:[d.jsx(ie,{$isActive:"guided"===t.mode,onClick:()=>{r("guided"),y()},whileHover:{scale:1.02},whileTap:{scale:.98},transition:{duration:.1},children:"Ведущий режим"}),d.jsx(ie,{$isActive:"quick"===t.mode,onClick:()=>{r("quick"),y()},whileHover:{scale:1.02},whileTap:{scale:.98},transition:{duration:.1},children:"Быстрый режим"})]}),"breath"===e.id?d.jsxs(d.Fragment,{children:[d.jsx(ee,{children:"Выберите технику дыхания для начала упражнения"}),d.jsx(ne,{children:Object.entries(C).map(([e,i])=>d.jsxs(se,{$isSelected:t.breathingMode===e,onClick:()=>{null==a||a(e),y()},whileHover:{scale:1.02},whileTap:{scale:.98},transition:{duration:.1},children:[d.jsx(le,{children:i.name}),d.jsx(de,{children:i.description})]},e))})]}):d.jsxs(oe,{children:[d.jsx(re,{children:"Длительность"}),d.jsx(ae,{children:(e=>{if(0===e)return"Без таймера";if(e<60)return`${e} сек`;const t=Math.floor(e/60),i=e%60;return i>0?`${t}:${i.toString().padStart(2,"0")}`:`${t} мин`})(t.duration)})]})]})})},pe=m(p.div).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({theme:e})=>e.color.bg};
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${f.space.xl};
`,he=m(p.div).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(
    ${({theme:e,$progress:t})=>`${e.color.pet.primary} ${3.6*t}deg, ${e.color.border} ${3.6*t}deg`}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${f.space.xl};
  position: relative;
  border: 3px solid ${({theme:e})=>e.color.border};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    width: 160px;
    height: 160px;
    background: ${({theme:e})=>e.color.bg};
    border-radius: 50%;
    border: 2px solid ${({theme:e})=>e.color.border};
  }

  &::after {
    content: '';
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: ${({theme:e})=>e.color.pet.primary};
    opacity: 0.2;
    z-index: 2;
  }
`,me=m.div`
  position: relative;
  z-index: 1;
  font-size: ${f.typography.fontSize["3xl"]};
  font-weight: ${f.typography.fontWeight.bold};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.text};
  text-align: center;
`,ge=m(p.div).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  text-align: center;
  margin-bottom: ${f.space.xl};
  max-width: 400px;
`,ue=m.h2`
  font-size: ${f.typography.fontSize.xl};
  font-weight: ${f.typography.fontWeight.semibold};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 ${f.space.sm} 0;
  line-height: ${f.typography.lineHeight.tight};
`,fe=m.p`
  font-size: ${f.typography.fontSize.base};
  font-weight: ${f.typography.fontWeight.normal};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.textMuted};
  margin: 0 0 ${f.space.md} 0;
  line-height: ${f.typography.lineHeight.relaxed};
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
`,ye=m.div`
  font-size: ${f.typography.fontSize.sm};
  font-weight: ${f.typography.fontWeight.medium};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.text.primary};
  font-style: italic;
  line-height: ${f.typography.lineHeight.normal};
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
`,xe=m.div`
  display: flex;
  gap: ${f.space.sm};
  margin-bottom: ${f.space.lg};
  justify-content: center;
  align-items: center;
`,$e=m.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({$isActive:e,$phase:t,theme:i})=>{if(!e)return i.color.border;switch(t){case"inhale":return"#4CAF50";case"hold":return"#FF9800";case"exhale":return"#2196F3";case"pause":return"#9C27B0";default:return i.color.pet.primary}}};
  transition: all 0.3s ease;
  transform: ${({$isActive:e})=>e?"scale(1.2)":"scale(1)"};
  box-shadow: ${({$isActive:e})=>e?"0 0 8px rgba(0,0,0,0.3)":"none"};
`,be=m.div`
  font-size: ${f.typography.fontSize.xs};
  font-weight: ${f.typography.fontWeight.medium};
  color: ${({$isActive:e,theme:t})=>e?t.color.text:t.color.textMuted};
  text-align: center;
  margin-top: ${f.space.xs};
  transition: color 0.3s ease;
`,we=m(p.div).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  width: 120px;
  height: 160px;
  border: 4px solid ${({theme:e})=>e.color.pet.primary};
  border-radius: 0 0 60px 60px;
  position: relative;
  margin: 0 auto ${f.space.lg} auto;
  background: ${({theme:e})=>e.color.bg};
  overflow: hidden;
`,ve=m(p.div).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({$level:e})=>e}%;
  background: linear-gradient(to top, 
    ${({theme:e})=>e.color.pet.primary}80, 
    ${({theme:e})=>e.color.pet.primary}40
  );
  border-radius: 0 0 56px 56px;
  transition: height 0.5s ease;
`,je=m(p.input).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  width: 100%;
  padding: ${f.space.md};
  border: 2px solid ${({theme:e})=>e.color.border};
  border-radius: ${f.radius.button};
  background: ${({theme:e})=>e.color.bg};
  font-size: ${f.typography.fontSize.base};
  font-weight: ${f.typography.fontWeight.normal};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.text};
  text-align: center;
  margin-bottom: ${f.space.lg};

  &:focus {
    outline: none;
    border-color: ${({theme:e})=>e.color.pet.primary};
    box-shadow: 0 0 0 3px ${({theme:e})=>e.color.pet.primary}20;
  }
`,ke=m.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${f.space.sm};
  margin-bottom: ${f.space.lg};
`,ze=m(p.button).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  padding: ${f.space.md};
  border: 2px solid ${({theme:e})=>e.color.border};
  border-radius: ${f.radius.button};
  background: ${({theme:e})=>e.color.bg};
  font-size: ${f.typography.fontSize.sm};
  font-weight: ${f.typography.fontWeight.medium};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.text};
  cursor: pointer;
  transition: all ${f.motion.fast} ${f.motion.easing};

  &:hover {
    border-color: ${({theme:e})=>e.color.pet.primary};
    background: ${({theme:e})=>e.color.pet.primary}10;
    transform: translateY(-1px);
  }
`,Se=({ritual:e,session:t,timeLeft:i,isPaused:o,breathingMode:r="calming",onPause:a,onResume:n,onStart:s,onComplete:l,onCancel:m})=>{var g;const[u,f]=h.useState(0),[y,x]=h.useState(0),[$,b]=h.useState(""),[w,v]=h.useState("inhale"),j=null==(g=e.guidedSteps)?void 0:g[u],k=t.duration?(t.duration-i)/t.duration:0,[z,F]=h.useState(null),W=h.useMemo(()=>{var t;if("breath"!==e.id&&"breathe"!==e.id)return null;if(!z)return{duration:0,elapsed:0,completedCycles:0,cycleProgress:0,isActive:!1};const i=1e3*S(r).reduce((e,t)=>e+t.duration,0),o=(null==(t=C[r])?void 0:t.cycles)||5,a=Date.now()-z;return{duration:0,elapsed:a,completedCycles:Math.floor(a/i),cycleProgress:a%i/i,isActive:!0,maxCycles:o}},[e.id,z,r]);h.useEffect(()=>{if("guided"===t.mode&&e.guidedSteps&&i>0){const o=e.guidedSteps.length,r=(t.duration-i)/t.duration,a=Math.min(Math.floor(r*o),o-1);a!==u&&f(a)}},[i,t,e.guidedSteps,u]),h.useEffect(()=>{if(!W)return void v("inhale");const{cycleProgress:e,completedCycles:t,isActive:i,maxCycles:o}=W;if(i){const i=S(r);let a=0,n=0;for(let t=0;t<i.length;t++){const o=i[t].duration/i.reduce((e,t)=>e+t.duration,0);if(e<=n+o){a=t;break}n+=o}v(["inhale","hold","exhale","pause"][a]||"inhale"),t>=o&&setTimeout(()=>{l()},100)}else v("inhale")},[W,l,r]),h.useEffect(()=>{if(!z||"breath"!==e.id&&"breathe"!==e.id)return;const t=setInterval(()=>{setCompletedCycles(e=>e+.001)},100);return()=>clearInterval(t)},[z,e.id]);const T=()=>{x(100),setTimeout(()=>{l()},1e3)},P=()=>{$.trim()&&l()};return d.jsxs(pe,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.3},children:[("stretch"===e.id||"walk"===e.id)&&d.jsx(he,{$progress:100*k,children:d.jsx(me,{children:(M=i,`${Math.floor(M/60)}:${(M%60).toString().padStart(2,"0")}`)})}),(()=>{switch(e.id){case"breathe":case"breath":return d.jsxs(p.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"24px"},children:[d.jsx(he,{$progress:k,animate:z?{scale:"inhale"===w?[.8,1.3]:"hold"===w?1.3:"exhale"===w?[1.3,.8]:.8,opacity:"inhale"===w?[.6,1]:"hold"===w?1:"exhale"===w?[1,.6]:.6}:{scale:1,opacity:.7},transition:z?{duration:"inhale"===w||"hold"===w?4:"exhale"===w?6:2,ease:"hold"===w||"pause"===w?"linear":"easeInOut"}:{duration:.3,ease:"easeOut"}}),d.jsxs(xe,{children:[d.jsxs("div",{children:[d.jsx($e,{$isActive:"inhale"===w,$phase:"inhale"}),d.jsx(be,{$isActive:"inhale"===w,children:"Вдох"})]}),d.jsxs("div",{children:[d.jsx($e,{$isActive:"hold"===w,$phase:"hold"}),d.jsx(be,{$isActive:"hold"===w,children:"Задержка"})]}),d.jsxs("div",{children:[d.jsx($e,{$isActive:"exhale"===w,$phase:"exhale"}),d.jsx(be,{$isActive:"exhale"===w,children:"Выдох"})]}),d.jsxs("div",{children:[d.jsx($e,{$isActive:"pause"===w,$phase:"pause"}),d.jsx(be,{$isActive:"pause"===w,children:"Пауза"})]})]}),d.jsx(fe,{children:z?W?`Цикл ${W.completedCycles+1} из ${W.maxCycles}`:"Следуй за ритмом дыхания":'Нажмите "Начать" чтобы начать дыхательное упражнение'}),z?"guided"===t.mode&&j?d.jsx(ye,{children:j.instruction}):"quick"===t.mode?d.jsx(ye,{children:"Вдох 4 сек → Задержка 4 сек → Выдох 6 сек → Пауза 2 сек"}):null:d.jsx(ye,{children:"Готовы начать? Следуйте за визуальными подсказками"})]});case"water":return d.jsxs(p.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[d.jsx(we,{onClick:T,whileHover:{scale:1.05},whileTap:{scale:.95},children:d.jsx(ve,{$level:y})}),d.jsx(fe,{children:'Нажми на стакан, чтобы "выпить" воду'})]});case"gratitude":return d.jsxs(p.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[d.jsx(je,{type:"text",placeholder:"За что ты благодарен сегодня?",value:$,onChange:e=>b(e.target.value),onKeyPress:e=>"Enter"===e.key&&P()}),d.jsx(p.button,{onClick:P,disabled:!$.trim(),whileHover:{scale:1.02},whileTap:{scale:.98},style:{padding:"12px 24px",border:"none",borderRadius:"20px",background:"linear-gradient(135deg, #A7C7B7, #F7BFA0)",color:"white",fontSize:"14px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s ease"},children:"Сохранить"})]});case"stretch":return d.jsxs(p.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"24px"},children:[d.jsx(he,{$progress:k,animate:{rotate:[0,360],scale:[1,1.05,1]},transition:{duration:8,repeat:1/0,ease:"easeInOut"}}),d.jsx(fe,{children:"guided"===t.mode&&j?j.description:"Выполняй лёгкую растяжку"}),"guided"===t.mode&&j&&d.jsx(ye,{children:j.instruction})]});case"walk":return d.jsxs(p.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"24px"},children:[d.jsx(he,{$progress:k,animate:{x:[-10,10,-10],y:[0,-5,0]},transition:{duration:2,repeat:1/0,ease:"easeInOut"}}),d.jsx(fe,{children:"guided"===t.mode&&j?j.description:"Иди спокойным шагом"}),"guided"===t.mode&&j&&d.jsx(ye,{children:j.instruction})]});case"kindness":return d.jsxs(p.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[d.jsx(fe,{children:"Выбери одно доброе дело:"}),d.jsx(ke,{children:["Улыбнись незнакомцу","Поблагодари кого-то","Сделай комплимент","Помоги с мелочью"].map(e=>d.jsx(ze,{onClick:()=>(e=>{setSelectedKindness(e),setTimeout(()=>{l()},1e3)})(e),whileHover:{scale:1.05},whileTap:{scale:.95},children:e},e))})]});default:return d.jsx(ge,{children:d.jsx(c,{mode:"wait",children:j&&d.jsxs(p.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},exit:{opacity:0,x:-20},transition:{duration:.3},children:[d.jsx(ue,{children:j.title}),d.jsx(fe,{children:j.description}),j.instruction&&d.jsx(ye,{children:j.instruction})]},j.id)})})}})(),d.jsx(U,{primaryAction:{label:0!==i||z?"Готово":"Начать",onClick:0!==i||z?l:()=>{s?s():n&&n(),"breath"!==e.id&&"breathe"!==e.id||F(Date.now())}},secondaryActions:[{label:o?"Продолжить":"Пауза",onClick:o?n:a},{label:"Отмена",onClick:m}]})]});var M},Ce=m(p.div).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({theme:e})=>e.color.bg};
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${f.space.xl};
`,Fe=m.div`
  max-width: 400px;
  width: 100%;
  text-align: center;
`,We=m.h2`
  font-size: ${f.typography.fontSize.xl};
  font-weight: ${f.typography.fontWeight.semibold};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 ${f.space.lg} 0;
  line-height: ${f.typography.lineHeight.tight};
`,Te=m.div`
  display: flex;
  justify-content: center;
  gap: ${f.space.md};
  margin-bottom: ${f.space.xl};
`,Pe=m(p.button).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  width: 60px;
  height: 60px;
  border: 3px solid ${({theme:e,$isSelected:t})=>t?e.color.pet.primary:e.color.border};
  border-radius: 50%;
  background: ${({theme:e,$isSelected:t})=>t?`linear-gradient(135deg, ${e.color.pet.primary}20, ${e.color.warm.medium}20)`:e.color.bg};
  font-size: 24px;
  cursor: pointer;
  transition: all ${f.motion.fast} ${f.motion.easing};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    border-color: ${({theme:e})=>e.color.pet.primary};
  }
`,Me=m.div`
  font-size: ${f.typography.fontSize.sm};
  font-weight: ${f.typography.fontWeight.medium};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.textMuted};
  margin-top: ${f.space.sm};
`,De=m(p.textarea).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  width: 100%;
  min-height: 80px;
  padding: ${f.space.md};
  border: 2px solid ${({theme:e})=>e.color.border};
  border-radius: ${f.radius.button};
  background: ${({theme:e})=>e.color.bg};
  font-size: ${f.typography.fontSize.base};
  font-weight: ${f.typography.fontWeight.normal};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.text};
  resize: vertical;
  margin-bottom: ${f.space.lg};

  &:focus {
    outline: none;
    border-color: ${({theme:e})=>e.color.pet.primary};
    box-shadow: 0 0 0 3px ${({theme:e})=>e.color.pet.primary}20;
  }

  &::placeholder {
    color: ${({theme:e})=>e.color.textMuted};
  }
`,Ae=m(p.button).withConfig({shouldForwardProp:e=>!e.startsWith("$")})`
  background: none;
  border: none;
  color: ${({theme:e})=>e.color.textMuted};
  font-size: ${f.typography.fontSize.sm};
  font-weight: ${f.typography.fontWeight.medium};
  font-family: ${f.typography.fontFamily.primary};
  cursor: pointer;
  text-decoration: underline;
  margin-top: ${f.space.lg};
  transition: color ${f.motion.fast} ${f.motion.easing};

  &:hover {
    color: ${({theme:e})=>e.color.text};
  }
`,He=({ritual:e,onComplete:t,onSkip:i})=>{const[o,r]=h.useState(null),[a,n]=h.useState(""),[s,l]=h.useState(""),c=()=>{i(),y()};return d.jsx(Ce,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.3},children:d.jsxs(Fe,{children:[d.jsx(We,{children:e.reflectionPrompt||"Как прошло?"}),d.jsx(Te,{children:[{value:"good",emoji:"😊",label:"Получилось"},{value:"neutral",emoji:"😐",label:"Нейтрально"},{value:"difficult",emoji:"😣",label:"Сложно"}].map(e=>d.jsxs("div",{children:[d.jsx(Pe,{$isSelected:o===e.value,onClick:()=>{r(e.value),l(e.emoji),y()},whileHover:{scale:1.1},whileTap:{scale:.9},transition:{duration:.1},children:e.emoji}),d.jsx(Me,{children:e.label})]},e.value))}),d.jsx(De,{placeholder:"Хочешь добавить что-то ещё? (необязательно)",value:a,onChange:e=>n(e.target.value),initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.1}}),d.jsx(U,{primaryAction:{label:"Готово",onClick:()=>{if(o){const e={feeling:o,text:a.trim()||void 0,emoji:s||void 0};t(e),y()}},disabled:!o},secondaryActions:[{label:"Пропустить",onClick:c}]}),d.jsx(Ae,{onClick:c,whileHover:{scale:1.05},whileTap:{scale:.95},transition:{duration:.1},children:"Можно и пропустить — я рядом"})]})})},Ie=m(p.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({theme:e})=>e.color.bg};
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${f.space.xl};
`,Oe=m.div`
  text-align: center;
  max-width: 400px;
`,Ee=m(p.div)`
  font-size: 80px;
  margin-bottom: ${f.space.lg};
`,Re=m.h2`
  font-size: ${f.typography.fontSize.xl};
  font-weight: ${f.typography.fontWeight.semibold};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 ${f.space.md} 0;
  line-height: ${f.typography.lineHeight.tight};
`,Ye=m.p`
  font-size: ${f.typography.fontSize.base};
  font-weight: ${f.typography.fontWeight.normal};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.textMuted};
  margin: 0 0 ${f.space.xl} 0;
  line-height: ${f.typography.lineHeight.relaxed};
`,qe=m(p.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  background: ${({theme:e})=>e.color.pet.primary};
  border-radius: 50% 0;
  transform: rotate(45deg);
`,Be=m(p.div)`
  background: ${({theme:e})=>e.color.surface};
  border: 2px solid ${({theme:e})=>e.color.pet.accent};
  border-radius: ${f.radius.card};
  padding: ${f.space.lg};
  margin-top: ${f.space.lg};
  position: relative;
  overflow: hidden;
`,Le=m.div`
  font-size: ${f.typography.fontSize.base};
  font-weight: ${f.typography.fontWeight.medium};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.text};
  line-height: ${f.typography.lineHeight.relaxed};
`,_e=m(p.div)`
  background: ${({theme:e})=>e.color.pet.primary}20;
  border: 1px solid ${({theme:e})=>e.color.pet.primary}40;
  border-radius: ${f.radius.sm};
  padding: ${f.space.md};
  margin-top: ${f.space.lg};
  font-size: ${f.typography.fontSize.sm};
  font-weight: ${f.typography.fontWeight.medium};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.pet.primary};
`,Xe=({ritual:e,reflection:t,onComplete:i})=>{h.useEffect(()=>{x();const e=setTimeout(()=>{i()},3e3);return()=>clearTimeout(e)},[i]);return d.jsx(Ie,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.3},children:d.jsxs(Oe,{children:[d.jsx(Ee,{initial:{scale:0,rotate:-180},animate:{scale:1,rotate:0},transition:{type:"spring",damping:15,stiffness:200,delay:.2},children:"good"===(null==t?void 0:t.feeling)?"🌱":"difficult"===(null==t?void 0:t.feeling)?"🤗":"✨"}),d.jsx(Re,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.4},children:"good"===(null==t?void 0:t.feeling)?"Отлично! Ты молодец! ✨":"difficult"===(null==t?void 0:t.feeling)?"Это нормально. Главное, что ты попробовал 💚":"Спасибо, что заботишься о себе 🌱"}),d.jsxs(Ye,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.6},children:['Ритуал "',e.title,'" завершён']}),d.jsx(Be,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.8},children:d.jsx(Le,{children:{breath:"Дыхание — это основа спокойствия. Ты делаешь правильно.",water:"Вода — это жизнь. Твоё тело благодарно.",stretch:"Растяжка помогает телу расслабиться. Продолжай!",gratitude:"Благодарность делает сердце теплее. Это прекрасно.",walk:"Прогулка — это подарок себе. Ты заслуживаешь это.",kindness:"Доброта возвращается. Ты делаешь мир лучше."}[e.id]||"Ты молодец!"})}),d.jsx(_e,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3,delay:1},children:"+1 к дневному прогрессу"}),[...Array(5)].map((e,t)=>d.jsx(qe,{initial:{x:400*Math.random()-200,y:100,opacity:0,scale:0},animate:{x:400*Math.random()-200,y:-100,opacity:[0,1,0],scale:[0,1,0],rotate:[0,360]},transition:{duration:3,delay:.2*t,ease:"easeOut"}},t))]})})},Ke=m.div`
  min-height: calc(100dvh - 56px - env(safe-area-inset-bottom, 0));
  display: grid;
  grid-template-rows: auto 1fr;
  max-width: 600px;
  margin: 0 auto;
`,Ne=m.div`
  padding: ${f.space.lg} ${f.space.lg} 0;
  text-align: center;
`,Ge=m.h1`
  font-size: ${f.typography.fontSize["2xl"]};
  font-weight: ${f.typography.fontWeight.semibold};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 ${f.space.sm} 0;
  line-height: ${f.typography.lineHeight.tight};
`,Ue=m.p`
  font-size: ${f.typography.fontSize.base};
  font-weight: ${f.typography.fontWeight.normal};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.textMuted};
  margin: 0;
  line-height: ${f.typography.lineHeight.normal};
`,Je=m.div`
  padding: ${f.space.lg};
  overflow-y: auto;
`,Qe=m.div`
  background: ${({theme:e})=>e.color.surface};
  border: 2px solid ${({theme:e})=>e.color.border};
  border-radius: ${f.radius.card};
  padding: ${f.space.lg};
  margin-bottom: ${f.space.lg};
  text-align: center;
`,Ve=m.h2`
  font-size: ${f.typography.fontSize.xl};
  font-weight: ${f.typography.fontWeight.semibold};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 ${f.space.sm} 0;
  line-height: ${f.typography.lineHeight.tight};
`,Ze=m.p`
  font-size: ${f.typography.fontSize.base};
  font-weight: ${f.typography.fontWeight.normal};
  font-family: ${f.typography.fontFamily.primary};
  color: ${({theme:e})=>e.color.textMuted};
  margin: 0;
  line-height: ${f.typography.lineHeight.normal};
`,et=m.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${f.space.md};
`,tt=({completedRituals:e,onCompleteRitual:t,maxDailyRituals:i})=>{var o;const[r,a]=h.useState(null),[n,p]=h.useState(!1),[m,f]=h.useState(!1),[x,v]=h.useState(null),{currentSession:j,state:k,timeLeft:z,isPaused:S,startSession:C,startRitualTimer:W,pauseTimer:T,resumeTimer:P,completeSession:M,addReflection:D,finishSession:A,cancelSession:I,updateSettings:O,getSettings:E}=(()=>{const[e,t]=h.useState(null),[i,o]=h.useState("idle"),[r,a]=h.useState({}),[n,d]=h.useState(0),[c,p]=h.useState(!1),m=h.useRef(null),f=h.useRef(0),y=h.useRef(0);h.useEffect(()=>{const e=g(w,{});a(e)},[]),h.useEffect(()=>{const e=g(b,null);if(e&&!e.completed&&(t(e),o("active"),e.duration&&e.duration>0)){const t=Date.now()-e.startTime-e.totalPausedTime,i=Math.max(0,1e3*e.duration-t);d(Math.ceil(i/1e3)),x(i)}},[x]);const x=h.useCallback(e=>{m.current&&clearInterval(m.current),f.current=Date.now(),d(Math.ceil(e/1e3)),m.current=setInterval(()=>{d(e=>e<=1?(z(),0):e-1)},1e3)},[z]),$=h.useCallback(()=>{if(m.current&&(clearInterval(m.current),m.current=null),p(!0),y.current=Date.now(),e){const i=l(s({},e),{pausedAt:Date.now()});t(i),u(b,i)}},[e]),v=h.useCallback(()=>{if(y.current&&e){const i=Date.now()-y.current,o=l(s({},e),{totalPausedTime:e.totalPausedTime+i,pausedAt:void 0});t(o),u(b,o)}p(!1),n>0&&x(1e3*n)},[e,n,x]),j=h.useCallback((e,i,r)=>{const a={id:`session_${Date.now()}`,ritualId:e,startTime:Date.now(),mode:i,completed:!1,totalPausedTime:0};t(a),o("active"),u(b,a)},[]),k=h.useCallback(e=>{e>0&&x(1e3*e)},[x]),z=h.useCallback(()=>{if(m.current&&(clearInterval(m.current),m.current=null),e){const i=l(s({},e),{endTime:Date.now(),duration:Math.floor((Date.now()-e.startTime-e.totalPausedTime)/1e3),completed:!0});t(i),o("reflect"),u(b,i)}},[e]),S=h.useCallback(i=>{if(e){const r=l(s({},e),{reflection:i});t(r),o("reward"),u(b,r)}},[e]),C=h.useCallback(()=>{o("log"),setTimeout(()=>{t(null),o("idle"),d(0),p(!1),u(b,null)},1e3)},[]),F=h.useCallback(()=>{m.current&&(clearInterval(m.current),m.current=null),t(null),o("idle"),d(0),p(!1),u(b,null)},[]),W=h.useCallback((e,t)=>{const i=l(s({},r),{[e]:s(s({},r[e]),t)});a(i),u(w,i)},[r]),T=h.useCallback(e=>r[e]||{mode:"guided",duration:30,sound:!1,haptics:!0,suggestions:!0},[r]);return h.useEffect(()=>()=>{m.current&&clearInterval(m.current)},[]),{currentSession:e,state:i,timeLeft:n,isPaused:c,startSession:j,startRitualTimer:k,pauseTimer:$,resumeTimer:v,completeSession:z,addReflection:S,finishSession:C,cancelSession:F,updateSettings:W,getSettings:T}})(),R=h.useCallback((e,t)=>{const i=F.find(t=>t.id===e);if(!i)return;const o=E(e).duration||i.defaultDuration;a(i),p(!1),C(e,t,o),y()},[E,C]),Y=h.useCallback(()=>{if(j&&0===z){if(!j.ritualId)return;const e=E(j.ritualId),t=F.find(e=>e.id===j.ritualId);if("breath"===j.ritualId||"breathe"===j.ritualId);else{const i=e.duration||(null==t?void 0:t.defaultDuration)||30;W(i)}}},[j,z,W,E]),q=h.useCallback(e=>{const t=E(e),i=F.find(t=>t.id===e);i&&showToast(`Настройки ${i.title}: ${"guided"===t.mode?"Подробный":"Быстрый"} режим`)},[E]),B=h.useCallback(e=>{D(e)},[D]),L=h.useCallback(()=>{j&&(t(j.ritualId),v(j.ritualId),f(!0)),A(),a(null)},[j,t,A]),_=h.useCallback(()=>{I(),a(null),p(!1)},[I]),X=h.useCallback(()=>{p(!1),a(null)},[]),K=h.useCallback(e=>{r&&O(r.id,{mode:e})},[r,O]),N=h.useCallback(e=>{r&&O(r.id,{breathingMode:e})},[r,O]),G=e.length;return d.jsxs(Ke,{children:[d.jsxs(Ne,{children:[d.jsx(Ge,{children:"Ритуалы дня"}),d.jsx(Ue,{children:G>0?`Выполнено: ${G} из ${i}`:"Выбери ритуал для начала дня"})]}),d.jsxs(Je,{children:[d.jsxs(Qe,{children:[d.jsx(Ve,{children:"Прогресс"}),d.jsx(Ze,{children:G>0?"Отлично! Продолжай в том же духе ✨":"Начни с простого ритуала"})]}),d.jsx(et,{children:F.map(t=>{const i=e.includes(t.id),o=E(t.id);return d.jsx(H,{ritual:t,settings:o,onStart:(e,i)=>{a(t),p(!0)},onSettings:q,isSelected:i},t.id)})})]}),d.jsx(c,{children:n&&r&&d.jsx(ce,{ritual:r,settings:E(r.id),onStart:()=>R(r.id,E(r.id).mode),onClose:X,onModeChange:K,onBreathingModeChange:N})}),d.jsx(c,{children:"active"===k&&j&&r&&d.jsx(Se,{ritual:r,session:j,timeLeft:z,isPaused:S,breathingMode:E(r.id).breathingMode,onPause:T,onResume:P,onStart:Y,onComplete:M,onCancel:_})}),d.jsx(c,{children:"reflect"===k&&r&&d.jsx(He,{ritual:r,onComplete:B,onSkip:()=>{D({feeling:"neutral"})}})}),d.jsx(c,{children:"reward"===k&&r&&j&&d.jsx(Xe,{ritual:r,reflection:j.reflection,onComplete:L})}),d.jsx(c,{children:m&&x&&d.jsx($,{type:"ritual",data:{ritualId:x,ritualTitle:(null==(o=F.find(e=>e.id===x))?void 0:o.title)||"",completedCount:G},onClose:()=>f(!1)})})]})};export{tt as RitualsPager};
