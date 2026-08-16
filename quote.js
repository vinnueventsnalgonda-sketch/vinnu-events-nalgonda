(()=>{
  const $=id=>document.getElementById(id);
  const form=$('quoteForm');
  const date=$('quoteDate');
  const status=$('quoteStatus');

  if(date){
    const now=new Date();
    const y=now.getFullYear();
    const m=String(now.getMonth()+1).padStart(2,'0');
    const d=String(now.getDate()).padStart(2,'0');
    date.min=`${y}-${m}-${d}`;
  }

  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        return;
      }

      const value=id=>($(id)?.value||'').trim();
      const rawDate=value('quoteDate');
      let eventDate=rawDate;
      if(rawDate){
        try{eventDate=new Date(`${rawDate}T00:00:00`).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}catch(_){eventDate=rawDate}
      }

      const lines=[
        'Hello Vinnu Events 👋',
        'I would like to enquire about an event.',
        '',
        `Name: ${value('quoteName')}`,
        `Phone: ${value('quotePhone')}`,
        `Event: ${value('quoteEvent')}`,
        `Date: ${eventDate||'Not decided yet'}`,
        `Location: ${value('quoteLocation')}`,
        `Guest Count: ${value('quoteGuests')||'Not specified'}`,
        `Budget: ${value('quoteBudget')||'Not specified'}`,
        `Message: ${value('quoteMessage')||'No additional message'}`
      ];

      const url=`https://wa.me/917032660489?text=${encodeURIComponent(lines.join('\n'))}`;
      if(status)status.textContent='Opening WhatsApp with your event details…';
      const opened=window.open(url,'_blank','noopener,noreferrer');
      if(!opened)window.location.href=url;
    });
  }

  const items=[...document.querySelectorAll('.final-reveal')];
  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce||!('IntersectionObserver'in window)){
    items.forEach(el=>el.classList.add('final-in-view'));
    return;
  }

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('final-in-view');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -5% 0px'});
  items.forEach(el=>observer.observe(el));
})();

(()=>{const s=document.createElement('script');s.src='/offers.js?v=2';s.defer=true;document.body.appendChild(s)})();