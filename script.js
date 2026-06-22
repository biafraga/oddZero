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
   CARROSSEL
═══════════════════════════════ */
const track  = document.getElementById('ctrack');
const wrap   = document.getElementById('cwrap');
const dotsEl = document.getElementById('cdots');

let cards    = Array.from(track.children);
let idx      = 0;
let dragging = false;
let startX   = 0;

const visN = () => Math.max(1, Math.floor(wrap.offsetWidth / (320 + 14)));

function buildDots() {
  dotsEl.innerHTML = '';
  const total = Math.max(1, cards.filter(c => c.style.display !== 'none').length - visN() + 1);
  for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' on' : '');
    d.onclick = () => goTo(i);
    dotsEl.appendChild(d);
  }
}

function goTo(i) {
  const vis = cards.filter(c => c.style.display !== 'none');
  const max = Math.max(0, vis.length - visN());
  idx = Math.max(0, Math.min(i, max));
  track.style.transform = `translateX(-${idx * (320 + 14)}px)`;
  document.querySelectorAll('.dot').forEach((d, j) => d.classList.toggle('on', j === idx));
}

buildDots();

// Drag com mouse
wrap.addEventListener('mousedown', e => {
  dragging = true;
  startX = e.pageX;
  wrap.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', e => {
  if (!dragging) return;
  const dx = e.pageX - startX;
  if (Math.abs(dx) > 40) dx < 0 ? goTo(idx + 1) : goTo(idx - 1);
  dragging = false;
  wrap.style.cursor = 'grab';
});

// Swipe touch
let tx = 0;
wrap.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
wrap.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx) > 40) dx < 0 ? goTo(idx + 1) : goTo(idx - 1);
});

/* ═══════════════════════════════
   FILTROS DOS CARDS
═══════════════════════════════ */
function filterCards(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  idx = 0;

  cards.forEach(c => { c.style.display = cat === 'todos' ? 'block' : 'none'; });
  if (cat !== 'todos') {
    cards.forEach(c => { if (c.dataset.cat === cat) c.style.display = 'block'; });
  }

  track.style.transform = 'translateX(0)';
  buildDots();
}

/* ═══════════════════════════════
   BARRAS RTP — ANIMATE ON SCROLL
═══════════════════════════════ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => document.getElementById('rb-green').style.width = '95%', 200);
      setTimeout(() => document.getElementById('rb-red').style.width   = '5%',  500);
    }
  });
}, { threshold: .3 });

const rtpEl = document.querySelector('.rtp-visual');
if (rtpEl) observer.observe(rtpEl);

/* ═══════════════════════════════
   SIMULADOR
═══════════════════════════════ */
function calcSim() {
  const r = parseFloat(document.getElementById('s-renda').value)  || 1412;
  const a = parseFloat(document.getElementById('s-aposta').value) || 150;
  const m = parseInt(document.getElementById('s-meses').value)    || 6;

  const perda = Math.round(a * 0.95 * m);  // RTP 95% — 5% vai pra banca
  const perc  = (a / r * 100).toFixed(1);
  const pass  = Math.round(perda / 4.4);
  const hrs   = Math.round(perda / (r / 220));

  document.getElementById('rm-total').textContent = 'R$ ' + perda.toLocaleString('pt-BR');
  document.getElementById('rm-perc').textContent  = perc + '%';
  document.getElementById('rm-pass').textContent  = pass;
  document.getElementById('rm-hrs').textContent   = hrs + 'h';
  document.getElementById('cf-val').textContent   = 'Cofrinho: R$ ' + perda.toLocaleString('pt-BR');
}

/* ═══════════════════════════════
   COMPARTILHAR NO WHATSAPP
═══════════════════════════════ */
const shareTexts = [
  '30% dos jovens de 16-24 já apostaram online. Loot boxes normalizam o azar desde cedo. | OddZero',
  'R$3 bilhões do Bolsa Família foram para bets em agosto de 2024. | OddZero',
  'Near-miss: o "quase" libera mais dopamina que ganhar. A próxima aposta sobe 40%. | OddZero',
  '62% apostam achando que vão ganhar dinheiro. O influencer usa conta demo infinita. | OddZero',
  'RTP 95%: R$50 garantidos pra banca a cada R$1.000. Antes de qualquer rodada. | OddZero',
  '10,8 milhões de brasileiros com comportamento de risco. 55% dos jovens apostadores têm dependência. | OddZero',
];

function shareCard(i) {
  window.open('https://wa.me/?text=' + encodeURIComponent(shareTexts[i] + '\noddzero.com.br'), '_blank');
}

