import{r as re,R as It,a as g,u as oe,b as ie,m as ae,j as Y}from"./index-CM_eYLlH.js";import{L as jt,E as ce,C as ue}from"./LoadingSpinner-CLqNwCe-.js";import"./Link-B5AhCoXq.js";import"./formatDistanceToNowStrict-DGPDrA_T.js";import"./en-US-Ckk-QizZ.js";var vt={exports:{}},_t={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ut;function le(){if(Ut)return _t;Ut=1;var t=re();function e(u,h){return u===h&&(u!==0||1/u===1/h)||u!==u&&h!==h}var n=typeof Object.is=="function"?Object.is:e,a=t.useState,o=t.useEffect,s=t.useLayoutEffect,d=t.useDebugValue;function m(u,h){var r=h(),T=a({inst:{value:r,getSnapshot:h}}),E=T[0].inst,k=T[1];return s(function(){E.value=r,E.getSnapshot=h,c(E)&&k({inst:E})},[u,r,h]),o(function(){return c(E)&&k({inst:E}),u(function(){c(E)&&k({inst:E})})},[u]),d(r),r}function c(u){var h=u.getSnapshot;u=u.value;try{var r=h();return!n(u,r)}catch{return!0}}function C(u,h){return h()}var w=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?C:m;return _t.useSyncExternalStore=t.useSyncExternalStore!==void 0?t.useSyncExternalStore:w,_t}var zt;function fe(){return zt||(zt=1,vt.exports=le()),vt.exports}var Bt=fe();const Q=()=>{},D=Q(),wt=Object,l=t=>t===D,$=t=>typeof t=="function",Z=(t,e)=>({...t,...e}),de=t=>$(t.then),ht=new WeakMap;let he=0;const lt=t=>{const e=typeof t,n=t&&t.constructor,a=n==Date;let o,s;if(wt(t)===t&&!a&&n!=RegExp){if(o=ht.get(t),o)return o;if(o=++he+"~",ht.set(t,o),n==Array){for(o="@",s=0;s<t.length;s++)o+=lt(t[s])+",";ht.set(t,o)}if(n==wt){o="#";const d=wt.keys(t).sort();for(;!l(s=d.pop());)l(t[s])||(o+=s+":"+lt(t[s])+",");ht.set(t,o)}}else o=a?t.toJSON():e=="symbol"?t.toString():e=="string"?JSON.stringify(t):""+t;return o},K=new WeakMap,Tt={},Et={},xt="undefined",pt=typeof window!=xt,bt=typeof document!=xt,Ee=()=>pt&&typeof window.requestAnimationFrame!=xt,X=(t,e)=>{const n=K.get(t);return[()=>!l(e)&&t.get(e)||Tt,a=>{if(!l(e)){const o=t.get(e);e in Et||(Et[e]=o),n[5](e,Z(o,a),o||Tt)}},n[6],()=>!l(e)&&e in Et?Et[e]:!l(e)&&t.get(e)||Tt]};let Dt=!0;const Re=()=>Dt,[At,Lt]=pt&&window.addEventListener?[window.addEventListener.bind(window),window.removeEventListener.bind(window)]:[Q,Q],pe=()=>{const t=bt&&document.visibilityState;return l(t)||t!=="hidden"},ge=t=>(bt&&document.addEventListener("visibilitychange",t),At("focus",t),()=>{bt&&document.removeEventListener("visibilitychange",t),Lt("focus",t)}),me=t=>{const e=()=>{Dt=!0,t()},n=()=>{Dt=!1};return At("online",e),At("offline",n),()=>{Lt("online",e),Lt("offline",n)}},Se={isOnline:Re,isVisible:pe},ve={initFocus:ge,initReconnect:me},$t=!It.useId,ft=!pt||"Deno"in window,_e=t=>Ee()?window.requestAnimationFrame(t):setTimeout(t,1),Rt=ft?g.useEffect:g.useLayoutEffect,Ct=typeof navigator<"u"&&navigator.connection,kt=!ft&&Ct&&(["slow-2g","2g"].includes(Ct.effectiveType)||Ct.saveData),ot=t=>{if($(t))try{t=t()}catch{t=""}const e=t;return t=typeof t=="string"?t:(Array.isArray(t)?t.length:t)?lt(t):"",[t,e]};let we=0;const Vt=()=>++we,Jt=0,Yt=1,Gt=2,Te=3;var ut={__proto__:null,ERROR_REVALIDATE_EVENT:Te,FOCUS_EVENT:Jt,MUTATE_EVENT:Gt,RECONNECT_EVENT:Yt};async function Xt(...t){const[e,n,a,o]=t,s=Z({populateCache:!0,throwOnError:!0},typeof o=="boolean"?{revalidate:o}:o||{});let d=s.populateCache;const m=s.rollbackOnError;let c=s.optimisticData;const C=h=>typeof m=="function"?m(h):m!==!1,w=s.throwOnError;if($(n)){const h=n,r=[],T=e.keys();for(const E of T)!/^\$(inf|sub)\$/.test(E)&&h(e.get(E)._k)&&r.push(E);return Promise.all(r.map(u))}return u(n);async function u(h){const[r]=ot(h);if(!r)return;const[T,E]=X(e,r),[k,i,P,U]=K.get(e),W=()=>{const V=k[r];return($(s.revalidate)?s.revalidate(T().data,h):s.revalidate!==!1)&&(delete P[r],delete U[r],V&&V[0])?V[0](Gt).then(()=>T().data):T().data};if(t.length<3)return W();let p=a,R;const A=Vt();i[r]=[A,0];const f=!l(c),M=T(),S=M.data,L=M._c,z=l(L)?S:L;if(f&&(c=$(c)?c(z,S):c,E({data:c,_c:z})),$(p))try{p=p(z)}catch(V){R=V}if(p&&de(p))if(p=await p.catch(V=>{R=V}),A!==i[r][0]){if(R)throw R;return p}else R&&f&&C(R)&&(d=!0,E({data:z,_c:D}));if(d&&!R)if($(d)){const V=d(p,z);E({data:V,error:D,_c:D})}else E({data:p,error:D,_c:D});if(i[r][1]=Vt(),Promise.resolve(W()).then(()=>{E({_c:D})}),R){if(w)throw R;return}return p}}const Ht=(t,e)=>{for(const n in t)t[n][0]&&t[n][0](e)},Ce=(t,e)=>{if(!K.has(t)){const n=Z(ve,e),a={},o=Xt.bind(D,t);let s=Q;const d={},m=(w,u)=>{const h=d[w]||[];return d[w]=h,h.push(u),()=>h.splice(h.indexOf(u),1)},c=(w,u,h)=>{t.set(w,u);const r=d[w];if(r)for(const T of r)T(u,h)},C=()=>{if(!K.has(t)&&(K.set(t,[a,{},{},{},o,c,m]),!ft)){const w=n.initFocus(setTimeout.bind(D,Ht.bind(D,a,Jt))),u=n.initReconnect(setTimeout.bind(D,Ht.bind(D,a,Yt)));s=()=>{w&&w(),u&&u(),K.delete(t)}}};return C(),[t,o,C,s]}return[t,K.get(t)[4]]},Oe=(t,e,n,a,o)=>{const s=n.errorRetryCount,d=o.retryCount,m=~~((Math.random()+.5)*(1<<(d<8?d:8)))*n.errorRetryInterval;!l(s)&&d>s||setTimeout(a,m,o)},ye=(t,e)=>lt(t)==lt(e),[Nt,be]=Ce(new Map),De=Z({onLoadingSlow:Q,onSuccess:Q,onError:Q,onErrorRetry:Oe,onDiscarded:Q,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:kt?1e4:5e3,focusThrottleInterval:5*1e3,dedupingInterval:2*1e3,loadingTimeout:kt?5e3:3e3,compare:ye,isPaused:()=>!1,cache:Nt,mutate:be,fallback:{}},Se),Ae=(t,e)=>{const n=Z(t,e);if(e){const{use:a,fallback:o}=t,{use:s,fallback:d}=e;a&&s&&(n.use=a.concat(s)),o&&d&&(n.fallback=Z(o,d))}return n},Le=g.createContext({}),Qt="$inf$",Zt=pt&&window.__SWR_DEVTOOLS_USE__,Ve=Zt?window.__SWR_DEVTOOLS_USE__:[],Ie=()=>{Zt&&(window.__SWR_DEVTOOLS_REACT__=It)},te=t=>$(t[1])?[t[0],t[1],t[2]||{}]:[t[0],null,(t[1]===null?t[2]:t[1])||{}],xe=()=>Z(De,g.useContext(Le)),Ne=t=>(e,n,a)=>t(e,n&&((...s)=>{const[d]=ot(e),[,,,m]=K.get(Nt);if(d.startsWith(Qt))return n(...s);const c=m[d];return l(c)?n(...s):(delete m[d],c)}),a),Fe=Ve.concat(Ne),Pe=t=>function(...n){const a=xe(),[o,s,d]=te(n),m=Ae(a,d);let c=t;const{use:C}=m,w=(C||[]).concat(Fe);for(let u=w.length;u--;)c=w[u](c);return c(o,s||m.fetcher||null,m)},Me=(t,e,n)=>{const a=e[t]||(e[t]=[]);return a.push(n),()=>{const o=a.indexOf(n);o>=0&&(a[o]=a[a.length-1],a.pop())}},We=(t,e)=>(...n)=>{const[a,o,s]=te(n),d=(s.use||[]).concat(e);return t(a,o,{...s,use:d})};Ie();const Kt=It.use||(t=>{if(t.status==="pending")throw t;if(t.status==="fulfilled")return t.value;throw t.status==="rejected"?t.reason:(t.status="pending",t.then(e=>{t.status="fulfilled",t.value=e},e=>{t.status="rejected",t.reason=e}),t)}),Ot={dedupe:!0},qe=(t,e,n)=>{const{cache:a,compare:o,suspense:s,fallbackData:d,revalidateOnMount:m,revalidateIfStale:c,refreshInterval:C,refreshWhenHidden:w,refreshWhenOffline:u,keepPreviousData:h}=n,[r,T,E,k]=K.get(a),[i,P]=ot(t),U=g.useRef(!1),W=g.useRef(!1),p=g.useRef(i),R=g.useRef(e),A=g.useRef(n),f=()=>A.current,M=()=>f().isVisible()&&f().isOnline(),[S,L,z,V]=X(a,i),N=g.useRef({}).current,tt=l(d)?n.fallback[i]:d,et=(v,_)=>{for(const x in N){const O=x;if(O==="data"){if(!o(v[O],_[O])&&(!l(v[O])||!o(at,_[O])))return!1}else if(_[O]!==v[O])return!1}return!0},y=g.useMemo(()=>{const v=!i||!e?!1:l(m)?f().isPaused()||s?!1:l(c)?!0:c:m,_=F=>{const B=Z(F);return delete B._k,v?{isValidating:!0,isLoading:!0,...B}:B},x=S(),O=V(),H=_(x),rt=x===O?H:_(O);let b=H;return[()=>{const F=_(S());return et(F,b)?(b.data=F.data,b.isLoading=F.isLoading,b.isValidating=F.isValidating,b.error=F.error,b):(b=F,F)},()=>rt]},[a,i]),q=Bt.useSyncExternalStore(g.useCallback(v=>z(i,(_,x)=>{et(x,_)||v()}),[a,i]),y[0],y[1]),nt=!U.current,gt=r[i]&&r[i].length>0,G=q.data,I=l(G)?tt:G,st=q.error,it=g.useRef(I),at=h?l(G)?it.current:G:I,dt=gt&&!l(st)?!1:nt&&!l(m)?m:f().isPaused()?!1:s?l(I)?!1:c:l(I)||c,Ft=!!(i&&e&&nt&&dt),ee=l(q.isValidating)?Ft:q.isValidating,ne=l(q.isLoading)?Ft:q.isLoading,ct=g.useCallback(async v=>{const _=R.current;if(!i||!_||W.current||f().isPaused())return!1;let x,O,H=!0;const rt=v||{},b=!E[i]||!rt.dedupe,F=()=>$t?!W.current&&i===p.current&&U.current:i===p.current,B={isValidating:!1,isLoading:!1},Mt=()=>{L(B)},Wt=()=>{const j=E[i];j&&j[1]===O&&delete E[i]},qt={isValidating:!0};l(S().data)&&(qt.isLoading=!0);try{if(b&&(L(qt),n.loadingTimeout&&l(S().data)&&setTimeout(()=>{H&&F()&&f().onLoadingSlow(i,n)},n.loadingTimeout),E[i]=[_(P),Vt()]),[x,O]=E[i],x=await x,b&&setTimeout(Wt,n.dedupingInterval),!E[i]||E[i][1]!==O)return b&&F()&&f().onDiscarded(i),!1;B.error=D;const j=T[i];if(!l(j)&&(O<=j[0]||O<=j[1]||j[1]===0))return Mt(),b&&F()&&f().onDiscarded(i),!1;const J=S().data;B.data=o(J,x)?J:x,b&&F()&&f().onSuccess(x,i,n)}catch(j){Wt();const J=f(),{shouldRetryOnError:mt}=J;J.isPaused()||(B.error=j,b&&F()&&(J.onError(j,i,J),(mt===!0||$(mt)&&mt(j))&&(!f().revalidateOnFocus||!f().revalidateOnReconnect||M())&&J.onErrorRetry(j,i,J,se=>{const St=r[i];St&&St[0]&&St[0](ut.ERROR_REVALIDATE_EVENT,se)},{retryCount:(rt.retryCount||0)+1,dedupe:!0})))}return H=!1,Mt(),!0},[i,a]),Pt=g.useCallback((...v)=>Xt(a,p.current,...v),[]);if(Rt(()=>{R.current=e,A.current=n,l(G)||(it.current=G)}),Rt(()=>{if(!i)return;const v=ct.bind(D,Ot);let _=0;const O=Me(i,r,(H,rt={})=>{if(H==ut.FOCUS_EVENT){const b=Date.now();f().revalidateOnFocus&&b>_&&M()&&(_=b+f().focusThrottleInterval,v())}else if(H==ut.RECONNECT_EVENT)f().revalidateOnReconnect&&M()&&v();else{if(H==ut.MUTATE_EVENT)return ct();if(H==ut.ERROR_REVALIDATE_EVENT)return ct(rt)}});return W.current=!1,p.current=i,U.current=!0,L({_k:P}),dt&&(l(I)||ft?v():_e(v)),()=>{W.current=!0,O()}},[i]),Rt(()=>{let v;function _(){const O=$(C)?C(S().data):C;O&&v!==-1&&(v=setTimeout(x,O))}function x(){!S().error&&(w||f().isVisible())&&(u||f().isOnline())?ct(Ot).then(_):_()}return _(),()=>{v&&(clearTimeout(v),v=-1)}},[C,w,u,i]),g.useDebugValue(at),s&&l(I)&&i){if(!$t&&ft)throw new Error("Fallback data is required when using suspense in SSR.");R.current=e,A.current=n,W.current=!1;const v=k[i];if(!l(v)){const _=Pt(v);Kt(_)}if(l(st)){const _=ct(Ot);l(at)||(_.status="fulfilled",_.value=!0),Kt(_)}else throw st}return{mutate:Pt,get data(){return N.data=!0,at},get error(){return N.error=!0,st},get isValidating(){return N.isValidating=!0,ee},get isLoading(){return N.isLoading=!0,ne}}},je=Pe(qe),Ue=t=>ot(t?t(0,null):null)[0],yt=Promise.resolve(),ze=t=>(e,n,a)=>{const o=g.useRef(!1),{cache:s,initialSize:d=1,revalidateAll:m=!1,persistSize:c=!1,revalidateFirstPage:C=!0,revalidateOnMount:w=!1,parallel:u=!1}=a,[,,,h]=K.get(Nt);let r;try{r=Ue(e),r&&(r=Qt+r)}catch{}const[T,E,k]=X(s,r),i=g.useCallback(()=>l(T()._l)?d:T()._l,[s,r,d]);Bt.useSyncExternalStore(g.useCallback(f=>r?k(r,()=>{f()}):()=>{},[s,r]),i,i);const P=g.useCallback(()=>{const f=T()._l;return l(f)?d:f},[r,d]),U=g.useRef(P());Rt(()=>{if(!o.current){o.current=!0;return}r&&E({_l:c?U.current:P()})},[r,s]);const W=w&&!o.current,p=t(r,async f=>{const M=T()._i,S=T()._r;E({_r:D});const L=[],z=P(),[V]=X(s,f),N=V().data,tt=[];let et=null;for(let y=0;y<z;++y){const[q,nt]=ot(e(y,u?null:et));if(!q)break;const[gt,G]=X(s,q);let I=gt().data;const st=m||M||l(I)||C&&!y&&!l(N)||W||N&&!l(N[y])&&!a.compare(N[y],I);if(n&&(typeof S=="function"?S(I,nt):st)){const it=async()=>{if(!(q in h))I=await n(nt);else{const dt=h[q];delete h[q],I=await dt}G({data:I,_k:nt}),L[y]=I};u?tt.push(it):await it()}else L[y]=I;u||(et=I)}return u&&await Promise.all(tt.map(y=>y())),E({_i:D}),L},a),R=g.useCallback(function(f,M){const S=typeof M=="boolean"?{revalidate:M}:M||{},L=S.revalidate!==!1;return r?(L&&(l(f)?E({_i:!0,_r:S.revalidate}):E({_i:!1,_r:S.revalidate})),arguments.length?p.mutate(f,{...S,revalidate:L}):p.mutate()):yt},[r,s]),A=g.useCallback(f=>{if(!r)return yt;const[,M]=X(s,r);let S;if($(f)?S=f(P()):typeof f=="number"&&(S=f),typeof S!="number")return yt;M({_l:S}),U.current=S;const L=[],[z]=X(s,r);let V=null;for(let N=0;N<S;++N){const[tt]=ot(e(N,V)),[et]=X(s,tt),y=tt?et().data:D;if(l(y))return R(z().data);L.push(y),V=y}return R(L)},[r,s,R,P]);return{size:P(),setSize:A,mutate:R,get data(){return p.data},get error(){return p.error},get isValidating(){return p.isValidating},get isLoading(){return p.isLoading}}},$e=We(je,ze),ke=t=>(e,n)=>n&&!n.after?null:e===0?`${t}${t.includes("?")?"&":"?"}limit=25`:`${t}${t.includes("?")?"&":"?"}after=${n==null?void 0:n.after}&limit=25`;function Ge(){var U,W,p;const t=oe(),{mode:e,val:n}=t,{isIntersecting:a,ref:o}=ie({threshold:.9});g.useEffect(()=>{function R(A){A.state&&t.setVal(A.state.val)}return window.addEventListener("popstate",R),()=>{window.removeEventListener("popstate",R)}},[t]);const s=g.useRef(!1),d=(U=ae.get(e))==null?void 0:U.url,m=`https://www.reddit.com/${n.startsWith("/")?n.slice(1):n}${d??""}`,{data:c,size:C,setSize:w,error:u,isValidating:h,isLoading:r}=$e(ke(m),async R=>{const A=await fetch(R);if(!A.ok)throw new Error(`HTTP ${A.status} fetching ${R} ${await A.text()}`);return(await A.json()).data}),T=c==null?void 0:c.flatMap(R=>R.children).map(R=>R.data),E=r||C>0&&(c==null?void 0:c[C-1])===void 0,i=(((W=c==null?void 0:c[0])==null?void 0:W.children.length)??0)===0||(((p=c==null?void 0:c.at(-1))==null?void 0:p.children.length)??0)<25,P=h&&c&&c.length===C;return g.useEffect(()=>{a&&!s.current&&!r&&!P&&!i&&(s.current=!0,setTimeout(()=>{w(C+1).then(()=>{s.current=!1}).catch(R=>{console.error(R)})},400))},[a,w,C,i,P,r]),Y.jsx("div",{children:r?Y.jsx("div",{className:"flex justify-center",children:Y.jsx(jt,{})}):u?Y.jsx(ce,{error:u}):T?Y.jsxs(Y.Fragment,{children:[Y.jsx(ue,{posts:T}),Y.jsx("div",{ref:o,style:{height:400},className:"flex justify-center mt-10",children:E?Y.jsx(jt,{}):i?"End of feed!":"Scroll all the way down to load more..."})]}):null})}export{Ge as default};
//# sourceMappingURL=RedditPostFeed-BYAX9IPR.js.map