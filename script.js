const $=id=>document.getElementById(id);
/* ===== CẤU HÌNH: điền vào đây ===== */
const CONFIG={
  contact:"",  // link nhận hồi âm, vd "https://zalo.me/09xxxxxxxx" hoặc "https://m.me/ten-facebook"
  meet:"2026-08-24",     // ngày lần đầu quen, vd "2025-03-15" (để trống = bỏ qua)
  birth:"2007-11-11",    // ngày sinh của cô ấy, vd "2001-11-09" (để trống = bỏ qua)
  music:""     // đường dẫn file nhạc (để trống = dùng nhạc hộp Happy Birthday tự tạo)
};
/* Ảnh album: mỗi ảnh {src:"data:image/jpeg;base64,...", cap:"Chú thích"} */
const PHOTOS=[];
const CAPTIONS=["Lần đầu anh thấy em cười","Một ngày bình thường mà đẹp lạ","Khoảnh khắc anh nhớ mãi","Và còn nhiều lần nữa nhé"];
const REASONS=["Vì nụ cười của em làm cả ngày của anh nhẹ đi.","Vì em dịu dàng với mọi người, kể cả những lúc em mệt.","Vì có lúc anh nhìn em và quên mất mình định nói gì.","Vì nghe giọng em là thấy bình yên.","Vì em biến những ngày bình thường thành những ngày đáng nhớ.","Vì anh chưa dám nói, nhưng em xứng đáng được nghe."];
const LETTER=`Lan Hương à,

Anh viết thư này mà tim đập nhanh hơn bình thường, nên nếu có chữ nào hơi run thì em thông cảm nhé.

Hôm nay là sinh nhật em. Anh chúc em một tuổi mới thật nhiều sức khỏe, nhiều tiếng cười và nhiều điều tốt đẹp, những điều xứng đáng với một người dịu dàng như em.

Có những người đến bên mình rất nhẹ, nhưng lại khiến mọi thứ xung quanh sáng lên. Với anh, em là người như thế. Anh không dám nói nhiều, chỉ âm thầm vui khi thấy em vui, và âm thầm lo khi em mệt.

Anh không đòi hỏi gì đâu. Chỉ mong mỗi ngày của em đều đẹp, và nếu có thể, cho anh được đứng gần em thêm một chút, từ từ thôi, em đừng vội.

Nếu hôm nay em ước một điều, anh cũng xin ước ké một điều: ước sao năm sau, anh vẫn được là người gửi lời chúc này đến em.

Happy Birthday, Lan Hương! ♡`.normalize("NFC");
const PASSWORD="1111";