/* ═══════════════════════════════
   MODAL EXPANDIDO
═══════════════════════════════ */
const modalData = [
  {
    color: '#FF6B1A',
    stat: '30%',
    title: 'dos jovens de 16–24 já apostaram online',
    filter: 'jovens & jogos',
    img: 'imagens/card1.jpg',
    pos: '30% center',
    exp: '<strong>Por que jovens são o público mais vulnerável?</strong> Segundo o Datafolha (2024), 30% dos brasileiros entre 16 e 24 anos já apostaram online. Loot boxes em jogos como FIFA e Fortnite normalizam a mecânica do azar desde cedo, criando familiaridade com o risco antes mesmo de uma aposta formal.',
    extra: [
      { n: '55%',  c: '#E8320A', l: 'dos jovens apostadores',   d: 'apresentam comportamento de dependência (LENAD III, 2023)' },
      { n: '43%',  c: '#FF6B1A', l: 'dos apostadores brasileiros', d: 'preocupados com golpes de identidade nas plataformas (Serasa, 2024)' },
    ],
    src: 'Datafolha 2024 · LENAD III 2023',
  },
  {
    color: '#FF6B1A',
    stat: 'R$3bi',
    title: 'do Bolsa Família apostados em agosto de 2024',
    filter: 'impacto financeiro',
    img: 'imagens/card2.png',
    exp: '<strong>Dinheiro de subsistência virou capital para as bets.</strong> Em agosto de 2024, o Banco Central identificou que beneficiários gastaram R$3 bilhões em apostas digitais em um único mês. A facilidade do Pix eliminou qualquer barreira entre receber o benefício e apostar.',
    extra: [
      { n: '18%',    c: '#E8320A', l: 'da renda mensal',       d: 'comprometida em apostas pelas famílias de baixa renda' },
      { n: 'R$38bi', c: '#FF6B1A', l: 'custo social estimado', d: 'suicídios, depressão e perda de qualidade de vida (IEPS)' },
    ],
    src: 'Banco Central do Brasil · IEPS',
  },
  {
    color: '#FF6B1A',
    stat: 'Aposta 40%',
    title: 'maior após quase ganhar',
    filter: 'psicologia',
    img: 'imagens/card3.png',
    exp: '<strong>O "quase" é mais viciante do que ganhar.</strong> Pesquisadores de Cambridge (Clark et al., 2009) mostraram via neuroimagem que uma quase-vitória ativa o núcleo accumbens de forma similar a uma vitória real. A diferença: o "quase" gera compulsão de repetir, não satisfação.',
    extra: [
      { n: '100x',   c: '#E8320A', l: 'estímulo dopaminérgico', d: 'Um estímulo aditivo ativa o sistema de recompensa com intensidade 100 vs 10 de uma situação normal' },
      { n: '40–60%', c: '#FF6B1A', l: 'dos pacientes',          d: 'com transtorno do jogo podem apresentar ideação suicida (Nayana Holanda)' },
    ],
    src: 'Clark et al. (2009) · Neuron · BBC Brasil',
  },
  {
    color: '#FF6B1A',
    stat: '62% apostam',
    title: 'para tentar ganhar dinheiro de verdade',
    filter: 'influencers',
    img: 'imagens/card4.png',
    exp: '<strong>A conta demo é o maior golpe do marketing das bets.</strong> Influencers recebem contas com saldo fictício que nunca esgota. Os prints e vídeos de lucro são publicidade enganosa — ponto central da CPI das Bets em 2024. O seguidor aposta com dinheiro real acreditando no cenário falso.',
    extra: [
      { n: '22%',    c: '#E8320A', l: 'dos apostadores',          d: 'veem bets como investimento real — não entretenimento' },
      { n: 'R$280M', c: '#FF6B1A', l: 'anuais pagos por patrocínio', d: 'custeados pelas perdas dos apostadores' },
    ],
    src: 'CPI das Bets 2024 · Pesquisa do grupo',
  },
  {
    color: '#FF6B1A',
    stat: 'R$50',
    title: 'garantidos pra banca a cada R$1.000 apostados',
    filter: 'probabilidade',
    img: 'imagens/card5.jpeg',
    exp: '<strong>O lucro da banca é programado antes do primeiro jogo.</strong> RTP (Return to Player) é configurado no código da plataforma — no Brasil varia entre 88% e 97%. Com RTP 95%, de cada R$1.000 apostados, R$50 são da casa automaticamente. Não importa estratégia ou horário.',
    extra: [
      { n: '6,7%', c: '#E8320A', l: 'chance real numa múltipla de 3 jogos', d: 'Odd 15x = 1 chance em 15. A banca calculou antes de você.' },
      { n: '187',  c: '#FF6B1A', l: 'plataformas autorizadas no Brasil',    d: 'todas operando com margem da casa entre 2% e 10% (Lei 14.790/2023)' },
    ],
    src: 'Lei 14.790/2023 · Secretaria de Prêmios e Apostas',
  },
  {
    color: '#FF6B1A',
    stat: '10,8 Milhões',
    title: 'de brasileiros com comportamento de risco',
    filter: 'vício & dependência',
    img: 'imagens/card6.png',
    exp: '<strong>O transtorno do jogo é reconhecido como vício comportamental pela psiquiatria.</strong> Segundo Hermano Tavares (USP), o sistema de gratificação fica hipersensibilizado — a pessoa perde capacidade de planejar e busca apenas experiências altamente dopaminérgicas.',
    extra: [
      { n: '40–60%', c: '#E8320A', l: 'dos pacientes',             d: 'podem apresentar ideação suicida ao longo da vida (Nayana Holanda, G1)' },
      { n: '55%',    c: '#FF6B1A', l: 'dos menores que apostaram', d: 'apresentaram comportamento de dependência (LENAD III, 2023)' },
    ],
    src: 'BBC Brasil · G1 · Hermano Tavares USP',
  },
];

