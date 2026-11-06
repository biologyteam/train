const E="apple:🍎,banana:🍌,orange:🍊,grape:🍇,lemon:🍋,watermelon:🍉,strawberry:🍓,cherry:🍒,peach:🍑,pear:🍐,carrot:🥕,tomato:🍅,potato:🥔,corn:🌽,bread:🍞,cheese:🧀,egg:🥚,milk:🥛,water:💧,coffee:☕,tea:🍵,pizza:🍕,burger:🍔,rice:🍚,cake:🍰,chocolate:🍫,fish:🐟,chicken:🐔,meat:🥩,dog:🐶,cat:🐱,horse:🐴,cow:🐮,pig:🐷,sheep:🐑,bird:🐦,lion:🦁,tiger:🐯,monkey:🐵,elephant:🐘,bear:🐻,rabbit:🐰,duck:🦆,snake:🐍,butterfly:🦋,bee:🐝,sun:☀️,moon:🌙,star:⭐,cloud:☁️,rain:🌧️,snow:❄️,fire:🔥,tree:🌳,flower:🌸,mountain:⛰️,sea:🌊,earth:🌍,house:🏠,home:🏠,school:🏫,hospital:🏥,car:🚗,bus:🚌,train:🚆,plane:✈️,ship:🚢,bicycle:🚲,book:📚,pen:🖊️,pencil:✏️,phone:📱,computer:💻,key:🔑,clock:⏰,time:⏰,money:💰,gift:🎁,bag:👜,shoe:👟,hat:🎩,shirt:👕,glasses:👓,umbrella:☂️,heart:❤️,love:❤️,happy:😊,sad:😢,angry:😠,tired:😴,sleep:😴,eye:👁️,hand:✋,ear:👂,nose:👃,mouth:👄,tooth:🦷,music:🎵,game:🎮,ball:⚽,camera:📷,light:💡,idea:💡,door:🚪,bed:🛏️,chair:🪑,doctor:🧑‍⚕️,teacher:🧑‍🏫,king:👑,baby:👶,friend:🤝,city:🏙️,beach:🏖️,hot:🥵,cold:🥶,run:🏃,walk:🚶,swim:🏊,eat:🍽️,drink:🥤,read:📖,write:✍️,think:🤔,laugh:😂,cry:😭";
const EM={};E.split(",").forEach(p=>{const i=p.indexOf(":");EM[p.slice(0,i)]=p.slice(i+1)});
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],st=$("#stage");
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const DAY=864e5,today=()=>Math.floor(Date.now()/DAY),INT=[0,1,2,4,8,16,32];
let D={words:[],xp:0,streak:0,last:0,day:0,n:0},RUN=0,T;
try{Object.assign(D,JSON.parse(localStorage.getItem("wt2")||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem("wt2",JSON.stringify(D))}catch(e){}};
function emo(w){w=w.toLowerCase().trim();if(EM[w])return EM[w];const l=w.split(/\s+/).pop();return EM[l]||(l.endsWith("s")&&EM[l.slice(0,-1)])||""}
function parse(t){const o=[];t.split(/\r?\n/).forEach(l=>{l=l.trim();if(!l)return;let ex="";const p=l.indexOf("|");if(p>0){ex=l.slice(p+1).trim();l=l.slice(0,p).trim()}
const m=l.match(/^(.+?)(?:\s+[-–]\s+|\s*[:=\t]\s*)(.+)$/);if(m)o.push({w:m[1].trim(),m:m[2].trim(),ex});else l.split(/[,،;]/).forEach(x=>{x=x.trim();if(x)o.push({w:x,m:"",ex})})});
return o.map(x=>({...x,d:"",e:emo(x.w),img:"",box:0,due:0,ok:0,bad:0}))}
function addWords(a){a.forEach(n=>{const o=D.words.find(x=>x.w.toLowerCase()===n.w.toLowerCase());if(o){if(n.m)o.m=n.m;if(n.ex)o.ex=n.ex}else D.words.push(n)});save();list();msg("تمت الإضافة ✓ ("+D.words.length+" كلمة)")}
function grade(x,ok,lv){const t=today();if(D.day!==t){D.day=t;D.n=0}x.seen=(x.seen||0)+1;
if(ok){x.ok=(x.ok||0)+1;x.box=Math.min(6,(x.box||0)+(lv==null?1:lv));x.due=t+Math.max(1,INT[x.box])}else{x.bad=(x.bad||0)+1;x.box=0;x.due=t}
D.xp+=ok?10:1;D.n++;if(D.last!==t){D.streak=D.last===t-1?D.streak+1:1;D.last=t}save()}
function pool(n,f){const t=today();return shuf(D.words.filter(f||(()=>1))).sort((a,b)=>((a.due||0)>t)-((b.due||0)>t)).slice(0,n)}
const pic=x=>x.img?`<img class="im" src="${esc(x.img)}" alt="">`:(x.e?`<span class="em">${x.e}</span>`:"");
const pat=x=>x.w[0]+" "+x.w.slice(1).replace(/[^ ]/g,"_ ").trim();
const clue=x=>pic(x)+(x.m?`<div>${esc(x.m)}</div>`:(x.img||x.e?"":`<div dir="ltr">${esc(pat(x))}</div>`));
function say(w){try{const u=new SpeechSynthesisUtterance(w);u.lang="en-US";speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function R(h){st.innerHTML=h;st.querySelectorAll("img").forEach(i=>i.onerror=()=>i.remove());const b=$("#bk2");if(b)b.onclick=()=>show("home")}
const hdr=(i,n,ex)=>`<div class="top"><button id="bk2">✕</button><div class="bar"><i style="width:${n?i/n*100:0}%"></i></div>${ex||""}</div>`;
const need=n=>R(hdr(0,1)+`<p class="hint">محتاج ${n} كلمات مناسبة على الأقل للتدريب ده (جرّب تضيف معاني أو كلمات أكتر).</p>`);
function fin(sc,n,again){R(`<div class="big">🎉</div><h2>${sc} / ${n}</h2><p class="hint">XP الكلي: ${D.xp}</p><div class="row" style="justify-content:center"><button class="p" id="ag">🔁 مرة تانية</button><button id="bk">🏠 الرئيسية</button></div>`);$("#ag").onclick=again;$("#bk").onclick=()=>show("home")}

function cards(){const q=pool(15);if(!q.length)return need(1);const id=RUN;let i=0,f=0;
const step=()=>{if(id!==RUN)return;if(i>=q.length)return fin(q.length,q.length,cards);const x=q[i];
R(hdr(i,q.length)+`<div class="fc" id="fc">${f?`<div class="w">${esc(x.w)}</div>${x.d?`<p dir="ltr" class="hint">${esc(x.d)}</p>`:""}${x.ex?`<p dir="ltr" class="hint"><i>${esc(x.ex)}</i></p>`:""}${x.m?`<div>${esc(x.m)}</div>`:""}`:`<div class="clue">${clue(x)}</div><p class="hint">اضغط لقلب البطاقة</p>`}</div>`+(f?`<div class="row" style="justify-content:center"><button class="no" id="a0">❌ نسيتها</button><button id="a1">😐 صعبة</button><button class="ok" id="a2">👍 كويس</button><button class="p" id="a3">⚡ سهلة</button></div>`:""));
$("#fc").onclick=()=>{f=!f;if(f)say(x.w);step()};
if(f)[[0,0],[1,0],[2,1],[3,2]].forEach(([k,l])=>$("#a"+k).onclick=()=>{k?grade(x,true,l):grade(x,false);i++;f=0;step()})};step()}

function mc(c){const id=RUN,src=D.words.filter(c.f||(()=>1));if(src.length<2)return need(2);let q=pool(c.n||10,c.f);if(c.sec)while(q.length<150)q=q.concat(shuf(q));let i=0,sc=0,dead=0;const t0=Date.now();
if(c.sec)T=setInterval(()=>{const l=c.sec-(Date.now()-t0)/1000,e=$("#tm");if(e)e.textContent=Math.max(0,l|0);if(l<=0&&!dead){dead=1;clearInterval(T);fin(sc,i,()=>mc(c))}},250);
const step=()=>{if(id!==RUN||dead)return;if(i>=q.length)return fin(sc,i,()=>mc(c));const x=q[i];
const o=shuf([x,...shuf(src.filter(y=>y!==x&&c.o(y)!==c.o(x))).slice(0,3)]);
R(hdr(i,q.length,c.sec?`<b id="tm">${c.sec}</b>`:"")+`<div class="clue">${c.q(x)}</div><div class="opts">${o.map((y,k)=>`<button data-k="${k}" ${c.ar?"":'dir="ltr"'}>${esc(c.o(y))}</button>`).join("")}</div>`);
if(c.say)say(x.w);
$$(".opts button").forEach(b=>b.onclick=()=>{const ok=o[b.dataset.k]===x;$$(".opts button").forEach(e=>{e.disabled=true;if(o[e.dataset.k]===x)e.classList.add("ok")});if(ok)sc++;else b.classList.add("no");grade(x,ok);if(!c.sec)say(x.w);i++;setTimeout(step,c.sec?350:ok?600:1100)})};step()}

function ty(c){const q=pool(10,c.f);if(!q.length)return need(1);const id=RUN;let i=0,sc=0;
const step=()=>{if(id!==RUN)return;if(i>=q.length)return fin(sc,q.length,()=>ty(c));const x=q[i];let h=0;
R(hdr(i,q.length)+`<div class="clue">${c.q(x)}</div><div class="row" style="justify-content:center"><button id="sp">🔊 اسمع</button><button id="ht">💡 تلميح</button></div><input type="text" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false"><button class="p" id="ck">تحقق</button><div id="fb" class="clue"></div>`);
const a=$("#ans");a.focus();if(c.say)say(x.w);$("#sp").onclick=()=>say(x.w);
$("#ht").onclick=()=>{h++;$("#fb").innerHTML=`<span dir="ltr">${esc(x.w.slice(0,h))}${"_".repeat(Math.max(0,x.w.length-h))}</span>`};
const chk=()=>{if(a.disabled)return;const ok=a.value.trim().toLowerCase()===x.w.toLowerCase();a.disabled=true;if(ok)sc++;grade(x,ok&&!h);
$("#fb").innerHTML=ok?`<span style="color:var(--ok)">✓ صح</span>`:`<span style="color:var(--no)">✗ الصح: <b dir="ltr">${esc(x.w)}</b></span>`;say(x.w);i++;setTimeout(step,ok?800:1600)};
$("#ck").onclick=chk;a.onkeydown=e=>e.key==="Enter"&&chk()};step()}

const blank=x=>{let s=x.d||"";if(x.ex&&x.ex.toLowerCase().includes(x.w.toLowerCase()))s=x.ex.replace(new RegExp(x.w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"ig"),"_____");return(s?`<div dir="ltr" style="margin-bottom:8px">${esc(s)}</div>`:"")+clue(x)};

function scr(){const q=pool(10);if(!q.length)return need(1);const id=RUN;let i=0,sc=0;
const step=()=>{if(id!==RUN)return;if(i>=q.length)return fin(sc,q.length,scr);const x=q[i],t=x.w.replace(/\s/g,"").toLowerCase();let L=shuf([...t]);if(t.length>1)while(L.join("")===t)L=shuf(L);const p=[];
const draw=()=>{const full=p.length===t.length,ok=p.map(j=>L[j]).join("")===t;
R(hdr(i,q.length)+`<div class="clue">${clue(x)}</div><div class="letters">${[...t].map((_,k)=>`<button class="slot${full?(ok?" ok":" no"):""}" data-p="${k}">${p[k]!=null?esc(L[p[k]]):""}</button>`).join("")}</div><div class="letters">${L.map((c,k)=>`<button data-k="${k}" ${p.includes(k)?"disabled":""}>${esc(c)}</button>`).join("")}</div><div class="row" style="justify-content:center"><button id="sp">🔊</button><button id="sk">تخطي</button></div>`);
$("#sp").onclick=()=>say(x.w);$("#sk").onclick=()=>{grade(x,false);i++;step()};
if(full){grade(x,ok);if(ok)sc++;say(x.w);i++;setTimeout(step,900);return}
$$("[data-k]").forEach(b=>b.onclick=()=>{p.push(+b.dataset.k);draw()});$$("[data-p]").forEach(b=>b.onclick=()=>{const k=+b.dataset.p;if(k<p.length){p.splice(k,1);draw()}})};draw()};step()}

function mem(){const s=pool(6);if(s.length<2)return need(2);const id=RUN;let cs=shuf(s.flatMap(x=>[{x,t:0},{x,t:1}])),op=[],f=0,tr=0;
const draw=()=>{if(id!==RUN)return;R(hdr(f,s.length)+`<p class="hint">محاولات: ${tr} — طابق الكلمة مع صورتها/معناها</p><div class="grid">${cs.map((c,k)=>`<button data-k="${k}" class="${c.g?"gone":c.o?"":"hid"}">${c.t?clue(c.x):`<b dir="ltr">${esc(c.x.w)}</b>`}</button>`).join("")}</div>`);
$$("[data-k]").forEach(b=>b.onclick=()=>{const c=cs[b.dataset.k];if(c.o||c.g||op.length>1)return;c.o=1;op.push(c);if(!c.t)say(c.x.w);draw();
if(op.length===2){tr++;const[a,b2]=op;if(a.x===b2.x&&a.t!==b2.t){a.g=b2.g=1;f++;grade(a.x,true);op=[];setTimeout(()=>f===s.length?fin(s.length,tr,mem):draw(),500)}else setTimeout(()=>{a.o=b2.o=0;op=[];draw()},900)}})};draw()}

function hang(){const q=pool(10,x=>/^[a-z]+$/i.test(x.w));if(!q.length)return need(1);const id=RUN;let i=0,sc=0;
const step=()=>{if(id!==RUN)return;if(i>=q.length)return fin(sc,q.length,hang);const x=q[i],w=x.w.toLowerCase(),g=new Set();let l=6;
const draw=()=>{const won=[...w].every(c=>g.has(c)),lost=l<=0;
R(hdr(i,q.length)+`<div class="clue">${clue(x)}</div><div class="w" style="letter-spacing:4px">${[...w].map(c=>g.has(c)||lost?c:"_").join(" ")}</div><p>${"❤️".repeat(l)}${"🖤".repeat(6-l)}</p><div class="kb">${[..."abcdefghijklmnopqrstuvwxyz"].map(c=>`<button ${g.has(c)||won||lost?"disabled":""}>${c}</button>`).join("")}</div>`);
if(won||lost){grade(x,won&&l>=3);if(won)sc++;say(x.w);i++;setTimeout(step,1400);return}
$$(".kb button").forEach(b=>b.onclick=()=>{const c=b.textContent;g.add(c);if(!w.includes(c))l--;draw()})};draw()};step()}

function talk(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){R(hdr(0,1)+`<p class="hint">المتصفح ده مش بيدعم التعرف على الصوت. جرّب Chrome.</p>`);return}
const q=pool(8);if(!q.length)return need(1);const id=RUN;let i=0,sc=0;
const step=()=>{if(id!==RUN)return;if(i>=q.length)return fin(sc,q.length,talk);const x=q[i];
R(hdr(i,q.length)+`<div class="clue">${clue(x)}</div><div class="w">${esc(x.w)}</div><div class="row" style="justify-content:center"><button id="sp">🔊 اسمع</button><button class="p" id="mic">🎤 انطق</button></div><div id="fb" class="clue"></div>`);
$("#sp").onclick=()=>say(x.w);$("#mic").onclick=()=>{const r=new SR();r.lang="en-US";$("#fb").textContent="🎙️ بسمعك...";
r.onresult=e=>{const h=e.results[0][0].transcript.toLowerCase(),ok=h.includes(x.w.toLowerCase());if(ok)sc++;grade(x,ok);$("#fb").innerHTML=`<span dir="ltr" style="color:var(${ok?"--ok":"--no"})">${ok?"✓":"✗"} ${esc(h)}</span>`;i++;setTimeout(step,1500)};
r.onerror=()=>{$("#fb").textContent="مسمعتش كويس، جرّب تاني"};try{r.start()}catch(e){}}};step()}

const MODES=[
["🃏","مراجعة ذكية","تكرار متباعد (SRS)",cards],
["❓","اختار الكلمة","من الصورة أو المعنى",()=>mc({q:clue,o:x=>x.w})],
["🔤","اختار المعنى","من الكلمة للمعنى",()=>mc({q:x=>`<div class="w">${esc(x.w)}</div>`,o:x=>x.m,f:x=>x.m,ar:1,say:1})],
["⌨️","إملاء","اكتب الكلمة",()=>ty({q:clue})],
["🎧","استماع","اسمع واكتب",()=>ty({q:()=>"🎧 اسمع الكلمة واكتبها",say:1})],
["🧩","أكمل الجملة","من المثال أو التعريف",()=>ty({q:blank})],
["🔀","ترتيب حروف","رتّب الحروف",scr],
["🧠","تطابق","لعبة الذاكرة",mem],
["🪢","هانج مان","خمّن الحروف",hang],
["⚡","تحدي السرعة","60 ثانية",()=>mc({q:clue,o:x=>x.w,sec:60})],
["🎤","نطق","انطق وهنسمعك",talk]];
function show(v){RUN++;clearInterval(T);["home","words","play"].forEach(k=>$("#"+k).hidden=k!==v);$$("nav button").forEach(b=>b.classList.toggle("on",b.dataset.v===(v==="play"?"home":v)));if(v==="home")home();if(v==="words")list();window.scrollTo(0,0)}
function home(){const t=today(),w=D.words,due=w.filter(x=>(x.due||0)<=t).length,ms=w.filter(x=>(x.box||0)>=4).length,s=D.last>=t-1?D.streak:0,n=Math.min(D.day===t?D.n:0,20);
$("#home").innerHTML=`<div class="stats">${[["📖",w.length,"كلمة"],["⏰",due,"للمراجعة"],["🏆",ms,"متقنة"],["🔥",s,"أيام"],["⭐",(D.xp/100|0)+1,"المستوى"]].map(a=>`<div><span>${a[0]}</span><b>${a[1]}</b><small>${a[2]}</small></div>`).join("")}</div>
<div class="box"><small>هدف اليوم: ${n} / 20 إجابة</small><div class="top" style="margin:6px 0 0"><div class="bar"><i style="width:${n*5}%"></i></div></div></div>
<div class="modes">${MODES.map((m,k)=>`<button data-k="${k}"><span>${m[0]}</span><b>${m[1]}</b><small>${m[2]}</small></button>`).join("")}</div>${w.length?"":`<p class="hint">ابدأ بإضافة كلماتك من تبويب «كلماتي».</p>`}`;
$$(".modes button").forEach(b=>b.onclick=()=>{show("play");MODES[b.dataset.k][3]()})}
const msg=t=>$("#msg").textContent=t;
function list(){const q=$("#sq").value.toLowerCase();$("#list").innerHTML=D.words.map((x,i)=>({x,i})).filter(o=>!q||o.x.w.toLowerCase().includes(q)||(o.x.m||"").includes(q)).map(({x,i})=>
`<div class="wr"><div class="th">${x.img?`<img src="${esc(x.img)}" alt="">`:x.e||"🔤"}</div><div class="wi"><b dir="ltr">${esc(x.w)}</b><small>${esc(x.m)}</small><div class="lv">${"●".repeat(x.box||0)}${"○".repeat(6-(x.box||0))}</div></div><button data-a="s" data-i="${i}">🔊</button><button data-a="e" data-i="${i}">✏️</button><button data-a="d" data-i="${i}">🗑️</button></div>`).join("")||`<p class="hint">مفيش كلمات لسه.</p>`;
$$("#list img").forEach(i=>i.onerror=()=>i.remove())}
$("#list").onclick=e=>{const b=e.target.closest("button");if(!b)return;const x=D.words[b.dataset.i];
if(b.dataset.a==="s")say(x.w);if(b.dataset.a==="d"){D.words.splice(b.dataset.i,1);save();list()}
if(b.dataset.a==="e"){const m=prompt("المعنى:",x.m||"");if(m!==null)x.m=m.trim();const s=prompt("جملة مثال:",x.ex||"");if(s!==null)x.ex=s.trim();save();list()}};
$("#sq").oninput=list;
$("#add").onclick=()=>{const a=parse($("#inp").value);if(a.length){addWords(a);$("#inp").value=""}};
let sure=0;$("#clr").onclick=()=>{if(!sure){sure=1;$("#clr").textContent="⚠️ اضغط تاني للتأكيد";setTimeout(()=>{sure=0;$("#clr").textContent="🗑️ مسح الكل"},3000)}else{D.words=[];sure=0;$("#clr").textContent="🗑️ مسح الكل";save();list()}};
$("#file").onclick=()=>$("#f").click();
$("#f").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const t=String(r.result);try{if(/\.json$/i.test(f.name)){const j=JSON.parse(t);if(j.words){D=Object.assign(D,j);save();list();msg("تم استرجاع النسخة الاحتياطية ✓");return}if(Array.isArray(j)){addWords(j.map(x=>typeof x==="string"?parse(x)[0]:{w:x.w||x.word,m:x.m||x.meaning||"",ex:x.ex||"",d:"",e:emo(x.w||x.word||""),img:"",box:0,due:0,ok:0,bad:0}));return}}addWords(parse(t))}catch(er){msg("الملف مش بصيغة صحيحة")}e.target.value=""};r.readAsText(f)};
$("#exp").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(D)],{type:"application/json"}));a.download="word-trainer-backup.json";a.click()};
async function auto(img){const t=D.words.filter(x=>img?!x.img:(!x.m||!x.d));if(!t.length){msg("كل الكلمات مكتملة ✓");return}let n=0,got=0;
for(const x of t){msg(`جاري المعالجة ${++n}/${t.length}: ${x.w}`);
try{if(img){const r=await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/"+encodeURIComponent(x.w.replace(/ /g,"_")));if(r.ok){const j=await r.json();if(j.thumbnail&&j.type==="standard"){x.img=j.thumbnail.source;got++}}}
else{if(!x.m){const r=await fetch("https://api.mymemory.translated.net/get?langpair=en|ar&q="+encodeURIComponent(x.w));const j=await r.json();x.m=j.responseData.translatedText;got++}
if(!x.d||!x.ex){const r=await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+encodeURIComponent(x.w));if(r.ok){const j=await r.json(),df=j[0].meanings[0].definitions[0];x.d=x.d||df.definition||"";x.ex=x.ex||df.example||"";got++}}}}catch(e){}
save();list()}
msg(got?`خلص ✓ (${got} تحديث)`:"مفيش نتائج — لازم الصفحة تشتغل أونلاين (مثلاً على GitHub Pages) والإنترنت شغال.")}
$("#auto").onclick=()=>auto(0);$("#imgs").onclick=()=>auto(1);
$$("nav button").forEach(b=>b.onclick=()=>show(b.dataset.v));
show("home");
