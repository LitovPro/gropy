import{j as e,A as n,m as r}from"./chunk-C02y-XeT.js";import{r as o}from"./chunk-DtX1tuCI.js";import{p as t}from"./chunk-BuVI32lr.js";import{d as i,t as a}from"./index-B2inpYTP.js";import"./chunk-BeE17Zin.js";const s=t.div`
  padding: 16px;
  background: ${({theme:e})=>e.color.surface};
  border-radius: ${a.radius.card};
  margin: 16px;
  border: 1px solid ${({theme:e})=>e.color.border};
`,d=t.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 16px 0;
  line-height: 1.4;
`,l=t.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`,c=t.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 12px 0;
  line-height: 1.4;
`,p=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 12px;
`,h=t.button`
  aspect-ratio: 3/2;
  border-radius: ${a.radius.card};
  border: 2px solid ${({$isActive:e,theme:n})=>e?n.color.accent:n.color.border};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.color.accent};
    outline-offset: 2px;
  }
`,x=t.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  ${({$theme:e})=>{switch(e){case"light":default:return"\n          background: linear-gradient(135deg, #F7F7FB 0%, #FFFFFF 100%);\n        ";case"dark":return"\n          background: linear-gradient(135deg, #0F1419 0%, #1A2230 100%);\n        ";case"ocean":return"\n          background: linear-gradient(135deg, #F0F9FF 0%, #0284C7 100%);\n        ";case"forest":return"\n          background: linear-gradient(135deg, #F0FDF4 0%, #16A34A 100%);\n        "}}}
`,u=t.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  padding: 2px 4px;
  border-radius: 4px;
`,g=t.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  background: ${({$isActive:e,theme:n})=>e?n.color.accent:"transparent"};
  border: 2px solid ${({$isActive:e,theme:n})=>e?n.color.accent:n.color.border};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
  opacity: ${({$isActive:e})=>e?1:0};
  transition: all 0.2s ease;
`,m=t.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,b=t.button`
  height: ${a.size.tap};
  border-radius: ${a.radius.button};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${({$variant:e,theme:n})=>{switch(e){case"primary":return`\n          background: ${n.color.accent};\n          color: white;\n          \n          &:hover {\n            opacity: 0.9;\n          }\n          \n          &:active {\n            transform: scale(0.98);\n          }\n        `;case"secondary":return`\n          background: ${n.color.surface};\n          color: ${n.color.textMuted};\n          border: 1px solid ${n.color.border};\n          \n          &:hover {\n            background: ${n.color.bg};\n          }\n          \n          &:active {\n            transform: scale(0.98);\n          }\n        `;case"danger":return"\n          background: #DC2626;\n          color: white;\n          border: 2px solid #B91C1C;\n          font-weight: 600;\n          position: relative;\n          overflow: hidden;\n          \n          &::before {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: -100%;\n            width: 100%;\n            height: 100%;\n            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);\n            transition: left 0.5s;\n          }\n          \n          &:hover {\n            background: #B91C1C;\n            border-color: #991B1B;\n            transform: translateY(-1px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n            \n            &::before {\n              left: 100%;\n            }\n          }\n          \n          &:active {\n            transform: translateY(0);\n            box-shadow: 0 2px 6px rgba(220, 38, 38, 0.4);\n          }\n          \n          &:disabled {\n            background: #9CA3AF;\n            border-color: #6B7280;\n            color: #D1D5DB;\n            cursor: not-allowed;\n            transform: none;\n            box-shadow: none;\n            \n            &:hover {\n              background: #9CA3AF;\n              border-color: #6B7280;\n              transform: none;\n              box-shadow: none;\n            }\n          }\n        "}}}

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.color.accent};
    outline-offset: 2px;
  }
`,f=t.div`
  background: ${({theme:e})=>e.color.bg};
  border: 1px solid #EF4444;
  border-radius: ${a.radius.card};
  padding: 16px;
  margin-top: 16px;
`,$=t.h4`
  font-size: 14px;
  font-weight: 600;
  color: #EF4444;
  margin: 0 0 8px 0;
  line-height: 1.4;
`,v=t.p`
  font-size: 12px;
  font-weight: 500;
  color: ${({theme:e})=>e.color.textMuted};
  margin: 0 0 12px 0;
  line-height: 1.4;
`,j=t.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #EF4444;
  border-radius: ${a.radius.button};
  font-size: 14px;
  font-weight: 500;
  color: ${({theme:e})=>e.color.text};
  background: ${({theme:e})=>e.color.surface};
  margin-bottom: 12px;

  &:focus {
    border-color: #EF4444;
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid #EF4444;
    outline-offset: 2px;
  }
`,w=[{id:"light",name:"Светлая"},{id:"dark",name:"Тёмная"},{id:"ocean",name:"Океан"},{id:"forest",name:"Лес"}],k=({onExportData:t,onImportData:a,onResetAll:k})=>{const{themeName:F,setTheme:y}=i(),[A,C]=o.useState(!1),[z,D]=o.useState(""),[S,B]=o.useState(""),[E,M]=o.useState(0),[I,T]=o.useState(null),Y="СБРОС"===z,N=I?Date.now()<I:E>=3,R=I?Math.max(0,Math.ceil((I-Date.now())/1e3)):0;return o.useEffect(()=>{if(I&&R>0){const e=setInterval(()=>{Date.now()>=I&&(T(null),M(0))},1e3);return()=>clearInterval(e)}},[I,R]),e.jsxs(s,{children:[e.jsx(d,{children:"Профиль"}),e.jsxs(l,{children:[e.jsx(c,{children:"Тема оформления"}),e.jsx(p,{children:w.map(n=>e.jsxs(h,{$isActive:F===n.id,onClick:()=>{return e=n.id,void y(e);var e},children:[e.jsx(x,{$theme:n.id}),e.jsx(u,{children:n.name}),e.jsx(g,{$isActive:F===n.id,children:"✓"})]},n.id))})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Данные"}),e.jsxs(m,{children:[e.jsx(b,{$variant:"primary",onClick:()=>{t()},children:"📤 Экспорт данных"}),e.jsx(b,{$variant:"secondary",onClick:()=>{S.trim()&&(a(S),B(""))},children:"📥 Импорт данных"})]})]}),e.jsxs(f,{children:[e.jsx($,{children:"Опасная зона"}),e.jsx(v,{children:"Сброс всех данных. Это действие нельзя отменить."}),e.jsx(n,{children:A?e.jsxs(r.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.2},children:[e.jsx(j,{type:"text",placeholder:"Введите СБРОС для подтверждения",value:z,onChange:e=>D(e.target.value),disabled:N}),E>0&&E<3&&e.jsxs(v,{style:{fontSize:"12px",marginTop:"8px"},children:["Неверный ввод. Попыток: ",E,"/3"]}),N&&e.jsx(v,{style:{fontSize:"12px",marginTop:"8px"},children:R>0?`Слишком много попыток. Попробуйте через ${Math.floor(R/60)}:${(R%60).toString().padStart(2,"0")}`:"Слишком много попыток. Попробуйте позже."}),e.jsx(b,{$variant:"danger",onClick:()=>{if("СБРОС"===z)k(),D(""),C(!1),M(0),T(null);else{const e=E+1;M(e),e>=3&&T(Date.now()+3e5)}},disabled:!Y||N,children:N?"Заблокировано":"Сбросить всё"})]}):e.jsx(b,{$variant:"danger",onClick:()=>C(!0),disabled:N,children:N?"Заблокировано":"Сбросить всё"})})]})]})};export{k as ProfileSection};
