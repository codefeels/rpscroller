import{j as e,u as j,r as u,h as w,G as k,i as g,n as f}from"./index-BP-Ik0-s.js";import{I as N}from"./index-mvpE5TEj.js";import{M as p,a as S}from"./index-Bp3X1hg4.js";import{F as M,a as V,b as h,c as x,d as y}from"./index-eYR71rwW.js";import{B as d}from"./Button-Do9Y_WjI.js";import{a as F}from"./index-owIISkzP.js";import{B as L}from"./BaseDialog-Cc3Zc_os.js";import"./util-DZW1Yq4O.js";function l({children:i,onClick:s}){return e.jsx("div",{className:"hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer m-1 whitespace-nowrap",onClick:s,children:i})}function B(){const i=j(),{val:s}=i,[a,r]=u.useState(s);return u.useEffect(()=>{r(s)},[s]),e.jsx("form",{className:"inline",onSubmit:o=>{o.preventDefault(),i.setVal(a)},children:e.jsxs("div",{className:"max-w-full flex",children:[e.jsx("input",{id:"box",type:"text",className:"m-1 rounded",value:a,onChange:o=>{r(o.target.value)}}),e.jsx(d,{type:"submit",children:"Submit"}),w(a,i.favorites)?null:e.jsx(d,{onClick:()=>{i.addFavorite(a)},children:e.jsx(p,{className:"inline"})})]})})}function E(i){return k({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M5.22 8.22a.749.749 0 0 0 0 1.06l6.25 6.25a.749.749 0 0 0 1.06 0l6.25-6.25a.749.749 0 1 0-1.06-1.06L12 13.939 6.28 8.22a.749.749 0 0 0-1.06 0Z"},child:[]}]})(i)}const b={hot:"Hot",new:"New",topday:"Top (day)",topmonth:"Top (month)",topyear:"Top (year)",topall:"Top (all time)"};function R(){const i=j(),{mode:s}=i,[a,r]=u.useState(!1),o=u.useRef(null);return u.useEffect(()=>{function n(c){o.current&&!o.current.contains(c.target)&&r(!1)}return document.addEventListener("mousedown",n),()=>{document.removeEventListener("mousedown",n)}},[]),e.jsxs("div",{ref:o,className:"relative",children:[e.jsxs(d,{onClick:()=>{r(n=>!n)},id:"menu-button","aria-expanded":"true","aria-haspopup":"true",children:[b[s],e.jsx(E,{className:"inline"})]}),a?e.jsx("div",{className:"absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white dark:bg-black",role:"menu","aria-orientation":"vertical","aria-labelledby":"menu-button",children:Object.entries(b).map(([n,c])=>e.jsxs(l,{onClick:()=>{i.setMode(n)},children:[e.jsx("label",{htmlFor:n,children:c}),e.jsx("input",{id:n,value:n,type:"radio",checked:s===n,onChange:m=>{i.setMode(m.target.value)}})]},n))}):null]})}function T({onClose:i,children:s}){const a=j(),{headerOnBottomOfScreen:r}=a,o=u.useRef(null);return u.useEffect(()=>{function n(c){o.current&&!o.current.contains(c.target)&&c.target.id!=="menubutton"&&i()}return document.addEventListener("mousedown",n),()=>{document.removeEventListener("mousedown",n)}},[i]),e.jsx("div",{ref:o,className:`absolute ${r?"right-0 bottom-10 origin-bottom-right":"origin-top-right left-0"}  z-10 m-1 p-1 rounded-md shadow-lg focus:outline-none bg-white dark:bg-black max-h-[85vh] overflow-auto`,children:s})}function I({open:i,onClose:s,children:a}){return e.jsx(L,{open:i,onClose:s,children:a})}function D({open:i,onClose:s,children:a}){return F("(min-width: 768px)")?e.jsx(T,{onClose:s,children:a}):e.jsx(I,{open:i,onClose:s,children:a})}function Z({setOpen:i}){const s=j(),{showMostVisitedSubreddits:a,showMostVisitedUsers:r,showRecentlyVisited:o,showLists:n,lists:c,favorites:m,recentlyVisited:C}=s;return e.jsx(D,{open:!0,onClose:()=>{i(void 0)},children:e.jsxs("div",{className:"max-w-3xl ",children:[e.jsx(B,{}),e.jsx(R,{}),e.jsxs(l,{onClick:()=>{i("settings")},children:[e.jsx(N,{className:"inline"})," Settings"]}),e.jsxs(l,{onClick:()=>{i("favoriteSubreddits")},children:[e.jsx(p,{className:"inline"})," Fav subs"]}),e.jsxs(l,{onClick:()=>{i("favoriteUsers")},children:[e.jsx(p,{className:"inline"})," Fav users"]}),e.jsxs(l,{onClick:()=>{s.setVal("savedposts")},children:[e.jsx(M,{className:"inline"})," Saved posts"]}),e.jsxs(l,{onClick:()=>{i("multi")},children:[e.jsx(V,{className:"inline"})," Make list"]}),e.jsxs(l,{onClick:()=>{i("blocked")},children:[e.jsx(S,{className:"inline"})," Blocked users"]}),e.jsx("hr",{}),c.length>0?e.jsxs("div",{children:[e.jsxs("div",{children:["Lists:"," ",e.jsx(d,{onClick:()=>{s.setShowLists(!n)},children:n?e.jsx(h,{className:"inline"}):e.jsx(x,{className:"inline"})})]}),n?c.map(t=>e.jsxs(l,{onClick:()=>{s.setVal(t.val)},children:["- ",t.name," ",e.jsx(d,{onClick:()=>{s.removeList(t.name)},children:e.jsx(y,{})})]},t.name)):null]}):null,e.jsx("hr",{}),e.jsxs("div",{children:["Most visited subreddits:"," ",e.jsx(d,{onClick:()=>{s.setShowMostVisitedSubreddits(!a)},children:a?e.jsx(h,{className:"inline"}):e.jsx(x,{className:"inline"})})]}),a?m.filter(t=>!g(t.name)).sort((t,v)=>v.visitedCount-t.visitedCount).slice(0,5).map(t=>e.jsxs(l,{onClick:()=>{s.setVal(t.name)},children:["- ",f(t.name)," (",t.visitedCount,")"]},t.name)):null,e.jsx("hr",{}),e.jsxs("div",{children:["Most visited users:"," ",e.jsx(d,{onClick:()=>{s.setShowMostVisitedUsers(!r)},children:r?e.jsx(h,{className:"inline"}):e.jsx(x,{className:"inline"})})]}),r?m.filter(t=>g(t.name)).sort((t,v)=>v.visitedCount-t.visitedCount).slice(0,5).map(t=>e.jsxs(l,{onClick:()=>{s.setVal(t.name)},children:["- ",f(t.name)," (",t.visitedCount,")"]},t.name)):null,e.jsx("hr",{}),e.jsxs("div",{children:["Recently visited:",e.jsx(d,{onClick:()=>{s.setShowRecentlyVisited(!o)},children:o?e.jsx(h,{className:"inline"}):e.jsx(x,{className:"inline"})})]}),o?e.jsxs("div",{children:[C.filter(t=>t!=="savedposts").map(t=>e.jsxs(l,{onClick:()=>{s.setVal(t)},children:["- ",f(t)]},t)),e.jsx(d,{onClick:()=>{s.clearRecentlyVisited()},children:"Clear"})]}):null,e.jsx("hr",{}),e.jsx(l,{onClick:()=>{i("about")},children:"About"})]})})}export{Z as default};
//# sourceMappingURL=HeaderMenu-DEhXTMQa.js.map