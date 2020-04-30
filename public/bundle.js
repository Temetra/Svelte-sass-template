var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(t,n){t.appendChild(n)}function l(t,n,e){t.insertBefore(n,e||null)}function i(t){t.parentNode.removeChild(t)}function s(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function a(){return f(" ")}function d(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function p(t,n){n=""+n,t.data!==n&&(t.data=n)}let m;function h(t){m=t}function g(){if(!m)throw new Error("Function called outside component initialization");return m}const b=[],y=[],v=[],$=[],k=Promise.resolve();let x=!1;function _(t){v.push(t)}let w=!1;const C=new Set;function W(){if(!w){w=!0;do{for(let t=0;t<b.length;t+=1){const n=b[t];h(n),S(n.$$)}for(b.length=0;y.length;)y.pop()();for(let t=0;t<v.length;t+=1){const n=v[t];C.has(n)||(C.add(n),n())}v.length=0}while(b.length);for(;$.length;)$.pop()();x=!1,w=!1,C.clear()}}function S(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(_)}}const L=new Set;let E;function R(t,n){t&&t.i&&(L.delete(t),t.i(n))}function Z(t,n){const e=n.token={};function r(t,r,c,u){if(n.token!==e)return;n.resolved=u;let l=n.ctx;void 0!==c&&(l=l.slice(),l[c]=u);const i=t&&(n.current=t)(l);let s=!1;n.block&&(n.blocks?n.blocks.forEach((t,e)=>{e!==r&&t&&(E={r:0,c:[],p:E},function(t,n,e,o){if(t&&t.o){if(L.has(t))return;L.add(t),E.c.push(()=>{L.delete(t),o&&(e&&t.d(1),o())}),t.o(n)}}(t,1,1,()=>{n.blocks[e]=null}),E.r||o(E.c),E=E.p)}):n.block.d(1),i.c(),R(i,1),i.m(n.mount(),n.anchor),s=!0),n.block=i,n.blocks&&(n.blocks[r]=i),s&&W()}if((c=t)&&"object"==typeof c&&"function"==typeof c.then){const e=g();if(t.then(t=>{h(e),r(n.then,1,n.value,t),h(null)},t=>{h(e),r(n.catch,2,n.error,t),h(null)}),n.current!==n.pending)return r(n.pending,0),!0}else{if(n.current!==n.then)return r(n.then,1,n.value,t),!0;n.resolved=t}var c}function j(t,n){-1===t.$$.dirty[0]&&(b.push(t),x||(x=!0,k.then(W)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function q(c,u,l,s,f,a,d=[-1]){const p=m;h(c);const g=u.props||{},b=c.$$={fragment:null,ctx:null,props:a,update:t,not_equal:f,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:[]),callbacks:e(),dirty:d};let y=!1;if(b.ctx=l?l(c,g,(t,n,...e)=>{const o=e.length?e[0]:n;return b.ctx&&f(b.ctx[t],b.ctx[t]=o)&&(b.bound[t]&&b.bound[t](o),y&&j(c,t)),n}):[],b.update(),y=!0,o(b.before_update),b.fragment=!!s&&s(b.ctx),u.target){if(u.hydrate){const t=function(t){return Array.from(t.childNodes)}(u.target);b.fragment&&b.fragment.l(t),t.forEach(i)}else b.fragment&&b.fragment.c();u.intro&&R(c.$$.fragment),function(t,e,c){const{fragment:u,on_mount:l,on_destroy:i,after_update:s}=t.$$;u&&u.m(e,c),_(()=>{const e=l.map(n).filter(r);i?i.push(...e):o(e),t.$$.on_mount=[]}),s.forEach(_)}(c,u.target,u.anchor),W()}h(p)}var A="undefined"!=typeof module&&"function"==typeof module.require&&module.require||"function"==typeof __non_webpack_require__&&__non_webpack_require__||"function"==typeof require&&require||null,I=null;if(A)try{I=A("worker_threads").Worker}catch(t){}function O(t,n,e){var o=void 0===n?null:n,r=function(t,n){return Buffer.from(t,"base64").toString(n?"utf16":"utf8")}(t,void 0!==e&&e),c=r.indexOf("\n",10)+1,u=r.substring(c)+(o?"//# sourceMappingURL="+o:"");return function(t){return new I(u,Object.assign({},t,{eval:!0}))}}function Y(t,n,e){var o=void 0===n?null:n,r=function(t,n){var e=atob(t);if(n){for(var o=new Uint8Array(e.length),r=0,c=e.length;r<c;++r)o[r]=e.charCodeAt(r);return String.fromCharCode.apply(null,new Uint16Array(o.buffer))}return e}(t,void 0!==e&&e),c=r.indexOf("\n",10)+1,u=r.substring(c)+(o?"//# sourceMappingURL="+o:""),l=new Blob([u],{type:"application/javascript"}),i=URL.createObjectURL(l);return function(t){return new Worker(i,t)}}var B="[object process]"===Object.prototype.toString.call("undefined"!=typeof process?process:0);var N,U,F,V=(N="Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwphZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwoZnVuY3Rpb24oZSl7Y29uc29sZS5sb2coIldvcmtlciBnb3Q6ICIuY29uY2F0KGUuZGF0YSkpLHBvc3RNZXNzYWdlKCJIZWxsbyBmcm9tIHdvcmtlciIpfSkpOwoK",U=null,F=!1,B?O(N,U,F):Y(N,U,F));function K(n){let e;return{c(){e=s("p"),e.textContent="Waiting for worker response"},m(t,n){l(t,e,n)},p:t,d(t){t&&i(e)}}}function M(t){let n,e,o,r;return{c(){n=s("p"),e=f('Worker responded with "'),o=f(t[0]),r=f('"')},m(t,c){l(t,n,c),u(n,e),u(n,o),u(n,r)},p(t,n){1&n&&p(o,t[0])},d(t){t&&i(n)}}}function z(t){let n,e,o={ctx:t,current:null,token:null,pending:P,then:H,catch:G,value:3};return Z(e=t[1],o),{c(){n=f(""),o.block.c()},m(t,e){l(t,n,e),o.block.m(t,o.anchor=e),o.mount=()=>n.parentNode,o.anchor=n},p(n,r){if(t=n,o.ctx=t,2&r&&e!==(e=t[1])&&Z(e,o));else{const n=t.slice();n[3]=o.resolved,o.block.p(n,r)}},d(t){t&&i(n),o.block.d(t),o.token=null,o=null}}}function G(n){return{c:t,m:t,p:t,d:t}}function H(t){let n,e,o=t[3]+"";return{c(){n=s("p"),e=f(o)},m(t,o){l(t,n,o),u(n,e)},p(t,n){2&n&&o!==(o=t[3]+"")&&p(e,o)},d(t){t&&i(n)}}}function P(n){let e;return{c(){e=s("p"),e.textContent=`Fetching text in ${X} milliseconds`},m(t,n){l(t,e,n)},p:t,d(t){t&&i(e)}}}function T(n){let e,o,r,c,f,p,m,h,g;function b(t,n){return t[0]?M:K}let y=b(n),v=y(n),$=n[1]&&z(n);return{c(){e=s("h1"),e.textContent="Title using Sass mapped colours",o=a(),r=s("section"),c=s("h2"),c.textContent="Web workers",f=a(),v.c(),p=a(),m=s("section"),h=s("h2"),h.textContent="Promises",g=a(),$&&$.c(),d(e,"class","svelte-t0slty"),d(r,"class","svelte-t0slty"),d(m,"class","svelte-t0slty")},m(t,n){l(t,e,n),l(t,o,n),l(t,r,n),u(r,c),u(r,f),v.m(r,null),l(t,p,n),l(t,m,n),u(m,h),u(m,g),$&&$.m(m,null)},p(t,[n]){y===(y=b(t))&&v?v.p(t,n):(v.d(1),v=y(t),v&&(v.c(),v.m(r,null))),t[1]?$?$.p(t,n):($=z(t),$.c(),$.m(m,null)):$&&($.d(1),$=null)},i:t,o:t,d(t){t&&i(e),t&&i(o),t&&i(r),v.d(),t&&i(p),t&&i(m),$&&$.d()}}}const X=2e3;function J(t,n,e){let o,r;const c=new V;var u;return c.addEventListener("message",(function(t){console.log("Client got: "+t.data),e(0,o=t.data)})),u=()=>{c.postMessage("Sending message to worker"),e(1,r=new Promise(t=>setTimeout(()=>t(),X)).then(()=>fetch("./lorem.txt")).then(t=>t.text()))},g().$$.on_mount.push(u),[o,r]}var Q=new class extends class{$destroy(){!function(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}{constructor(t){super(),q(this,t,J,T,c,{})}}({target:document.body});return window.app=Q,Q}();
