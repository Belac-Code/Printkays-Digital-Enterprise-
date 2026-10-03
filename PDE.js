

var STATS={months:['Apr','May','Jun','Jul','Aug','Sep'],visits:[1800,3200,5600,9400,15200,24800]}; // SAMPLE DATA: replace with real analytics
(function(){var r=document.documentElement,s=null;try{s=localStorage.getItem('pk-theme')}catch(e){}
r.setAttribute('data-theme',s==='dark'?'dark':'light');
document.getElementById('th').onclick=function(){var m=r.getAttribute('data-theme')==='dark'?'light':'dark';r.setAttribute('data-theme',m);try{localStorage.setItem('pk-theme',m)}catch(e){}}})();
var t=document.getElementById('tk');t.innerHTML+=t.innerHTML;
document.getElementById('yr').textContent=new Date().getFullYear();
var l=document.getElementById('links');
document.getElementById('bg').onclick=function(){l.classList.toggle('open')};
l.querySelectorAll('a').forEach(function(a){a.onclick=function(){l.classList.remove('open')}});
function fmt(v){return v>=1000?(v/1000).toFixed(v>=10000?0:1).replace('.0','')+'K':Math.round(v)+''}
var V=STATS.visits,tot=V.reduce(function(a,b){return a+b},0),X=V[V.length-1]/V[0];
var tv={total:[tot,fmt,''],last:[V[V.length-1],fmt,''],x:[X,function(v){return v.toFixed(1)},'x']};
function count(el){var d=tv[el.dataset.k],t0=null;function f(n){if(!t0)t0=n;var p=Math.min((n-t0)/1400,1),e=1-Math.pow(1-p,3);el.textContent=d[1](d[0]*e)+d[2];if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
function chart(){var W=600,H=260,P=34,m=Math.max.apply(null,V)*1.1,n=V.length,pts=V.map(function(v,i){return[P+i*(W-2*P)/(n-1),H-P-(v/m)*(H-2*P)]});
var d='M'+pts[0][0]+' '+pts[0][1];for(var i=1;i<n;i++){var a=pts[i-1],b=pts[i],c=(a[0]+b[0])/2;d+=' C'+c+' '+a[1]+' '+c+' '+b[1]+' '+b[0]+' '+b[1]}
var o='<defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4aa8ff" stop-opacity=".45"/><stop offset="1" stop-color="#4aa8ff" stop-opacity="0"/></linearGradient></defs>';
o+='<path class="ar" d="'+d+' L'+pts[n-1][0]+' '+(H-P)+' L'+pts[0][0]+' '+(H-P)+'Z"/><path class="ln" id="lp" d="'+d+'"/>';
pts.forEach(function(p,i){o+='<circle class="dt" cx="'+p[0]+'" cy="'+p[1]+'" r="5"/><text x="'+p[0]+'" y="'+(H-8)+'" text-anchor="middle">'+STATS.months[i]+'</text>'});
var c=document.getElementById('chart');c.innerHTML=o;var lp=document.getElementById('lp'),L=lp.getTotalLength();lp.style.strokeDasharray=L;lp.style.strokeDashoffset=L;lp.style.transition='stroke-dashoffset 1.8s ease';c._L=L}
chart();
var cs=document.getElementById('chart');
var io=new IntersectionObserver(function(es){es.forEach(function(x){var el=x.target;
if(x.isIntersecting){el.classList.add('on');el._t=setTimeout(function(){el.classList.add('done')},950);
el.querySelectorAll('.num').forEach(function(n){if(!n._c){n._c=1;count(n)}});
if(el.contains(cs)){cs.classList.add('go');document.getElementById('lp').style.strokeDashoffset=0}}
else if(x.boundingClientRect.top>0){clearTimeout(el._t);el.classList.remove('on','done')}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(el){var i=[].indexOf.call(el.parentNode.children,el);el.style.transitionDelay=(i%3)*110+'ms';io.observe(el)});
document.querySelectorAll('.card').forEach(function(c){
c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%');c.style.setProperty('--ry',(x-.5)*8+'deg');c.style.setProperty('--rx',-(y-.5)*8+'deg')});
c.addEventListener('pointerleave',function(){c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')})});
