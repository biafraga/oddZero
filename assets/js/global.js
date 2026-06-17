/* ═══════════════════════════════
   MENU COM FUNDO DINÂMICO
═══════════════════════════════ */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

/* ═══════════════════════════════
   CURSOR CUSTOMIZADO
═══════════════════════════════ */
const cur = document.getElementById('cur');

document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top  = e.clientY + 'px';
});

document.querySelectorAll('button, a, .photo-card, .filter-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('big'));
  el.addEventListener('mouseleave', () => cur.classList.remove('big'));
});

/* ═══════════════════════════════
   MENU MOBILE
═══════════════════════════════ */
const mobileBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-links');

if (mobileBtn && navMenu) {
  mobileBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Troca o ícone de hamburguer pelo X animado
    if(navMenu.classList.contains('active')) {
       mobileBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';
    } else {
       mobileBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    }
  });

  // Fecha o menu automaticamente quando clicar em algum link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    });
  });
}