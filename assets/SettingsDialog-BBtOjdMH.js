import{j as e,u as o,k as h,g as u,s as x}from"./index-CM_eYLlH.js";function m({id:t,checked:a,onChange:n,label:l}){return e.jsxs("div",{children:[e.jsx("input",{id:t,type:"checkbox",checked:a,onChange:n,className:"mr-2"}),e.jsx("label",{htmlFor:t,children:l})]})}function p({open:t,onClose:a}){const n=o(),l=h();return e.jsxs(u,{open:t,onClose:a,children:[e.jsx("h4",{children:"Settings"}),Object.entries(x).filter(([,s])=>!(!l&&s.smallScreensOnly)).map(([s,{title:r,callback:c}])=>e.jsx(m,{id:s,checked:n[s],label:r,onChange:i=>{c(i.target.checked,n)}},s))]})}export{p as default};
//# sourceMappingURL=SettingsDialog-BBtOjdMH.js.map