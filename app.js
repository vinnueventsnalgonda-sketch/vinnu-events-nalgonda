const API='https://tglsxxbgcmozqcgytwch.supabase.co/functions/v1/vinnu-admin-api';
const events=[
  ['🎂','Birthday Parties','birthday','Theme birthdays, balloon styling, cake areas, welcome boards and custom celebration setups.'],
  ['👶','Baby & Naming','baby','Baby shower, naming ceremony, cradle ceremony, welcome baby and family celebration decor.'],
  ['💗','Surprises','surprises','Birthday surprises, anniversaries, proposals, room setups and special reaction moments.'],
  ['🪔','Haldi & Mehendi','haldi-mehendi','Traditional and modern haldi and mehendi stages, floral styling, seating and photo areas.'],
  ['💍','Engagements','engagements','Ring ceremony stages, entrances, floral backdrops, welcome boards and couple-focused styling.'],
  ['👰','Weddings','weddings','Wedding and reception decor, venue planning, stage, entrance and custom concepts.'],
  ['💼','Corporate Events','corporate','Business openings, annual days, conferences, award functions, launches and employee events.'],
  ['✨','More Events','more','Housewarmings, school and college functions, cultural programs and custom celebrations.']
];
let mediaItems=[],loaded=false;
const $=id=>document.getElementById(id);
async function loadMedia(force=false){if(loaded&&!force)return;try{const r=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'list'})});const d=await r.json();if(!r.ok)throw new Error(d.error||'Unable to load media');mediaItems=d.items||[]}catch(e){console.warn(e);mediaItems=[]}finally{loaded=true;renderDemos()}}
function makeDemo(item){const card=document.createElement('article');card.className='demo-card';const v=document.createElement('video');v.src=item.public_url;v.controls=true;v.preload='metadata';v.playsInline=true;v.setAttribute('controlsList','nodownload');card.appendChild(v);const meta=document.createElement('div');meta.className='demo-meta';const b=document.createElement('b');b.textContent=item.title||'Vinnu Events Demo';const p=document.createElement('p');p.textContent=item.caption||'Event highlight';meta.append(b,p);card.appendChild(meta);return card}
function renderDemos(){const t=$('demoTrack');const demos=mediaItems.filter(x=>x.category==='demo-highlights'&&x.media_type==='video');t.innerHTML='';if(!demos.length){const e=document.createElement('div');e.className='demo-empty';e.innerHTML='<div><b>Demo Highlights</b><span>Publish videos under <strong>Demo Highlights</strong> from Admin and they will appear here automatically.</span></div>';t.appendChild(e);return}demos.forEach(x=>t.appendChild(makeDemo(x)))}
function scrollDemo(dir){const t=$('demoTrack');const card=t.querySelector('.demo-card');t.scrollBy({left:(card?card.offsetWidth+18:360)*dir,behavior:'smooth'})}
$('demoPrev').onclick=()=>scrollDemo(-1);$('demoNext').onclick=()=>scrollDemo(1);
function mediaCard(x){const c=document.createElement('div');c.className='media';let el;if(x.media_type==='video'){el=document.createElement('video');el.src=x.public_url;el.controls=true;el.preload='metadata';el.playsInline=true}else{el=document.createElement('img');el.src=x.public_url;el.alt=x.title||'Vinnu Events event photo';el.loading='lazy'}c.appendChild(el);const cap=document.createElement('div');cap.className='media-cap';const b=document.createElement('b');b.textContent=x.title||'Vinnu Events';const s=document.createElement('span');s.textContent=x.caption||'';cap.append(b,s);c.appendChild(cap);return c}
async function openCategory(ev){$('modalTitle').textContent=ev[1];$('modalText').textContent=ev[3];$('gallery').innerHTML='';$('galleryEmpty').style.display='block';$('galleryEmpty').textContent='Loading media…';$('modal').classList.add('open');await loadMedia();const items=mediaItems.filter(x=>x.category===ev[2]);$('galleryEmpty').style.display=items.length?'none':'block';if(!items.length)$('galleryEmpty').textContent='Photos and videos for this category will appear here when published from Admin.';items.forEach(x=>$('gallery').appendChild(mediaCard(x)))}
const grid=$('eventGrid');events.forEach(ev=>{const c=document.createElement('article');c.className='event-card';c.innerHTML=`<div class="event-icon">${ev[0]}</div><h3>${ev[1]}</h3><span>View gallery →</span>`;c.onclick=()=>openCategory(ev);grid.appendChild(c)});
$('close').onclick=()=>$('modal').classList.remove('open');$('modal').onclick=e=>{if(e.target===$('modal'))$('modal').classList.remove('open')};document.addEventListener('keydown',e=>{if(e.key==='Escape')$('modal').classList.remove('open')});
loadMedia();setInterval(()=>loadMedia(true),90000);
