import{j as e}from"./chunk-C02y-XeT.js";import{r as t}from"./chunk-DtX1tuCI.js";import{p as r}from"./chunk-BuVI32lr.js";import{e as o,f as s,t as n,p as a}from"./index-B2inpYTP.js";import"./chunk-BeE17Zin.js";const i=r.div`
  background: ${({theme:e})=>e.color.surface};
  border: 2px solid ${({theme:e})=>e.color.border};
  border-radius: ${n.radius.card};
  padding: ${n.space.lg};
  margin-bottom: ${n.space.lg};
`,l=r.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 ${n.space.md} 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`,c=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${n.space.md};

  &:last-child {
    margin-bottom: 0;
  }
`,p=r.label`
  font-size: 14px;
  color: ${({theme:e})=>e.color.text};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${n.space.sm};
`,d=r.div`
  width: 44px;
  height: 24px;
  background: ${({theme:e,$isOn:t})=>t?e.color.pet.primary:e.color.border};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: all ${n.motion.fast} ${n.motion.easing};

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({$isOn:e})=>e?"22px":"2px"};
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: all ${n.motion.fast} ${n.motion.easing};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`,m=r.div`
  position: relative;
  width: 120px;
  height: 8px;
  background: ${({theme:e})=>e.color.border};
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: all ${n.motion.fast} ${n.motion.easing};

  &:hover {
    transform: scaleY(1.2);
  }
`,g=r.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({$progress:e})=>e}%;
  background: linear-gradient(90deg, 
    ${({theme:e})=>e.color.pet.primary} 0%, 
    ${({theme:e})=>e.color.warm.medium} 100%
  );
  border-radius: 4px;
  transition: width ${n.motion.fast} ${n.motion.easing};
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
`,u=r.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  opacity: 0;
  z-index: 2;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: white;
    border: 3px solid ${({theme:e})=>e.color.pet.primary};
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: all ${n.motion.fast} ${n.motion.easing};
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: white;
    border: 3px solid ${({theme:e})=>e.color.pet.primary};
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: all ${n.motion.fast} ${n.motion.easing};
  }

  &:hover::-webkit-slider-thumb {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:hover::-moz-range-thumb {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active::-webkit-slider-thumb {
    transform: scale(0.95);
  }

  &:active::-moz-range-thumb {
    transform: scale(0.95);
  }
`,h=r.span`
  font-size: 12px;
  color: ${({theme:e})=>e.color.textMuted};
  min-width: 30px;
  text-align: right;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`,x=({className:r})=>{const[x,b]=t.useState(!0),[f,y]=t.useState(!1),[$,j]=t.useState(30),[v,w]=t.useState(10);t.useEffect(()=>{const e=localStorage.getItem("gropy-sounds-enabled"),t=localStorage.getItem("gropy-ambient-enabled"),r=localStorage.getItem("gropy-sound-volume"),n=localStorage.getItem("gropy-ambient-volume");if(null!==e){const t="true"===e;b(t),o.setEnabled(t)}if(null!==t){const e="true"===t;y(e),e&&s.startAmbient()}if(null!==r){const e=parseInt(r)/100;j(parseInt(r)),o.setVolume(e)}if(null!==n){const e=parseInt(n)/100;w(parseInt(n)),s.setVolume(e)}s.initialize()},[]);const k=e=>{return t=void 0,r=null,o=function*(){y(e),localStorage.setItem("gropy-ambient-enabled",e.toString()),e?yield s.startAmbient():s.stopAmbient()},new Promise((e,s)=>{var n=e=>{try{i(o.next(e))}catch(t){s(t)}},a=e=>{try{i(o.throw(e))}catch(t){s(t)}},i=t=>t.done?e(t.value):Promise.resolve(t.value).then(n,a);i((o=o.apply(t,r)).next())});var t,r,o};return e.jsxs(i,{className:r,children:[e.jsx(l,{children:"звуки и атмосфера"}),x&&e.jsxs(c,{children:[e.jsxs(p,{children:[e.jsx("span",{children:"🎵"}),"тест звука"]}),e.jsx("button",{onClick:()=>{x&&a()},style:{background:"transparent",border:"1px solid #22C55E",borderRadius:"8px",padding:"4px 12px",color:"#22C55E",fontSize:"12px",cursor:"pointer",transition:"all 0.1s ease"},onMouseOver:e=>{e.currentTarget.style.background="#22C55E",e.currentTarget.style.color="white"},onFocus:e=>{e.currentTarget.style.background="#22C55E",e.currentTarget.style.color="white"},onMouseOut:e=>{e.currentTarget.style.background="transparent",e.currentTarget.style.color="#22C55E"},onBlur:e=>{e.currentTarget.style.background="transparent",e.currentTarget.style.color="#22C55E"},children:"проиграть"})]}),e.jsxs(c,{children:[e.jsxs(p,{children:[e.jsx("span",{children:"🔊"}),"звуки действий"]}),e.jsx(d,{$isOn:x,onClick:()=>{return b(e=!x),o.setEnabled(e),void localStorage.setItem("gropy-sounds-enabled",e.toString());var e}})]}),e.jsxs(c,{children:[e.jsxs(p,{children:[e.jsx("span",{children:"🌿"}),"фоновые звуки"]}),e.jsx(d,{$isOn:f,onClick:()=>k(!f)})]}),x&&e.jsxs(c,{children:[e.jsxs(p,{children:[e.jsx("span",{children:"🔉"}),"громкость звуков"]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:n.space.sm},children:[e.jsxs(m,{children:[e.jsx(g,{$progress:$}),e.jsx(u,{type:"range",min:"0",max:"100",value:$,onChange:e=>{return t=parseInt(e.target.value),j(t),o.setVolume(t/100),localStorage.setItem("gropy-sound-volume",t.toString()),void(x&&a());var t}})]}),e.jsxs(h,{children:[$,"%"]})]})]}),f&&e.jsxs(c,{children:[e.jsxs(p,{children:[e.jsx("span",{children:"🌊"}),"громкость фона"]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:n.space.sm},children:[e.jsxs(m,{children:[e.jsx(g,{$progress:v/20*100}),e.jsx(u,{type:"range",min:"0",max:"20",value:v,onChange:e=>{return t=parseInt(e.target.value),w(t),s.setVolume(t/100),localStorage.setItem("gropy-ambient-volume",t.toString()),void(x&&a());var t}})]}),e.jsxs(h,{children:[v,"%"]})]})]})]})};export{x as SoundSettings};
