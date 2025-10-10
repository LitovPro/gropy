import{j as e,A as i,m as o}from"./chunk-C02y-XeT.js";import{R as t,r}from"./chunk-DtX1tuCI.js";import{p as n}from"./chunk-BuVI32lr.js";import{t as c}from"./index-B2inpYTP.js";import"./chunk-BeE17Zin.js";const d=n.div`
  padding: 16px;
  background: ${({theme:e})=>e.color.surface};
  border-radius: ${c.radius.card};
  margin: 16px;
  border: 1px solid ${({theme:e})=>e.color.border};
`,s=n.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({theme:e})=>e.color.text};
  margin: 0 0 16px 0;
  line-height: 1.4;
`,a=n.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`,l=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`,p=n.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme:e})=>e.color.text};
  margin: 0;
  line-height: 1.4;
`,h=n.button`
  background: none;
  border: none;
  color: ${({theme:e})=>e.color.textMuted};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: ${c.radius.button};
  transition: all 0.2s ease;

  &:hover {
    background: ${({theme:e})=>e.color.bg};
  }

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.color.accent};
    outline-offset: 2px;
  }
`,m=n.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
`,x=n.div`
  background: ${({$owned:e,theme:i})=>e?i.color.effort.easy:i.color.surface};
  border: 1px solid ${({$owned:e,theme:i})=>e?i.color.effort.easy:i.color.border};
  border-radius: ${c.radius.card};
  padding: 12px;
  text-align: center;
  position: relative;
  opacity: ${({$canAfford:e,$owned:i})=>e||i?1:.6};
`,f=n.div`
  font-size: 24px;
  margin-bottom: 8px;
`,u=n.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({theme:e})=>e.color.text};
  margin-bottom: 4px;
  line-height: 1.4;
`,g=n.div`
  font-size: 11px;
  font-weight: 500;
  color: ${({theme:e})=>e.color.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`,$=n.button`
  width: 100%;
  height: ${c.size.tap};
  border-radius: ${c.radius.button};
  font-size: 12px;
  font-weight: 600;
  cursor: ${({$canAfford:e,$owned:i})=>i?"default":e?"pointer":"not-allowed"};
  border: none;
  margin-top: 8px;
  transition: all 0.2s ease;

  ${({$owned:e,$canAfford:i,theme:o})=>e?`\n        background: ${o.color.effort.easy};\n        color: white;\n      `:i?`\n        background: ${o.color.accent};\n        color: white;\n        \n        &:hover {\n          opacity: 0.9;\n        }\n        \n        &:active {\n          transform: scale(0.98);\n        }\n      `:`\n      background: ${o.color.bg};\n      color: ${o.color.textMuted};\n    `}

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.color.accent};
    outline-offset: 2px;
  }
`,j=n.div`
  font-size: 10px;
  font-weight: 500;
  color: ${({theme:e})=>e.color.textMuted};
  margin-top: 4px;
  line-height: 1.3;
`,b=n.div`
  text-align: center;
  padding: 24px 16px;
  color: ${({theme:e})=>e.color.textMuted};
`,y=n.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
`,w=[{id:"theme-ocean",name:"Океан",emoji:"🌊",price:10,type:"theme",rarity:"common",description:"Спокойные голубые тона"},{id:"theme-forest",name:"Лес",emoji:"🌲",price:10,type:"theme",rarity:"common",description:"Свежие зелёные оттенки"},{id:"pet-cat",name:"Кот",emoji:"🐱",price:25,type:"pet",rarity:"rare",description:"Мягкий и пушистый друг"},{id:"pet-dog",name:"Собака",emoji:"🐶",price:25,type:"pet",rarity:"rare",description:"Верный и игривый компаньон"},{id:"pet-unicorn",name:"Единорог",emoji:"🦄",price:50,type:"pet",rarity:"epic",description:"Волшебный и редкий питомец"}],v=t.memo(({points:t,ownedItems:n,onPurchase:c})=>{const[v,k]=r.useState(!0),z=w.filter(e=>n.includes(e.id)),A=w.filter(e=>!n.includes(e.id)),M=e=>t>=e,C=e=>n.includes(e),I=e=>C(e.id)?"Куплено":M(e.price)?"Купить":"Недоступно",P=e=>{if(C(e.id)||M(e.price))return null;return`Ещё ${e.price-t}⚡ — и сможем взять 😊`};return e.jsxs(d,{children:[e.jsx(s,{children:"Магазин"}),e.jsxs(a,{children:[e.jsxs(l,{children:[e.jsx(p,{children:"Мои предметы"}),e.jsx(h,{onClick:()=>k(!v),children:v?"Скрыть":"Показать"})]}),e.jsx(i,{children:v&&e.jsx(o.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.2},children:z.length>0?e.jsx(m,{children:z.map(i=>e.jsxs(x,{$canAfford:!0,$owned:!0,children:[e.jsx(f,{children:i.emoji}),e.jsx(u,{children:i.name}),e.jsx(g,{children:"Куплено"})]},i.id))}):e.jsx(b,{children:e.jsx(y,{children:"Пока ничего не куплено"})})})})]}),e.jsxs(a,{children:[e.jsx(p,{children:"Доступно сейчас"}),e.jsx(m,{children:A.map(i=>e.jsxs(x,{$canAfford:M(i.price),$owned:!1,children:[e.jsx(f,{children:i.emoji}),e.jsx(u,{children:i.name}),e.jsxs(g,{children:["⚡ ",i.price]}),e.jsx($,{$canAfford:M(i.price),$owned:!1,onClick:()=>M(i.price)&&c(i.id),disabled:!M(i.price),children:I(i)}),P(i)&&e.jsx(j,{children:P(i)})]},i.id))})]})]})});export{v as Shop};
