import { createWorld } from './world.js?v=20261028-scroll1';
import { bindGestureSurface } from './gesture-input.js?v=20261028-scroll1';
import { journeyState, bindScrollEntrances } from './scroll-motion.js?v=20261028-scroll1';

const body=document.body;
const container=document.querySelector('#living-world');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
const lifetime=new AbortController();
const {signal}=lifetime;
const isHome=body.classList.contains('page-home');
const isVisit=body.classList.contains('page-visit');
let world, paused=false, bloom=false, light=0, preview=null, exploring=false, orbit=0, scrollFrame=0, revealObserver;
let lightOverride=null, bloomOverride=null, resolvedBloom=0;
let points=[], hideAfter=Infinity;
const animations=new Set();
const hotspots=document.createElement('nav');
hotspots.className='world-hotspots';
hotspots.setAttribute('aria-label','Explorar os ambientes');
const destinations=[['jardim','Jardins para viver','descobrir'],['varanda','Varandas com vida','habitar'],['cuidado','Cuidado que continua','cultivar']];
const pins=destinations.map(([id,label,chapter],index)=>{
 const link=document.createElement('a');link.href=isHome?`#${chapter}`:`${id}.html`;link.className='world-pin';link.dataset.scene=String(index+1);link.setAttribute('aria-label',`Explorar ${label}`);link.innerHTML=`<span class="pin-dot" aria-hidden="true">+</span><span>${label}</span>`;link.hidden=true;hotspots.append(link);return link;
});
document.querySelector('main').before(hotspots);

