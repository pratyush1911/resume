
// Modern glass interactions
document.addEventListener('DOMContentLoaded', ()=>{
  // Skill circles: draw animated arcs on canvas
  document.querySelectorAll('.skill-circle').forEach((el, idx) => {
    const value = parseFloat(el.getAttribute('data-value')) || 0.6;
    const size = 140;
    const cvs = document.createElement('canvas');
    cvs.width = size; cvs.height = size;
    el.prepend(cvs);
    const ctx = cvs.getContext('2d');
    const start = -Math.PI/2;
    const end = start + Math.PI * 2 * value;
    // background ring
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2 - 12, 0, Math.PI*2);
    ctx.stroke();
    // animated arc
    let progress = 0;
    const step = 0.02 + (idx*0.01);
    function draw(){
      ctx.clearRect(0,0,size,size);
      // background ring
      ctx.lineWidth = 10;
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.beginPath();
      ctx.arc(size/2, size/2, size/2 - 12, 0, Math.PI*2);
      ctx.stroke();
      // arc gradient
      const grad = ctx.createLinearGradient(0,0,size,size);
      grad.addColorStop(0,'rgba(139,92,246,0.95)');
      grad.addColorStop(1,'rgba(6,182,212,0.95)');
      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.arc(size/2, size/2, size/2 - 12, start, start + (end-start) * progress);
      ctx.stroke();
      // center text
      ctx.fillStyle = '#eaf6ff';
      ctx.font = '600 18px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.round(progress * value * 100) + '%', size/2, size/2 - 6);
      if(progress < 1){ progress += step; requestAnimationFrame(draw); }
    }
    requestAnimationFrame(draw);
  });

  // Contact form demo
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    setTimeout(()=>{
      btn.textContent = 'Sent!';
      form.reset();
      setTimeout(()=>{ btn.disabled = false; btn.textContent = 'Send Message (demo)'; }, 1400);
    }, 900);
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // Menu toggle for small screens
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  toggle.addEventListener('click', ()=> nav.classList.toggle('open'));
});
