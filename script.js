const $=id=>document.getElementById(id);
/* Ảnh album: dán đường dẫn dạng data:image/jpeg;base64,... vào đây. Để trống sẽ hiện khung mẫu. */
const PHOTOS=[];
const LETTER=`Lan Hương à,

Hôm nay là sinh nhật em, nên anh được một đặc quyền nhỏ: nói ra những điều anh vẫn giấu bấy lâu nay.

Chúc em tuổi mới thật nhiều sức khỏe, niềm vui, may mắn và những điều em mong ước. Nếu có điều ước nào chưa thành, cho anh xin được góp một tay nhé.

Cảm ơn em vì đã xuất hiện. Từ khi có em, những ngày bình thường bỗng đáng mong chờ hơn hẳn, đến mức anh cũng không hiểu vì sao mình hay mỉm cười một mình như vậy.

Anh nghe nói sinh nhật là ngày ước gì cũng được. Vậy nếu em hỏi anh ước gì, anh sẽ ước năm sau, và nhiều năm sau nữa, anh vẫn là người chúc mừng em đầu tiên.

Chúc cô gái của anh luôn rạng rỡ theo cách riêng của mình.

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

/* Chuyển trang */
function go(n){document.querySelectorAll(".screen").forEach(s=>s.classList.toggle("on",s.id==="p"+n));$("app").scrollTo(0,0)}
$("home").onclick=()=>go(1);$("n2").onclick=()=>go(3);$("n3").onclick=()=>go(4);$("n4").onclick=()=>go(5);$("n6").onclick=()=>go(7);

/* Bức thư gõ từng chữ */
let timer;
$("open").onclick=()=>{go(2);const box=$("letter"),next=$("n2"),hint=$("lh"),chars=Array.from(LETTER);let i=0;
  box.textContent="";next.classList.add("hide");hint.textContent="Một chút yêu thương đang được gửi đến em...";clearInterval(timer);
  timer=setInterval(()=>{const near=box.scrollHeight-box.scrollTop-box.clientHeight<35;
    box.textContent+=chars[i++];if(near)box.scrollTop=box.scrollHeight;
    if(i>=chars.length){clearInterval(timer);next.classList.remove("hide");hint.textContent="♡ Gửi em bằng tất cả sự chân thành, và hơi nhiều thương ♡"}},35)};

/* Vuốt để cắt bánh */
const cake=$("cake");let sx=null;
function cutCake(){if(cake.classList.contains("cut"))return;cake.classList.add("cut");confetti();
  $("cut").classList.add("hide");$("hb").classList.remove("hide");$("n3").classList.remove("hide")}
cake.addEventListener("pointerdown",e=>{sx=e.clientX;cake.setPointerCapture(e.pointerId)});
cake.addEventListener("pointermove",e=>{if(sx!==null&&Math.abs(e.clientX-sx)>45){cutCake();sx=null}});
cake.addEventListener("pointerup",()=>{sx=null});cake.addEventListener("pointercancel",()=>{sx=null});

/* Mật khẩu */
let pin="";const dots=document.querySelectorAll("#dots i");
function draw(){dots.forEach((d,i)=>d.classList.toggle("f",i<pin.length))}
function add(n){if(pin.length>=4)return;pin+=n;draw();$("err").textContent="";if(pin.length===4)setTimeout(check,200)}
function del(){pin=pin.slice(0,-1);draw();$("err").textContent=""}
function check(){if(pin===PASSWORD){pin="";draw();go(6);confetti()}else{$("err").textContent="Chưa đúng rồi, em thử lại nhé ♡";pin="";draw()}}
["1","2","3","4","5","6","7","8","9","⌫","0","↵"].forEach(k=>{const b=document.createElement("button");b.textContent=k;
  b.onclick=()=>k==="⌫"?del():k==="↵"?check():add(k);$("pad").appendChild(b)});
document.addEventListener("keydown",e=>{if(!$("p5").classList.contains("on"))return;
  if(/^[0-9]$/.test(e.key))add(e.key);else if(e.key==="Backspace")del();else if(e.key==="Enter")check()});

/* Album: ảnh kéo qua lại */
const gal=$("gal");
(PHOTOS.length?PHOTOS:["Ảnh kỷ niệm 1","Ảnh kỷ niệm 2","Ảnh kỷ niệm 3","Ảnh kỷ niệm 4"]).forEach(p=>{
  const f=document.createElement("div");f.className="photo";
  if(PHOTOS.length){const im=document.createElement("img");im.src=p;im.alt="Ảnh kỷ niệm";im.draggable=false;f.appendChild(im)}else f.textContent=p;
  gal.appendChild(f)});
let gx=0,gl=0,gd=false;
gal.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse")return;gd=true;gx=e.clientX;gl=gal.scrollLeft;gal.classList.add("drag");gal.setPointerCapture(e.pointerId)});
gal.addEventListener("pointermove",e=>{if(gd)gal.scrollLeft=gl-(e.clientX-gx)});
const gend=()=>{gd=false;gal.classList.remove("drag")};
gal.addEventListener("pointerup",gend);gal.addEventListener("pointercancel",gend);

/* Thêm ảnh từ thiết bị (chỉ hiện trên máy đang xem) */
let custom=false,urls=[];
function addPhoto(src,alt){const f=document.createElement("div");f.className="photo";
  const im=document.createElement("img");im.src=src;im.alt=alt||"Ảnh kỷ niệm";im.draggable=false;f.appendChild(im);gal.appendChild(f)}
$("picker").addEventListener("change",e=>{
  const files=[...e.target.files].filter(f=>f.type.startsWith("image/"));if(!files.length)return;
  if(!custom){gal.innerHTML="";custom=true}
  files.forEach(f=>{const u=URL.createObjectURL(f);urls.push(u);addPhoto(u,f.name)});
  e.target.value="";gal.scrollTo({left:0})});
window.addEventListener("beforeunload",()=>urls.forEach(u=>URL.revokeObjectURL(u)));