function openModal(i) {
  const d  = modalData[i];
  const ov = document.getElementById('overlay');
  const mo = document.getElementById('modal');

  mo.innerHTML = `
    <div style="position:relative; display:flex; flex-direction:column; min-height:460px;">
      <img src="${d.img}" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:${d.pos || 'center'}; opacity:.6; filter:grayscale(20%); z-index:1;">
      <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,.4) 60%, rgba(10,10,10,0) 100%); z-index:2;"></div>
      
      <div style="position:relative; z-index:3; display:flex; flex-direction:column; padding:32px 24px; height:100%; box-sizing:border-box;">
        
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <span style="font-family:var(--font-m); font-size:10px; letter-spacing:.08em; text-transform:uppercase; color:rgba(240,237,230,.6); background:rgba(10,10,10,.6); padding:4px 8px; border-radius:4px;">${d.filter}</span>
          <button onclick="closeModal()" style="width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,.1); border:none; color:var(--white); cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; font-weight:700;">✕</button>
        </div>
        
        <div style="margin-top:auto; display:flex; flex-direction:column; align-items:flex-start; gap:12px;">
          <div style="font-family:var(--font-h); font-size:clamp(32px, 4vw, 42px); font-weight:900; line-height:1; letter-spacing:-.02em; text-transform:uppercase; color:var(--white);">${d.stat}</div>
          <div style="background:${d.color}; color:#0A0A0A; font-family:var(--font-h); font-size:15px; font-weight:800; text-transform:uppercase; padding:6px 12px; border-radius:5px; line-height:1.2;">${d.title}</div>
        </div>

      </div>
    </div>

    <div style="background:#111; padding:28px; overflow-y:auto; display:flex; flex-direction:column; gap:18px;">
      <div>
        <div style="font-family:var(--font-m); font-size:9px; letter-spacing:.12em; text-transform:uppercase; color:var(--red); margin-bottom:6px;">O que isso significa</div>
        <p style="font-size:13px; line-height:1.75; color:rgba(240,237,230,.7);">${d.exp}</p>
      </div>
      <div style="height:1px; background:#2a2a2a;"></div>
      <div>
        <div style="font-family:var(--font-m); font-size:9px; letter-spacing:.12em; text-transform:uppercase; color:var(--red); margin-bottom:10px;">Mais dados</div>
        ${d.extra.map(e => `
          <div style="background:#1a1a1a; border-radius:10px; padding:12px 14px; display:flex; align-items:center; gap:12px; margin-bottom:8px;">
            <div style="font-family:var(--font-h); font-size:26px; font-weight:900; color:${e.c}; flex-shrink:0; line-height:1;">${e.n}</div>
            <div>
              <div style="font-size:12px; font-weight:600; color:var(--white); margin-bottom:2px;">${e.l}</div>
              <div style="font-size:11px; color:rgba(240,237,230,.5); line-height:1.4;">${e.d}</div>
            </div>
          </div>`).join('')}
      </div>
      <div style="height:1px; background:#2a2a2a;"></div>
      <div style="font-family:var(--font-m); font-size:10px; color:rgba(240,237,230,.3);">${d.src}</div>
      <div style="display:flex; gap:8px;">
        <button onclick="shareCard(${i})" style="flex:1; padding:10px; border-radius:10px; background:transparent; border:1px solid #2a2a2a; color:rgba(240,237,230,.6); font-size:12px; font-weight:600; cursor:pointer; font-family:var(--font-b);">📲 WhatsApp</button>
      </div>
    </div>`;

  ov.style.opacity      = '1';
  ov.style.pointerEvents = 'all';
  mo.style.transform    = 'scale(1) translateY(0)';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const ov = document.getElementById('overlay');
  const mo = document.getElementById('modal');
  ov.style.opacity      = '0';
  ov.style.pointerEvents = 'none';
  mo.style.transform    = 'scale(.94) translateY(16px)';
  document.body.style.overflow = '';
}

// Fechar clicando fora ou ESC
document.getElementById('overlay').addEventListener('click', e => {
  if (e.target.id === 'overlay') closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
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
