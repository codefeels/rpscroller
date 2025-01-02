import{r as Ee,R as Mt,a as S,u as he,b as pe,m as Re,j as Y}from"./index-BkFpsE9R.js";import{L as Kt,E as me,C as Se}from"./LoadingSpinner-TO-r7iR_.js";import"./Link-BQREJAk8.js";import"./formatDistanceToNowStrict-DGPDrA_T.js";import"./en-US-Ckk-QizZ.js";var vt={exports:{}},wt={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bt;function ge(){if(Bt)return wt;Bt=1;var t=Ee();function e(c,E){return c===E&&(c!==0||1/c===1/E)||c!==c&&E!==E}var n=typeof Object.is=="function"?Object.is:e,r=t.useState,u=t.useEffect,s=t.useLayoutEffect,i=t.useDebugValue;function R(c,E){var o=E(),T=r({inst:{value:o,getSnapshot:E}}),h=T[0].inst,H=T[1];return s(function(){h.value=o,h.getSnapshot=E,l(h)&&H({inst:h})},[c,o,E]),u(function(){return l(h)&&H({inst:h}),c(function(){l(h)&&H({inst:h})})},[c]),i(o),o}function l(c){var E=c.getSnapshot;c=c.value;try{var o=E();return!n(c,o)}catch{return!0}}function O(c,E){return E()}var _=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?O:R;return wt.useSyncExternalStore=t.useSyncExternalStore!==void 0?t.useSyncExternalStore:_,wt}var Gt;function ve(){return Gt||(Gt=1,vt.exports=ge()),vt.exports}var ee=ve(),Yt=Object.prototype.hasOwnProperty;function At(t,e){var n,r;if(t===e)return!0;if(t&&e&&(n=t.constructor)===e.constructor){if(n===Date)return t.getTime()===e.getTime();if(n===RegExp)return t.toString()===e.toString();if(n===Array){if((r=t.length)===e.length)for(;r--&&At(t[r],e[r]););return r===-1}if(!n||typeof t=="object"){r=0;for(n in t)if(Yt.call(t,n)&&++r&&!Yt.call(e,n)||!(n in e)||!At(t[n],e[n]))return!1;return Object.keys(e).length===r}}return t!==t&&e!==e}const K=new WeakMap,Z=()=>{},C=Z(),Lt=Object,f=t=>t===C,z=t=>typeof t=="function",tt=(t,e)=>({...t,...e}),ne=t=>z(t.then),_t={},dt={},Wt="undefined",Rt=typeof window!=Wt,It=typeof document!=Wt,we=()=>Rt&&typeof window.requestAnimationFrame!=Wt,Q=(t,e)=>{const n=K.get(t);return[()=>!f(e)&&t.get(e)||_t,r=>{if(!f(e)){const u=t.get(e);e in dt||(dt[e]=u),n[5](e,tt(u,r),u||_t)}},n[6],()=>!f(e)&&e in dt?dt[e]:!f(e)&&t.get(e)||_t]};let Vt=!0;const _e=()=>Vt,[xt,Nt]=Rt&&window.addEventListener?[window.addEventListener.bind(window),window.removeEventListener.bind(window)]:[Z,Z],Te=()=>{const t=It&&document.visibilityState;return f(t)||t!=="hidden"},Oe=t=>(It&&document.addEventListener("visibilitychange",t),xt("focus",t),()=>{It&&document.removeEventListener("visibilitychange",t),Nt("focus",t)}),ye=t=>{const e=()=>{Vt=!0,t()},n=()=>{Vt=!1};return xt("online",e),xt("offline",n),()=>{Nt("online",e),Nt("offline",n)}},Ce={isOnline:_e,isVisible:Te},De={initFocus:Oe,initReconnect:ye},Xt=!Mt.useId,ut=!Rt||"Deno"in globalThis,be=t=>we()?window.requestAnimationFrame(t):setTimeout(t,1),pt=ut?S.useEffect:S.useLayoutEffect,Tt=typeof navigator<"u"&&navigator.connection,Qt=!ut&&Tt&&(["slow-2g","2g"].includes(Tt.effectiveType)||Tt.saveData),Et=new WeakMap,Ot=(t,e)=>Lt.prototype.toString.call(t)===`[object ${e}]`;let Ae=0;const jt=t=>{const e=typeof t,n=Ot(t,"Date"),r=Ot(t,"RegExp"),u=Ot(t,"Object");let s,i;if(Lt(t)===t&&!n&&!r){if(s=Et.get(t),s)return s;if(s=++Ae+"~",Et.set(t,s),Array.isArray(t)){for(s="@",i=0;i<t.length;i++)s+=jt(t[i])+",";Et.set(t,s)}if(u){s="#";const R=Lt.keys(t).sort();for(;!f(i=R.pop());)f(t[i])||(s+=i+":"+jt(t[i])+",");Et.set(t,s)}}else s=n?t.toJSON():e=="symbol"?t.toString():e=="string"?JSON.stringify(t):""+t;return s},lt=t=>{if(z(t))try{t=t()}catch{t=""}const e=t;return t=typeof t=="string"?t:(Array.isArray(t)?t.length:t)?jt(t):"",[t,e]};let Le=0;const Pt=()=>++Le,se=0,re=1,ie=2,Ie=3;var ct={__proto__:null,ERROR_REVALIDATE_EVENT:Ie,FOCUS_EVENT:se,MUTATE_EVENT:ie,RECONNECT_EVENT:re};async function oe(...t){const[e,n,r,u]=t,s=tt({populateCache:!0,throwOnError:!0},typeof u=="boolean"?{revalidate:u}:u||{});let i=s.populateCache;const R=s.rollbackOnError;let l=s.optimisticData;const O=E=>typeof R=="function"?R(E):R!==!1,_=s.throwOnError;if(z(n)){const E=n,o=[],T=e.keys();for(const h of T)!/^\$(inf|sub)\$/.test(h)&&E(e.get(h)._k)&&o.push(h);return Promise.all(o.map(c))}return c(n);async function c(E){const[o]=lt(E);if(!o)return;const[T,h]=Q(e,o),[H,a,P,U]=K.get(e),$=()=>{const I=H[o];return(z(s.revalidate)?s.revalidate(T().data,E):s.revalidate!==!1)&&(delete P[o],delete U[o],I&&I[0])?I[0](ie).then(()=>T().data):T().data};if(t.length<3)return $();let m=r,p;const A=Pt();a[o]=[A,0];const d=!f(l),F=T(),g=F.data,L=F._c,q=f(L)?g:L;if(d&&(l=z(l)?l(q,g):l,h({data:l,_c:q})),z(m))try{m=m(q)}catch(I){p=I}if(m&&ne(m))if(m=await m.catch(I=>{p=I}),A!==a[o][0]){if(p)throw p;return m}else p&&d&&O(p)&&(i=!0,h({data:q,_c:C}));if(i&&!p)if(z(i)){const I=i(m,q);h({data:I,error:C,_c:C})}else h({data:m,error:C,_c:C});if(a[o][1]=Pt(),Promise.resolve($()).then(()=>{h({_c:C})}),p){if(_)throw p;return}return m}}const Zt=(t,e)=>{for(const n in t)t[n][0]&&t[n][0](e)},Ve=(t,e)=>{if(!K.has(t)){const n=tt(De,e),r={},u=oe.bind(C,t);let s=Z;const i={},R=(_,c)=>{const E=i[_]||[];return i[_]=E,E.push(c),()=>E.splice(E.indexOf(c),1)},l=(_,c,E)=>{t.set(_,c);const o=i[_];if(o)for(const T of o)T(c,E)},O=()=>{if(!K.has(t)&&(K.set(t,[r,{},{},{},u,l,R]),!ut)){const _=n.initFocus(setTimeout.bind(C,Zt.bind(C,r,se))),c=n.initReconnect(setTimeout.bind(C,Zt.bind(C,r,re)));s=()=>{_&&_(),c&&c(),K.delete(t)}}};return O(),[t,u,O,s]}return[t,K.get(t)[4]]},xe=(t,e,n,r,u)=>{const s=n.errorRetryCount,i=u.retryCount,R=~~((Math.random()+.5)*(1<<(i<8?i:8)))*n.errorRetryInterval;!f(s)&&i>s||setTimeout(r,R,u)},Ne=At,[Ut,je]=Ve(new Map),Pe=tt({onLoadingSlow:Z,onSuccess:Z,onError:Z,onErrorRetry:xe,onDiscarded:Z,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:Qt?1e4:5e3,focusThrottleInterval:5*1e3,dedupingInterval:2*1e3,loadingTimeout:Qt?5e3:3e3,compare:Ne,isPaused:()=>!1,cache:Ut,mutate:je,fallback:{}},Ce),Fe=(t,e)=>{const n=tt(t,e);if(e){const{use:r,fallback:u}=t,{use:s,fallback:i}=e;r&&s&&(n.use=r.concat(s)),u&&i&&(n.fallback=tt(u,i))}return n},$e=S.createContext({}),ae="$inf$",ce=Rt&&window.__SWR_DEVTOOLS_USE__,Me=ce?window.__SWR_DEVTOOLS_USE__:[],We=()=>{ce&&(window.__SWR_DEVTOOLS_REACT__=Mt)},ue=t=>z(t[1])?[t[0],t[1],t[2]||{}]:[t[0],null,(t[1]===null?t[2]:t[1])||{}],Ue=()=>tt(Pe,S.useContext($e)),qe=t=>(e,n,r)=>t(e,n&&((...s)=>{const[i]=lt(e),[,,,R]=K.get(Ut);if(i.startsWith(ae))return n(...s);const l=R[i];return f(l)?n(...s):(delete R[i],l)}),r),ze=Me.concat(qe),He=t=>function(...n){const r=Ue(),[u,s,i]=ue(n),R=Fe(r,i);let l=t;const{use:O}=R,_=(O||[]).concat(ze);for(let c=_.length;c--;)l=_[c](l);return l(u,s||R.fetcher||null,R)},ke=(t,e,n)=>{const r=e[t]||(e[t]=[]);return r.push(n),()=>{const u=r.indexOf(n);u>=0&&(r[u]=r[r.length-1],r.pop())}},Je=(t,e)=>(...n)=>{const[r,u,s]=ue(n),i=(s.use||[]).concat(e);return t(r,u,{...s,use:i})};We();const yt=Mt.use||(t=>{switch(t.status){case"pending":throw t;case"fulfilled":return t.value;case"rejected":throw t.reason;default:throw t.status="pending",t.then(e=>{t.status="fulfilled",t.value=e},e=>{t.status="rejected",t.reason=e}),t}}),Ct={dedupe:!0},Ke=(t,e,n)=>{const{cache:r,compare:u,suspense:s,fallbackData:i,revalidateOnMount:R,revalidateIfStale:l,refreshInterval:O,refreshWhenHidden:_,refreshWhenOffline:c,keepPreviousData:E}=n,[o,T,h,H]=K.get(r),[a,P]=lt(t),U=S.useRef(!1),$=S.useRef(!1),m=S.useRef(a),p=S.useRef(e),A=S.useRef(n),d=()=>A.current,F=()=>d().isVisible()&&d().isOnline(),[g,L,q,I]=Q(r,a),N=S.useRef({}).current,k=f(i)?f(n.fallback)?C:n.fallback[a]:i,et=(v,w)=>{for(const x in N){const y=x;if(y==="data"){if(!u(v[y],w[y])&&(!f(v[y])||!u(ot,w[y])))return!1}else if(w[y]!==v[y])return!1}return!0},D=S.useMemo(()=>{const v=!a||!e?!1:f(R)?d().isPaused()||s?!1:l!==!1:R,w=j=>{const B=tt(j);return delete B._k,v?{isValidating:!0,isLoading:!0,...B}:B},x=g(),y=I(),J=w(x),rt=x===y?J:w(y);let b=J;return[()=>{const j=w(g());return et(j,b)?(b.data=j.data,b.isLoading=j.isLoading,b.isValidating=j.isValidating,b.error=j.error,b):(b=j,j)},()=>rt]},[r,a]),M=ee.useSyncExternalStore(S.useCallback(v=>q(a,(w,x)=>{et(x,w)||v()}),[r,a]),D[0],D[1]),nt=!U.current,mt=o[a]&&o[a].length>0,X=M.data,V=f(X)?k&&ne(k)?yt(k):k:X,st=M.error,it=S.useRef(V),ot=E?f(X)?it.current:X:V,ft=mt&&!f(st)?!1:nt&&!f(R)?R:d().isPaused()?!1:s?f(V)?!1:l:f(V)||l,qt=!!(a&&e&&nt&&ft),le=f(M.isValidating)?qt:M.isValidating,fe=f(M.isLoading)?qt:M.isLoading,at=S.useCallback(async v=>{const w=p.current;if(!a||!w||$.current||d().isPaused())return!1;let x,y,J=!0;const rt=v||{},b=!h[a]||!rt.dedupe,j=()=>Xt?!$.current&&a===m.current&&U.current:a===m.current,B={isValidating:!1,isLoading:!1},Ht=()=>{L(B)},kt=()=>{const W=h[a];W&&W[1]===y&&delete h[a]},Jt={isValidating:!0};f(g().data)&&(Jt.isLoading=!0);try{if(b&&(L(Jt),n.loadingTimeout&&f(g().data)&&setTimeout(()=>{J&&j()&&d().onLoadingSlow(a,n)},n.loadingTimeout),h[a]=[w(P),Pt()]),[x,y]=h[a],x=await x,b&&setTimeout(kt,n.dedupingInterval),!h[a]||h[a][1]!==y)return b&&j()&&d().onDiscarded(a),!1;B.error=C;const W=T[a];if(!f(W)&&(y<=W[0]||y<=W[1]||W[1]===0))return Ht(),b&&j()&&d().onDiscarded(a),!1;const G=g().data;B.data=u(G,x)?G:x,b&&j()&&d().onSuccess(x,a,n)}catch(W){kt();const G=d(),{shouldRetryOnError:St}=G;G.isPaused()||(B.error=W,b&&j()&&(G.onError(W,a,G),(St===!0||z(St)&&St(W))&&(!d().revalidateOnFocus||!d().revalidateOnReconnect||F())&&G.onErrorRetry(W,a,G,de=>{const gt=o[a];gt&&gt[0]&&gt[0](ct.ERROR_REVALIDATE_EVENT,de)},{retryCount:(rt.retryCount||0)+1,dedupe:!0})))}return J=!1,Ht(),!0},[a,r]),zt=S.useCallback((...v)=>oe(r,m.current,...v),[]);if(pt(()=>{p.current=e,A.current=n,f(X)||(it.current=X)}),pt(()=>{if(!a)return;const v=at.bind(C,Ct);let w=0;const y=ke(a,o,(J,rt={})=>{if(J==ct.FOCUS_EVENT){const b=Date.now();d().revalidateOnFocus&&b>w&&F()&&(w=b+d().focusThrottleInterval,v())}else if(J==ct.RECONNECT_EVENT)d().revalidateOnReconnect&&F()&&v();else{if(J==ct.MUTATE_EVENT)return at();if(J==ct.ERROR_REVALIDATE_EVENT)return at(rt)}});return $.current=!1,m.current=a,U.current=!0,L({_k:P}),ft&&(f(V)||ut?v():be(v)),()=>{$.current=!0,y()}},[a]),pt(()=>{let v;function w(){const y=z(O)?O(g().data):O;y&&v!==-1&&(v=setTimeout(x,y))}function x(){!g().error&&(_||d().isVisible())&&(c||d().isOnline())?at(Ct).then(w):w()}return w(),()=>{v&&(clearTimeout(v),v=-1)}},[O,_,c,a]),S.useDebugValue(ot),s&&f(V)&&a){if(!Xt&&ut)throw new Error("Fallback data is required when using Suspense in SSR.");p.current=e,A.current=n,$.current=!1;const v=H[a];if(!f(v)){const w=zt(v);yt(w)}if(f(st)){const w=at(Ct);f(ot)||(w.status="fulfilled",w.value=!0),yt(w)}else throw st}return{mutate:zt,get data(){return N.data=!0,ot},get error(){return N.error=!0,st},get isValidating(){return N.isValidating=!0,le},get isLoading(){return N.isLoading=!0,fe}}},Be=He(Ke),Ge=()=>{},Ye=Ge(),Ft=Object,te=t=>t===Ye,Xe=t=>typeof t=="function",ht=new WeakMap,Dt=(t,e)=>Ft.prototype.toString.call(t)===`[object ${e}]`;let Qe=0;const $t=t=>{const e=typeof t,n=Dt(t,"Date"),r=Dt(t,"RegExp"),u=Dt(t,"Object");let s,i;if(Ft(t)===t&&!n&&!r){if(s=ht.get(t),s)return s;if(s=++Qe+"~",ht.set(t,s),Array.isArray(t)){for(s="@",i=0;i<t.length;i++)s+=$t(t[i])+",";ht.set(t,s)}if(u){s="#";const R=Ft.keys(t).sort();for(;!te(i=R.pop());)te(t[i])||(s+=i+":"+$t(t[i])+",");ht.set(t,s)}}else s=n?t.toJSON():e=="symbol"?t.toString():e=="string"?JSON.stringify(t):""+t;return s},Ze=t=>{if(Xe(t))try{t=t()}catch{t=""}const e=t;return t=typeof t=="string"?t:(Array.isArray(t)?t.length:t)?$t(t):"",[t,e]},tn=t=>Ze(t?t(0,null):null)[0],bt=Promise.resolve(),en=t=>(e,n,r)=>{const u=S.useRef(!1),{cache:s,initialSize:i=1,revalidateAll:R=!1,persistSize:l=!1,revalidateFirstPage:O=!0,revalidateOnMount:_=!1,parallel:c=!1}=r,[,,,E]=K.get(Ut);let o;try{o=tn(e),o&&(o=ae+o)}catch{}const[T,h,H]=Q(s,o),a=S.useCallback(()=>f(T()._l)?i:T()._l,[s,o,i]);ee.useSyncExternalStore(S.useCallback(d=>o?H(o,()=>{d()}):()=>{},[s,o]),a,a);const P=S.useCallback(()=>{const d=T()._l;return f(d)?i:d},[o,i]),U=S.useRef(P());pt(()=>{if(!u.current){u.current=!0;return}o&&h({_l:l?U.current:P()})},[o,s]);const $=_&&!u.current,m=t(o,async d=>{const F=T()._i,g=T()._r;h({_r:C});const L=[],q=P(),[I]=Q(s,d),N=I().data,k=[];let et=null;for(let D=0;D<q;++D){const[M,nt]=lt(e(D,c?null:et));if(!M)break;const[mt,X]=Q(s,M);let V=mt().data;const st=R||F||f(V)||O&&!D&&!f(N)||$||N&&!f(N[D])&&!r.compare(N[D],V);if(n&&(typeof g=="function"?g(V,nt):st)){const it=async()=>{if(!(M in E))V=await n(nt);else{const ft=E[M];delete E[M],V=await ft}X({data:V,_k:nt}),L[D]=V};c?k.push(it):await it()}else L[D]=V;c||(et=V)}return c&&await Promise.all(k.map(D=>D())),h({_i:C}),L},r),p=S.useCallback(function(d,F){const g=typeof F=="boolean"?{revalidate:F}:F||{},L=g.revalidate!==!1;return o?(L&&(f(d)?h({_i:!0,_r:g.revalidate}):h({_i:!1,_r:g.revalidate})),arguments.length?m.mutate(d,{...g,revalidate:L}):m.mutate()):bt},[o,s]),A=S.useCallback(d=>{if(!o)return bt;const[,F]=Q(s,o);let g;if(z(d)?g=d(P()):typeof d=="number"&&(g=d),typeof g!="number")return bt;F({_l:g}),U.current=g;const L=[],[q]=Q(s,o);let I=null;for(let N=0;N<g;++N){const[k]=lt(e(N,I)),[et]=Q(s,k),D=k?et().data:C;if(f(D))return p(q().data);L.push(D),I=D}return p(L)},[o,s,p,P]);return{size:P(),setSize:A,mutate:p,get data(){return m.data},get error(){return m.error},get isValidating(){return m.isValidating},get isLoading(){return m.isLoading}}},nn=Je(Be,en),sn=t=>(e,n)=>n&&!n.after?null:e===0?`${t}${t.includes("?")?"&":"?"}limit=25`:`${t}${t.includes("?")?"&":"?"}after=${n==null?void 0:n.after}&limit=25`;function ln(){var U,$,m;const t=he(),{mode:e,val:n}=t,{isIntersecting:r,ref:u}=pe({threshold:.9});S.useEffect(()=>{function p(A){A.state&&t.setVal(A.state.val)}return window.addEventListener("popstate",p),()=>{window.removeEventListener("popstate",p)}},[t]);const s=S.useRef(!1),i=(U=Re.get(e))==null?void 0:U.url,R=`https://www.reddit.com/${n.startsWith("/")?n.slice(1):n}${i??""}`,{data:l,size:O,setSize:_,error:c,isValidating:E,isLoading:o}=nn(sn(R),async p=>{const A=await fetch(p);if(!A.ok)throw new Error(`HTTP ${A.status} fetching ${p} ${await A.text()}`);return(await A.json()).data}),T=l==null?void 0:l.flatMap(p=>p.children).map(p=>p.data),h=o||O>0&&(l==null?void 0:l[O-1])===void 0,a=((($=l==null?void 0:l[0])==null?void 0:$.children.length)??0)===0||(((m=l==null?void 0:l.at(-1))==null?void 0:m.children.length)??0)<25,P=E&&l&&l.length===O;return S.useEffect(()=>{r&&!s.current&&!o&&!P&&!a&&(s.current=!0,setTimeout(()=>{_(O+1).then(()=>{s.current=!1}).catch(p=>{console.error(p)})},400))},[r,_,O,a,P,o]),Y.jsx("div",{children:o?Y.jsx("div",{className:"flex justify-center",children:Y.jsx(Kt,{})}):c?Y.jsx(me,{error:c}):T?Y.jsxs(Y.Fragment,{children:[Y.jsx(Se,{posts:T}),Y.jsx("div",{ref:u,style:{height:400},className:"flex justify-center mt-10",children:h?Y.jsx(Kt,{}):a?"End of feed!":"Scroll all the way down to load more..."})]}):null})}export{ln as default};
//# sourceMappingURL=RedditPostFeed-agTzSdJ5.js.map