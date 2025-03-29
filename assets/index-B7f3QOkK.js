(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&f(i)}).observe(document,{childList:!0,subtree:!0});function u(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function f(e){if(e.ep)return;e.ep=!0;const n=u(e);fetch(e.href,n)}})();const Q=["pill-slider--explore","pill-slider--enjoy","pill-slider--study","pill-slider--love","pill-slider--believe","pill-slider--play"],K=["explore","enjoy","study","love","believe","play"];document.addEventListener("DOMContentLoaded",function(){const l=document.getElementById("sliderTrack"),o=6,u=7;let f="";for(let n=0;n<u;n++)for(let i=0;i<=o-1;i++)f+=`<div class="pill-slider ${Q[i]}">
                <span class="rotated-text">${K[i]}</span>
            </div>`;l.innerHTML=f;function e(){const n=window.innerWidth;let i=o;n>=1200?i=o*2:n>=768?i=o:i=Math.floor(o/2),l.style.setProperty("--blocks-to-scroll",i)}e(),window.addEventListener("resize",e)});const V=document.querySelector(".infinite-scroll-text");V.innerHTML+=V.innerHTML;let _=0,j=0;document.addEventListener("mousemove",l=>{_=l.clientX,j=l.clientY});function J(){const l=document.querySelectorAll(".eye"),o=document.querySelectorAll(".pupil");l.forEach((u,f)=>{const e=u.getBoundingClientRect(),n=e.left+e.width/2,i=e.top+e.height/2,d=Math.atan2(j-i,_-n),h=e.width/4,p=Math.sqrt(Math.pow(_-n,2)+Math.pow(j-i,2))/10,P=Math.min(h,p),r=Math.cos(d)*P,c=Math.sin(d)*P;o[f].style.transform=`translate(calc(-50% + ${r}px), calc(-50% + ${c}px))`}),requestAnimationFrame(J)}J();document.addEventListener("DOMContentLoaded",function(){const l=document.getElementById("resultPill"),o=document.getElementById("resetBtn"),u=document.querySelectorAll(".pill-part");let f="#E85050",e="#FF8C42";p(),u.forEach(r=>{r.addEventListener("dragstart",n),r.addEventListener("dragend",i),r.setAttribute("draggable","true")}),l.addEventListener("dragover",d),l.addEventListener("drop",h),o.addEventListener("click",P);function n(r){this.classList.add("dragging");const c=this.cloneNode(!0);c.style.position="absolute",c.style.left="-9999px",document.body.appendChild(c),r.dataTransfer.setDragImage(c,50,30),setTimeout(()=>document.body.removeChild(c),0),r.dataTransfer.setData("text/plain",JSON.stringify({color:this.dataset.color,type:this.classList.contains("top-part")?"top":"bottom"}))}function i(){this.classList.remove("dragging")}function d(r){r.preventDefault(),r.dataTransfer.dropEffect="copy"}function h(r){r.preventDefault();const c=JSON.parse(r.dataTransfer.getData("text/plain"));c.type==="top"?f=c.color:e=c.color,p()}function p(){l.style.background=`linear-gradient(to bottom, ${f} 50%, ${e} 50%)`}function P(){f="#E85050",e="#FF8C42",p()}});document.addEventListener("DOMContentLoaded",function(){const l=document.querySelector(".four-screen"),o=l.offsetWidth,u=l.offsetHeight,f=Matter.Engine,e=Matter.Render,n=Matter.Runner,i=Matter.Bodies,d=Matter.Body,h=Matter.Composite,p=Matter.Mouse,P=Matter.MouseConstraint,r=Matter.Sleeping,c=Matter.Bounds,R=Matter.Query,y=f.create({gravity:{x:0,y:.5},enableSleeping:!0}),C=e.create({element:document.getElementById("canvas-container"),engine:y,options:{width:o,height:u,wireframes:!1,background:"linear-gradient(0deg, #EBD2B4 81.04%, #DF9DC9 100%)",showSleeping:!0}});e.run(C);const z=n.create();n.run(z,y);const F=50,k={isStatic:!0,restitution:.2,render:{visible:!1},collisionFilter:{group:-1}},A=i.rectangle(o/2,u+F/2,o*3,F,k),N=i.rectangle(-50/2,u/2,F,u*3,k),H=i.rectangle(o+F/2,u/2,F,u*3,k),m=i.rectangle(o/2,-50/2,o*3,F,k);h.add(y.world,[A,N,H,m]);function v(t,s,x,M,g,a,T=!1){const $=i.rectangle(t,s,x,M,{chamfer:{radius:M/2},angle:a,isStatic:T,restitution:.3,friction:.1,frictionAir:.01,density:.001,render:{fillStyle:g,strokeStyle:"#000",lineWidth:1,sprite:{texture:"",xScale:1,yScale:1}},collisionFilter:{group:0,category:1,mask:4294967295}}),G=document.querySelector(`[data-id="matter-${$.id}"]`);return G&&G.classList.add("pill-blur"),T||d.set($,{velocityThreshold:10,speedLimit:15,angularVelocity:.1,frictionStatic:.5}),$}const w=["#78C850","#FFD700","#5691F0","#E85050","#BC13FE","#FF8C42","#78C850","#FFD700","#5691F0","#E85050","#BC13FE","#FF8C42"],L=210,Y=85,B=-Math.PI/3;let O=[];function q(){O.forEach(x=>{h.remove(y.world,x)}),O=[];let t;window.innerWidth>=1200?t=9:window.innerWidth>=768?t=4:t=2;const s=u-160;for(let x=0;x<t+1;x++){const M=100+x*(o-200)/t,g=x%w.length,a=v(M,s,L,Y,w[g],B,!0);a.initialPosition={x:M,y:s,angle:B},h.add(y.world,a),O.push(a)}}q();const E=p.create(C.canvas),D=P.create(y,{mouse:E,constraint:{stiffness:.2,render:{visible:!1}}});E.element.removeEventListener("mousewheel",E.mousewheel),E.element.removeEventListener("DOMMouseScroll",E.mousewheel);let b=!1,S=null;D.mouse.element.addEventListener("mousedown",function(t){if(t.button!==0)return;const s=E.position,x=h.allBodies(y.world);for(let M=0;M<x.length;M++){const g=x[M];if(g.isStatic&&g.initialPosition&&c.contains(g.bounds,s)&&R.point([g],s).length>0){b=!0,S=g;const T=document.querySelector(`[data-id="matter-${g.id}"]`);T&&(T.classList.remove("pill-blur"),T.classList.add("pill-no-blur")),d.set(g,{isStatic:!1}),r.set(g,!1);break}}}),D.mouse.element.addEventListener("mousemove",function(){b&&(document.body.style.overflow="hidden")}),D.mouse.element.addEventListener("mouseup",function(){if(b&&S){const t=document.querySelector(`[data-id="matter-${S.id}"]`);t&&(t.classList.remove("pill-no-blur"),t.classList.add("pill-blur"))}b=!1,S=null,document.body.style.overflow=""}),h.add(y.world,D),C.mouse=E,document.addEventListener("contextmenu",function(t){t.preventDefault();const s=l.getBoundingClientRect();if(t.clientX<s.left||t.clientX>s.right||t.clientY<s.top||t.clientY>s.bottom)return;const x={x:t.clientX-s.left,y:t.clientY-s.top},M=h.allBodies(y.world);for(let g=0;g<M.length;g++){const a=M[g];if(!a.isStatic&&a.initialPosition&&c.contains(a.bounds,x)&&R.point([a],x).length>0){const $=document.querySelector(`[data-id="matter-${a.id}"]`);$&&($.classList.remove("pill-no-blur"),$.classList.add("pill-blur")),d.setPosition(a,a.initialPosition),d.setAngle(a,a.initialPosition.angle),d.setVelocity(a,{x:0,y:0}),d.setAngularVelocity(a,0),d.set(a,{isStatic:!0}),r.set(a,!0);break}}}),window.addEventListener("resize",function(){const t=l.offsetWidth,s=l.offsetHeight;C.options.width=t,C.options.height=s,e.setPixelRatio(C,window.devicePixelRatio),d.setPosition(A,{x:t/2,y:s+F/2}),d.setPosition(N,{x:-50/2,y:s/2}),d.setPosition(H,{x:t+F/2,y:s/2}),d.setPosition(m,{x:t/2,y:-50/2}),q()}),l.addEventListener("mouseleave",function(){if(b&&S){const t=document.querySelector(`[data-id="matter-${S.id}"]`);t&&(t.classList.remove("pill-no-blur"),t.classList.add("pill-blur"))}b=!1,S=null,document.body.style.overflow=""}),setInterval(()=>{O.forEach(t=>{const s=document.querySelector(`[data-id="matter-${t.id}"]`);s&&!s.classList.contains("pill-blur")&&t.isStatic&&s.classList.add("pill-blur")})},100)});const X=document.querySelector("#matter-canvas");let W=740,I=684;const U=[8,10],Z=["15 -3","30 -5"];window.addEventListener("DOMContentLoaded",()=>{const{Engine:l,Render:o,Runner:u,Bodies:f,Composite:e,Mouse:n,MouseConstraint:i,Events:d,Body:h}=Matter;let p,P,r,c,R,y=[],C;function z(){p=l.create({constraintIterations:10,positionIterations:10}),X.width=W,X.height=I,P=o.create({canvas:X,engine:p,options:{width:W,height:I,wireframes:!1,background:"transparent",pixelRatio:1}}),c=n.create(X),R=i.create(p,{mouse:c,constraint:{stiffness:.1,render:{visible:!1}}}),r=u.create(),o.run(P),u.run(r,p),c.element.removeEventListener("mousewheel",c.mousewheel),c.element.removeEventListener("DOMMouseScroll",c.mousewheel),e.add(p.world,R)}function F(){const w=ee(6,7),L=f.circle(340,286,w,{friction:0,density:1,frictionAir:0,restitution:.7,render:{fillStyle:"#FF8C42"}});h.applyForce(L,L.position,{x:1,y:0}),e.add(p.world,L),y.push(L)}function k(){const m=document.querySelector(".lower_part_pill");if(!m){console.error("Элемент .lower_part_pill не найден!");return}this.cx=W*.5,this.cy=I*.7;const v=100,w=208,L=v/2,Y=w/2;console.log(),m.style.left=`${this.cx-L}px`,m.style.top=`${this.cy-Y}px`,m.style.transformOrigin="center center";const B=25,O="rgba(0,0,0,0)",q=f.rectangle(this.cx-L+B/2,this.cy,B,w*1.4,{isStatic:!0,angle:Math.PI/180*-30,chamfer:{radius:10},render:{fillStyle:O,visible:!1}}),E=f.rectangle(this.cx+L+12-B/2,this.cy-60,B,w*1,{isStatic:!0,angle:Math.PI/180*-30,render:{fillStyle:O,visible:!1}}),D=f.rectangle(this.cx+L+B,this.cy+Y-B-25,v*1.5,B*1.5,{isStatic:!0,angle:Math.PI/180*-30,render:{fillStyle:O,visible:!1}});e.add(p.world,[q,E,D]),this.setPosition=b=>{const S=b.x-this.cx,t=b.y-this.cy;h.setPosition(q,{x:q.position.x+S,y:q.position.y+t}),h.setPosition(E,{x:E.position.x+S,y:E.position.y+t}),h.setPosition(D,{x:D.position.x+S,y:D.position.y+t}),m.style.left=`${b.x-L+10}px`,m.style.top=`${b.y-Y-19}px`;const s=S*.03;m.style.transform=`rotate(${s}deg)`,this.cx=b.x,this.cy=b.y},this.setPosition({x:this.cx,y:this.cy})}z(),H(),C=new k,d.on(R,"mousemove",m=>{C.setPosition({x:m.mouse.position.x-70,y:m.mouse.position.y})});let A=0;const N=1;d.on(r,"tick",m=>{A++,A%N===0&&F();for(let v=y.length-1;v>=0;v--)y[v].position.y-y[v].circleRadius>I&&(e.remove(p.world,y[v]),y.splice(v,1))});function H(){const m=document.querySelector("#gooey feGaussianBlur"),v=document.querySelector("#gooey feColorMatrix");let w;W<600?w=0:w=1,m.setAttribute("stdDeviation",U[w]),v.setAttribute("values",`1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ${Z[w]}`)}window.addEventListener("resize",()=>{W=innerWidth,I=innerHeight,P.canvas.width=W,P.canvas.height=I,H(),C.setPosition({x:W*.5,y:I*.8})})});function ee(l,o){return Math.random()*(o-l)+l}