function animate(element,frames,options){
 if(!element||reduced.matches||paused||!element.animate)return;
 const animation=element.animate(frames,{easing:'cubic-bezier(.22,.8,.22,1)',...options});
 animations.add(animation);animation.onfinish=animation.oncancel=()=>animations.delete(animation);
 return animation;
}
function measure(){
 points=[...document.querySelectorAll('[data-scene].world-hero,[data-scene].journey-section')].map(element=>({y:element.getBoundingClientRect().top+scrollY,scene:Number(element.dataset.scene)}));
 const cover=document.querySelector('.process,.detail-content,.form-panel');
 hideAfter=isVisit?Infinity:cover?cover.getBoundingClientRect().top+scrollY:document.querySelector('.invitation')?.getBoundingClientRect().top+scrollY||Infinity;
 updateScroll();
}
function scrollProgress(){
 if(!isHome||points.length<2)return Number(body.dataset.startScene);
 const y=scrollY;
 let index=points.findLastIndex(point=>point.y<=y);
 index=Math.max(0,index);
 const from=points[index],to=points[index+1];
 if(!to)return from.scene;
 const fraction=Math.min(1,Math.max(0,(y-from.y)/(to.y-from.y)));
 return reduced.matches||paused?(fraction>.5?to.scene:from.scene):from.scene+(to.scene-from.scene)*fraction;
}
function updateScroll(){
 scrollFrame=0;
 const progress=preview??scrollProgress();
 const active=Math.round(progress);
 const visible=scrollY<hideAfter-innerHeight*.25;
 body.dataset.activeScene=String(active);
 const directed=journeyState(progress);
 light=lightOverride??directed.light;
 resolvedBloom=bloomOverride??directed.bloom;
 body.dataset.scrollProgress=progress.toFixed(4);
 body.dataset.sceneLight=light.toFixed(4);
 body.dataset.sceneBloom=resolvedBloom.toFixed(4);
 body.style.setProperty('--journey-progress',Math.min(1,progress/3));
 document.querySelectorAll('[data-light-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lightChoice==='dusk'?light>=.5:light<.5)));
 const bloomButton=document.querySelector('.bloom-toggle');
 const flowerOpen=resolvedBloom>=.5;
 if(bloomButton.getAttribute('aria-pressed')!==String(flowerOpen)){
  bloomButton.setAttribute('aria-pressed',String(flowerOpen));
  bloomButton.innerHTML=`${flowerOpen?'Voltar ao broto':'Faça florescer'} <span class="brand-mark" aria-hidden="true">✳</span>`;
 }
 body.classList.toggle('world-covered',!visible);
 document.querySelectorAll('[data-target-scene]').forEach(link=>{
  if(Number(link.dataset.targetScene)===active)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current');
 });
 world?.update({progress,visible:exploring||visible,light,bloom:resolvedBloom,paused:paused||isVisit,reduced:reduced.matches,exploring,orbit});
}
function scheduleScroll(){if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll);}
function setPreview(value){
 preview=value;
 document.querySelectorAll('.service').forEach(item=>item.classList.toggle('is-preview',Number(item.dataset.scene)===preview));
 document.querySelectorAll('[data-preview]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.preview)===preview)));
 updateScroll();
}

document.querySelectorAll('.service').forEach(item=>{
 item.addEventListener('pointerenter',()=>{if(finePointer.matches)setPreview(Number(item.dataset.scene));},{signal});
 item.addEventListener('pointerleave',()=>{if(finePointer.matches&&!item.contains(document.activeElement))setPreview(null);},{signal});
 item.addEventListener('focusin',()=>setPreview(Number(item.dataset.scene)),{signal});
 item.addEventListener('focusout',event=>{if(!item.contains(event.relatedTarget))setPreview(null);},{signal});
});
document.querySelectorAll('[data-preview]').forEach(button=>button.addEventListener('click',()=>{
 const selected=Number(button.dataset.preview);setPreview(selected);
 document.querySelector('.interaction-status').textContent=`Ambiente selecionado: ${destinations[selected-1][1]}. Abra o título do serviço para conhecer os detalhes.`;
},{signal}));
document.querySelectorAll('[data-light-choice]').forEach(button=>button.addEventListener('click',()=>{
 lightOverride=button.dataset.lightChoice==='dusk'?1:0;body.dataset.light=button.dataset.lightChoice;
 document.querySelectorAll('[data-light-choice]').forEach(choice=>choice.setAttribute('aria-pressed',String(choice===button)));updateScroll();
},{signal}));
document.querySelector('.bloom-toggle').addEventListener('click',event=>{
 bloom=resolvedBloom<.5;bloomOverride=bloom?1:0;event.currentTarget.setAttribute('aria-pressed',String(bloom));event.currentTarget.innerHTML=`${bloom?'Voltar ao broto':'Faça florescer'} <span class="brand-mark" aria-hidden="true">✳</span>`;
 body.dataset.bloom=String(bloom);document.querySelector('.interaction-status').textContent=bloom?'O jardim floresceu.':'O jardim voltou ao broto.';updateScroll();
},{signal});
function togglePause(){
 paused=!paused;body.classList.toggle('motion-paused',paused);
 const button=document.querySelector('.atmosphere-toggle');button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',paused?'Retomar movimento':'Pausar movimento');button.querySelector('.pause-label').textContent=paused?'Retomar movimento':'Pausar movimento';button.firstElementChild.textContent=paused?'▷':'Ⅱ';
 const other=document.querySelector('.explore-pause');other.textContent=paused?'Retomar ▷':'Pausar Ⅱ';other.setAttribute('aria-pressed',String(paused));other.setAttribute('aria-label',paused?'Retomar movimento no jardim':'Pausar movimento no jardim');
 if(paused)animations.forEach(animation=>animation.cancel());world?.update({pointerX:0,pointerY:0});updateScroll();updateGestureAvailability();
}
document.querySelector('.atmosphere-toggle').addEventListener('click',togglePause,{signal});
// On the page, the mouse creates a small gust; touch keeps native scrolling.
let lastHover=null;
window.addEventListener('pointermove',event=>{
 if(!finePointer.matches||reduced.matches||paused||isVisit||exploring)return;
 if(!event.target.closest('.world-hero,.detail-world')||event.target.closest('a,button,input')||event.clientX<innerWidth*.4){lastHover=null;return;}
 if(lastHover&&event.timeStamp-lastHover.t<65)return;
 if(lastHover){
  const dx=event.clientX-lastHover.x,dy=lastHover.y-event.clientY,length=Math.hypot(dx,dy),dt=Math.max(16,event.timeStamp-lastHover.t);
  if(length>5)world?.gust({x:event.clientX/innerWidth*2-1,y:1-event.clientY/innerHeight*2,dx:dx/length,dy:dy/length,strength:Math.min(.6,length/dt*.3)});
 }
 lastHover={x:event.clientX,y:event.clientY,t:event.timeStamp};
},{signal,passive:true});
document.documentElement.addEventListener('pointerleave',()=>world?.update({pointerX:0,pointerY:0}),{signal});
window.addEventListener('scroll',scheduleScroll,{signal,passive:true});
window.addEventListener('resize',measure,{signal,passive:true});
document.fonts.ready.then(measure);
reduced.addEventListener('change',()=>{
 body.classList.toggle('world-reduced',reduced.matches);if(reduced.matches)animations.forEach(animation=>animation.cancel());updateScroll();updateGestureAvailability();
},{signal});
const dialog=document.querySelector('.nav-dialog');
const menuButton=document.querySelector('.menu-toggle');
menuButton.hidden=false;
menuButton.addEventListener('click',()=>{
 dialog.showModal();body.style.overflow='hidden';
 animate(dialog,[{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0)'}],{duration:650});
 dialog.querySelectorAll('nav a').forEach((link,index)=>animate(link,[{opacity:0,transform:'translateY(45px)'},{opacity:1,transform:'none'}],{duration:650,delay:100+index*65}));
},{signal});
document.querySelector('.menu-close').addEventListener('click',()=>dialog.close(),{signal});
dialog.addEventListener('close',()=>{body.style.overflow='';menuButton.focus();},{signal});
document.querySelectorAll('.hero-copy .title-line,.detail-copy .title-line').forEach((line,index)=>animate(line,[{clipPath:'inset(100% 0 0)',transform:'translateY(45px)'},{clipPath:'inset(0)',transform:'translateY(0)'}],{duration:1200,delay:150+index*120}));
if('IntersectionObserver'in window){
 revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  animate(entry.target,[{opacity:.2,transform:'translateY(50px)'},{opacity:1,transform:'none'}],{duration:950});revealObserver.unobserve(entry.target);
 }),{threshold:.2});
 document.querySelectorAll('.section-head,.invitation h2').forEach(element=>revealObserver.observe(element));
}
const releaseScrollEntrances=bindScrollEntrances({reduced,isPaused:()=>paused,animate});
const exploreDialog=document.querySelector('.explore-dialog');
const surface=document.querySelector('.orbit-surface');
let returnFocus=null,gestureMode='wind';
function chooseExplore(index){
 world?.calm();preview=index;orbit=0;body.dataset.exploreScene=String(index);
 exploreDialog.querySelectorAll('[data-explore-scene]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.exploreScene)===index)));
 document.querySelector('.explore-service').href=`${destinations[index-1][0]}.html`;
 updateScroll();
}
function turn(amount){orbit=Math.max(-Math.PI,Math.min(Math.PI,orbit+amount));world?.update({orbit});}
for(const button of document.querySelectorAll('.explore-toggle'))button.addEventListener('click',()=>{
 returnFocus=button;exploring=true;body.classList.add('exploring');body.style.overflow='hidden';
 exploreDialog.showModal();world?.update({pointerX:0,pointerY:0});chooseExplore(Number(button.dataset.initialScene)||1);setGestureMode('wind');surface.focus();
},{signal});
exploreDialog.querySelector('.explore-close').addEventListener('click',()=>exploreDialog.close(),{signal});
exploreDialog.addEventListener('close',()=>{
 releaseGesture();world?.calm();exploring=false;preview=null;orbit=0;body.classList.remove('exploring');body.style.overflow='';updateScroll();returnFocus?.focus();
},{signal});
exploreDialog.querySelectorAll('[data-explore-scene]').forEach(button=>button.addEventListener('click',()=>chooseExplore(Number(button.dataset.exploreScene)),{signal}));
exploreDialog.querySelector('.orbit-left').addEventListener('click',()=>turn(-.45),{signal});
exploreDialog.querySelector('.orbit-right').addEventListener('click',()=>turn(.45),{signal});
exploreDialog.querySelector('.orbit-reset').addEventListener('click',()=>{orbit=0;world?.update({orbit});},{signal});
function updateGestureAvailability(){
 const quiet=reduced.matches||paused;
 document.querySelector('.wind-pulse').disabled=quiet;
 document.querySelector('.wind-calm').disabled=quiet;
 surface.classList.toggle('gesture-quiet',quiet&&gestureMode==='wind');
 document.querySelector('.orbit-hint').textContent=gestureMode==='orbit'?'Arraste para olhar ao redor.':reduced.matches?'Movimento reduzido: escolha um ambiente em vista estável.':paused?'Jardim em pausa. Retome para criar uma brisa.':'Arraste nas folhas. O gesto vira brisa.';
}
function setGestureMode(mode){
 gestureMode=mode;exploreDialog.dataset.gestureMode=mode;
 exploreDialog.querySelectorAll('button[data-gesture-mode]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.gestureMode===mode)));
 document.querySelector('.orbit-controls').hidden=mode!=='orbit';document.querySelector('.wind-controls').hidden=mode!=='wind';
 surface.setAttribute('aria-label',mode==='wind'?'Arraste para criar uma brisa; use as setas ou o botão Soprar':'Gire o jardim arrastando ou usando as setas esquerda e direita');
 updateGestureAvailability();
}
exploreDialog.querySelectorAll('button[data-gesture-mode]').forEach(button=>button.addEventListener('click',()=>setGestureMode(button.dataset.gestureMode),{signal}));
exploreDialog.querySelector('.explore-pause').addEventListener('click',togglePause,{signal});
function gestureFeedback(kind){
 exploreDialog.classList.add('gesture-used');
 if(kind==='keyboard'||kind==='release')document.querySelector('.gesture-status').textContent=kind==='keyboard'?'A brisa atravessa o jardim.':'Sua brisa se dissipa. O jardim segue vivo.';
}
const releaseGesture=bindGestureSurface(surface,{
 signal,getMode:()=>gestureMode,getOrbit:()=>orbit,turnTo:value=>{orbit=Math.max(-Math.PI,Math.min(Math.PI,value));world?.update({orbit});},
 canMove:()=>!paused&&!reduced.matches,gust:value=>world?.gust(value),calm:()=>world?.calm(),onGesture:gestureFeedback
});
document.querySelector('.wind-pulse').addEventListener('click',()=>{world?.gust({x:0,y:-.1,dx:1,dy:.15,strength:1});gestureFeedback('keyboard');},{signal});
document.querySelector('.wind-calm').addEventListener('click',()=>{world?.calm();document.querySelector('.gesture-status').textContent='A brisa se acomoda.';},{signal});
body.classList.toggle('world-reduced',reduced.matches);
measure();
world=await createWorld(container,{
 initial:{progress:scrollProgress(),...journeyState(scrollProgress()),reduced:reduced.matches,paused:isVisit},
 onReady(){
  body.classList.add('world-ready');document.querySelector('.world-tools').hidden=false;
  document.querySelectorAll('.preview-world,.explore-toggle').forEach(button=>{button.hidden=false;});
 },
 onFallback(){if(exploreDialog.open)exploreDialog.close();body.classList.remove('world-ready');body.classList.add('world-failed');hotspots.hidden=true;},
 onFrame({anchors,progress}){
  if(!anchors)return;
  const closest=progress<.65?'jardim':destinations[Math.min(2,Math.max(0,Math.round(progress)-1))][0];
  anchors.forEach((anchor,index)=>{
   const pin=pins[index];
   // One contextual landmark, with semantic links duplicated by the linear document.
   const show=anchor.visible&&anchor.id===closest&&!isVisit&&!exploring&&!body.classList.contains('world-covered')&&anchor.x>.34&&anchor.y>.28&&anchor.y<.88;
   pin.hidden=!show;
   if(show)pin.style.transform=`translate(${(anchor.x*innerWidth).toFixed(1)}px,${(anchor.y*innerHeight).toFixed(1)}px)`;
  });
 }
});
updateScroll();
window.addEventListener('pagehide',event=>{
 cancelAnimationFrame(scrollFrame);animations.forEach(animation=>animation.cancel());
 if(event.persisted){world?.update({visible:false});return;}
 revealObserver?.disconnect();releaseScrollEntrances();lifetime.abort();world?.dispose();
},{signal});
window.addEventListener('pageshow',()=>{body.style.overflow=dialog.open||exploreDialog.open?'hidden':'';measure();},{signal});