/* Bầu trời sao và tim bay */
const sky=$("sky");
for(let i=0;i<95;i++){const s=document.createElement("i"),z=Math.random()*2.2+.5;
  s.className="star";s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:${z}px;height:${z}px;--s:${1.5+Math.random()*3}s`;sky.appendChild(s)}
setInterval(()=>{if(document.hidden)return;const h=document.createElement("span"),a=["♥","♡","❤"];
  h.className="fl";h.textContent=a[Math.floor(Math.random()*3)];
  h.style.cssText=`left:${Math.random()*100}%;font-size:${12+Math.random()*24}px;--d:${7+Math.random()*7}s`;
  h.addEventListener("animationend",()=>h.remove(),{once:true});sky.appendChild(h)},480);

for(let i=0;i<16;i++){const s=document.createElement("span");s.className="spk";s.textContent="✦";
  s.style.cssText=`left:${Math.random()*96}%;top:${Math.random()*96}%;font-size:${10+Math.random()*14}px;--s:${1.8+Math.random()*3}s`;sky.appendChild(s)}
const bt=$("bunting"),cols=["#f77fb0","#ffc2da","#ffb36b","#fff0a6","#c9a8ff","#9fe0d0"];
for(let i=0;i<11;i++){const t=document.createElement("i");t.style.setProperty("--c",cols[i%cols.length]);bt.appendChild(t)}
function confetti(){const a=["♥","♡","✦","●","❀"],k=["#f77fb0","#ffc2da","#ffb36b","#ffe27a","#c9a8ff","#7fd8c0"];
  for(let i=0;i<46;i++){const e=document.createElement("span");e.className="cf";e.textContent=a[i%a.length];
    e.style.cssText=`left:${Math.random()*100}%;color:${k[i%k.length]};font-size:${12+Math.random()*16}px;--d:${3+Math.random()*3}s;animation-delay:${Math.random()*.8}s`;
    e.addEventListener("animationend",()=>e.remove(),{once:true});document.body.appendChild(e)}}

function fireworks(){const k=["#ff6fa8","#ffd36b","#9fe0ff","#c9a8ff","#ffffff"];
  for(let b=0;b<4;b++)setTimeout(()=>{const x=15+Math.random()*70,y=15+Math.random()*40;
    for(let i=0;i<22;i++){const p=document.createElement("i"),a=i/22*6.283,r=60+Math.random()*60;p.className="fw";
      p.style.cssText=`left:${x}%;top:${y}%;--c:${k[(b+i)%5]};--x:${Math.cos(a)*r}px;--y:${Math.sin(a)*r}px`;
      p.addEventListener("animationend",()=>p.remove(),{once:true});document.body.appendChild(p)}},b*450)}

/* Chuyển trang */
function go(n){document.querySelectorAll(".screen").forEach(s=>s.classList.toggle("on",s.id==="p"+n));$("app").scrollTo(0,0)}
$("home").onclick=()=>{go(1);playHome(.3)};$("n2").onclick=()=>go(3);$("n3").onclick=()=>go(4);$("n4").onclick=()=>go(5);$("n6").onclick=after6;$("n8").onclick=()=>go(9);$("n9").onclick=()=>go(7);

/* Nhạc nền: file riêng hoặc nhạc hộp tự tạo */
const AC=window.AudioContext||window.webkitAudioContext;
const music=(()=>{let ac,gain,aud,tm;const F={G4:392,A4:440,B4:493.88,C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99};
  const T=[["G4",.75],["G4",.25],["A4",1],["G4",1],["C5",1],["B4",2],["G4",.75],["G4",.25],["A4",1],["G4",1],["D5",1],["C5",2],
    ["G4",.75],["G4",.25],["G5",1],["E5",1],["C5",1],["B4",1],["A4",1],["F5",.75],["F5",.25],["E5",1],["C5",1],["D5",1],["C5",2]];
  function note(n,d){const o=ac.createOscillator(),g=ac.createGain(),t=ac.currentTime;o.type="triangle";o.frequency.value=F[n];o.connect(g);g.connect(gain);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.5,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+d+.5);o.start(t);o.stop(t+d+.6)}
  function play(i){if(!m.on)return;const [n,b]=T[i%T.length],d=b*.55;note(n,d);tm=setTimeout(()=>play(i+1),d*1000+(i%T.length===T.length-1?2000:0))}
  const m={on:false,begun:false,
    start(){if(this.begun)return;this.begun=true;$("mus").classList.remove("hide");this.set(true)},
    set(v){this.on=v;$("mus").textContent=v?"🔊":"🔇";clearTimeout(tm);
      if(CONFIG.music){aud=aud||Object.assign(new Audio(CONFIG.music),{loop:true,volume:.5});v?aud.play().catch(()=>{}):aud.pause()}
      else if(v&&AC){ac=ac||new AC();ac.resume();if(!gain){gain=ac.createGain();gain.gain.value=.12;gain.connect(ac.destination)}play(0)}}};
  return m})();
$("mus").onclick=()=>music.set(!music.on);

/* Bức thư gõ từng chữ */
let timer;
function doneLetter(){clearInterval(timer);$("n2").classList.remove("hide");$("skip").classList.add("hide");$("lh").textContent="♡ Chữ có thể run, nhưng lòng thì thật ♡"}
$("open").onclick=()=>{go(2);music.start();const box=$("letter"),chars=Array.from(LETTER);let i=0;
  box.textContent="";$("n2").classList.add("hide");$("skip").classList.remove("hide");
  $("lh").textContent="Có người đang viết từng chữ, rất chậm và rất thật lòng...";clearInterval(timer);
  $("skip").onclick=()=>{box.textContent=LETTER;box.scrollTop=0;doneLetter()};
  timer=setInterval(()=>{const near=box.scrollHeight-box.scrollTop-box.clientHeight<35;
    const sp=document.createElement("span");sp.className="fx";sp.textContent=chars[i++];box.appendChild(sp);if(near)box.scrollTop=box.scrollHeight;
    if(i>=chars.length)doneLetter()},35)};

/* Vuốt để cắt bánh */
const cake=$("cake");let sx=null;
function cutCake(){if(cake.classList.contains("cut"))return;cake.classList.add("cut");confetti();fireworks();$("mic").classList.add("hide");
  $("cut").classList.add("hide");$("hb").classList.remove("hide");$("n3").classList.remove("hide")}
cake.addEventListener("pointerdown",e=>{sx=e.clientX;cake.setPointerCapture(e.pointerId)});
cake.addEventListener("pointermove",e=>{if(sx!==null&&Math.abs(e.clientX-sx)>45){cutCake();sx=null}});
cake.addEventListener("pointerup",()=>{sx=null});cake.addEventListener("pointercancel",()=>{sx=null});

/* Mật khẩu */
let pin="";const dots=document.querySelectorAll("#dots i");
function draw(){dots.forEach((d,i)=>d.classList.toggle("f",i<pin.length))}
function add(n){if(pin.length>=4)return;pin+=n;draw();$("err").textContent="";if(pin.length===4)setTimeout(check,200)}
function del(){pin=pin.slice(0,-1);draw();$("err").textContent=""}
function check(){if(pin===PASSWORD){pin="";draw();go(6);confetti()}else{$("err").textContent="Chưa đúng rồi, em thử lại nhé. Anh đợi được mà ♡";pin="";draw()}}
["1","2","3","4","5","6","7","8","9","⌫","0","↵"].forEach(k=>{const b=document.createElement("button");b.textContent=k;
  b.onclick=()=>k==="⌫"?del():k==="↵"?check():add(k);$("pad").appendChild(b)});
document.addEventListener("keydown",e=>{if(!$("p5").classList.contains("on"))return;
  if(/^[0-9]$/.test(e.key))add(e.key);else if(e.key==="Backspace")del();else if(e.key==="Enter")check()});

/* Thổi nến bằng micro */
$("mic").onclick=async()=>{try{
  const st=await navigator.mediaDevices.getUserMedia({audio:true}),c=new AC(),an=c.createAnalyser();an.fftSize=512;
  c.createMediaStreamSource(st).connect(an);const d=new Uint8Array(an.fftSize);let hits=0;$("mic").textContent="🎤 Đang nghe... em thổi nhẹ nhé";
  (function loop(){if(cake.classList.contains("cut")){st.getTracks().forEach(x=>x.stop());c.close();return}
    an.getByteTimeDomainData(d);let m=0;for(const v of d)m=Math.max(m,Math.abs(v-128));hits=m>60?hits+1:0;if(hits>6)cutCake();requestAnimationFrame(loop)})()
}catch(e){$("mic").textContent="Không mở được micro, em vuốt ngang nhé ♡"}};

/* Trang đếm ngày */
function after6(){if(CONFIG.meet||CONFIG.birth){go(8);counter()}else go(9)}
function counter(){const rows=[];
  if(CONFIG.meet)rows.push(["Đã",Math.max(0,Math.floor((Date.now()-Date.parse(CONFIG.meet))/864e5)),"ngày kể từ lần đầu anh biết em"]);
  if(CONFIG.birth){const b=new Date(CONFIG.birth),t=new Date();const a=t.getFullYear()-b.getFullYear();rows.push(["Năm nay em tròn",a,"tuổi"])}
  $("cnt").innerHTML=rows.map(r=>`<div class="cr"><span>${r[0]}</span><b data-n="${r[1]}">0</b><span>${r[2]}</span></div>`).join("");
  document.querySelectorAll("#cnt b").forEach(el=>{const n=+el.dataset.n,t0=performance.now();
    (function s(t){const p=Math.min(1,(t-t0)/1800);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(s)})(t0)})}

/* Thẻ lật: những lý do anh mỉm cười */
$("cards").innerHTML=REASONS.map((r,i)=>`<button class="fc"><span class="fi"><span class="ff">♡<small>${i+1}</small></span><span class="fb">${r}</span></span></button>`).join("");
document.querySelectorAll(".fc").forEach(b=>b.onclick=()=>b.classList.toggle("flip"));

/* Album + xem ảnh phóng to */
const gal=$("gal");let items=PHOTOS.length?PHOTOS.slice():CAPTIONS.map((c,i)=>({ph:"Ảnh kỷ niệm "+(i+1),cap:c})),cur=0,moved=false,custom=false,urls=[];
function renderGal(){gal.innerHTML="";items.forEach((it,i)=>{const f=document.createElement("figure");f.className="photo";
  const m=it.src?Object.assign(document.createElement("img"),{src:it.src,alt:it.cap||"Ảnh kỷ niệm",draggable:false}):Object.assign(document.createElement("div"),{className:"ph",textContent:it.ph});
  const c=document.createElement("figcaption");c.className="cap";c.textContent=it.cap||"";f.append(m,c);f.onclick=()=>{if(!moved)openLb(i)};gal.appendChild(f)})}
renderGal();
function showLb(i){cur=(i+items.length)%items.length;const it=items[cur],box=$("lbc");box.innerHTML="";
  const e=it.src?Object.assign(document.createElement("img"),{src:it.src,alt:it.cap||"Ảnh kỷ niệm"}):Object.assign(document.createElement("div"),{className:"lbph",textContent:it.ph});
  box.appendChild(e);if(it.cap){const p=document.createElement("p");p.textContent=it.cap;box.appendChild(p)}}
function openLb(i){showLb(i);$("lb").classList.remove("hide")}
const closeLb=()=>$("lb").classList.add("hide");
$("lbx").onclick=closeLb;$("lbp").onclick=()=>showLb(cur-1);$("lbn").onclick=()=>showLb(cur+1);
$("lb").addEventListener("click",e=>{if(e.target===$("lb")||e.target===$("lbc"))closeLb()});
let lx=null;$("lb").addEventListener("pointerdown",e=>{lx=e.clientX});
$("lb").addEventListener("pointerup",e=>{if(lx!==null&&Math.abs(e.clientX-lx)>50)showLb(cur+(e.clientX<lx?1:-1));lx=null});
document.addEventListener("keydown",e=>{if($("lb").classList.contains("hide"))return;
  if(e.key==="Escape")closeLb();else if(e.key==="ArrowRight")showLb(cur+1);else if(e.key==="ArrowLeft")showLb(cur-1)});

let gx=0,gl=0,gd=false;
gal.addEventListener("pointerdown",e=>{moved=false;if(e.pointerType!=="mouse")return;gd=true;gx=e.clientX;gl=gal.scrollLeft;gal.classList.add("drag");gal.setPointerCapture(e.pointerId)});
gal.addEventListener("pointermove",e=>{if(gd){if(Math.abs(e.clientX-gx)>6)moved=true;gal.scrollLeft=gl-(e.clientX-gx)}});
const gend=()=>{gd=false;gal.classList.remove("drag")};
gal.addEventListener("pointerup",gend);gal.addEventListener("pointercancel",gend);

/* Thêm ảnh từ thiết bị (chỉ hiện trên máy đang xem) */
$("picker").addEventListener("change",e=>{
  const files=[...e.target.files].filter(f=>f.type.startsWith("image/"));if(!files.length)return;
  if(!custom&&!PHOTOS.length)items=[];custom=true;
  files.forEach(f=>{const u=URL.createObjectURL(f);urls.push(u);items.push({src:u,cap:""})});
  renderGal();e.target.value="";gal.scrollTo({left:0})});
window.addEventListener("beforeunload",()=>urls.forEach(u=>URL.revokeObjectURL(u)));

/* Nút nhắn lại */
if(CONFIG.contact){const a=$("contact");a.href=CONFIG.contact;a.classList.remove("hide")}

/* Chữ rơi như sao băng ở trang mở đầu */
function fx(el,start,step){if(!el.dataset.h)el.dataset.h=el.innerHTML;el.innerHTML=el.dataset.h;let k=0;
  const walk=n=>[...n.childNodes].forEach(c=>{
    if(c.nodeType===3){const f=document.createDocumentFragment();
      Array.from(c.textContent).forEach(ch=>{if(/\s/.test(ch)){f.appendChild(document.createTextNode(ch));return}
        const s=document.createElement("span");s.className="fx";s.textContent=ch;s.style.animationDelay=(start+k++*step)+"s";f.appendChild(s)});
      c.replaceWith(f)}else if(c.nodeType===1&&c.tagName!=="BR")walk(c)});
  walk(el)}
function playHome(start){let t=start;
  ["#p1 .tag","#p1 h1","#p1 .sub"].forEach(q=>{const el=document.querySelector(q);fx(el,t,.035);t+=Array.from(el.textContent).length*.035+.2})}
playHome(1.2);
