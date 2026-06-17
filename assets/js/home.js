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
   COMPARTILHAR NO WHATSAPP
═══════════════════════════════ */
const shareTexts = [
  '30% dos jovens de 16-24 já apostaram online. Loot boxes normalizam o azar desde cedo. | OddZero',
  'R$3 bilhões do Bolsa Família foram para bets em agosto de 2024. | OddZero',
  'Near-miss: o "quase" libera mais dopamina que ganhar. A próxima aposta sobe 40%. | OddZero',
  '62% apostam achando que vão ganhar dinheiro. O influencer usa conta demo infinita. | OddZero',
  'RTP 95%: R$50 garantidos pra banca a cada R$1.000. Antes de qualquer rodada. | OddZero',
  '10,8 milhões de brasileiros com comportamento de risco. 55% dos jovens apostadores têm dependência. | OddZero',
  'O bônus de boas-vindas é uma armadilha. Com rollover de 30x, a matemática garante que você perca em dobro. | OddZero',
  'O app de aposta não é sorte. É design comportamental criado por psicólogos para te prender na tela. | OddZero',
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
    img: 'assets/imagens/home/card1.jpg',
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
    img: 'assets/imagens/home/card2.png',
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
    img: 'assets/imagens/home/card3.png',
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
    img: 'assets/imagens/home/card4.png',
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
    img: 'assets/imagens/home/card5.jpeg',
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
    img: 'assets/imagens/home/card6.png',
    exp: '<strong>O transtorno do jogo é reconhecido como vício comportamental pela psiquiatria.</strong> Segundo Hermano Tavares (USP), o sistema de gratificação fica hipersensibilizado — a pessoa perde capacidade de planejar e busca apenas experiências altamente dopaminérgicas.',
    extra: [
      { n: '40–60%', c: '#E8320A', l: 'dos pacientes',             d: 'podem apresentar ideação suicida ao longo da vida (Nayana Holanda, G1)' },
      { n: '55%',    c: '#FF6B1A', l: 'dos menores que apostaram', d: 'apresentaram comportamento de dependência (LENAD III, 2023)' },
    ],
    src: 'BBC Brasil · G1 · Hermano Tavares USP',
  },

  {
    color: '#FF6B1A',
    stat: '30x',
    title: 'de rollover no bônus "grátis"',
    filter: 'financeiro',
    img: 'assets/imagens/home/card7.png',
    exp: '<strong>Bônus de boas-vindas são armadilhas matemáticas.</strong> Um "bônus de R$300" parece atraente, mas costuma vir com um requisito oculto (rollover) de 30 vezes. Isso significa que, para poder sacar esses R$300, você é obrigado a apostar R$9.000.',
    extra: [
      { n: 'R$630', c: '#E8320A', l: 'de perda média', d: 'Nesses R$9.000 apostados, a margem da casa garante que você perca o dobro do bônus recebido.' },
      { n: '98%', c: '#FF6B1A', l: 'dos apostadores', d: 'perdem todo o saldo antes de conseguir cumprir os requisitos de saque.' },
    ],
    src: 'Análise matemática do grupo',
  },

  {
    color: '#FF6B1A',
    stat: 'Design',
    title: 'criado por psicólogos para viciar',
    filter: 'psicologia',
    img: 'assets/imagens/home/card8.png',
    exp: '<strong>O design é a verdadeira banca.</strong> Apps de apostas são desenvolvidos por equipes de psicólogos comportamentais. Sons de vitória constantes, cores vibrantes, bônus de recarga e apostas ao vivo com decisões em segundos — cada elemento explora o mesmo mecanismo neurológico que jogos de azar ativam no cérebro.',
    extra: [
      { n: 'Segundos', c: '#E8320A', l: 'de tempo de decisão', d: 'Apostas ao vivo bloqueiam a racionalidade forçando ação sob pressão do relógio.' },
      { n: '100%', c: '#FF6B1A', l: 'retenção', d: 'O objetivo da interface não é te fazer ganhar, mas sim maximizar seu tempo de tela.' },
    ],
    src: 'Análise de UX Comportamental',
  }
];

function openModal(i) {
  const d  = modalData[i];
  const ov = document.getElementById('overlay');
  const mo = document.getElementById('modal');

  // A MÁGICA QUE RESOLVE O BUG DA GUILHOTINA:
  // Obriga a grade a respeitar o tamanho do modal, destravando o scroll
  mo.style.gridTemplateRows = 'minmax(0, 1fr)';

  mo.innerHTML = `
    <div style="position:relative; width:100%; height:100%; overflow:hidden;">
      
      <img src="${d.img}" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:${d.pos || 'center'}; opacity:.9; filter:grayscale(10%); z-index:1;">
      <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,.4) 60%, rgba(10,10,10,0) 100%); z-index:2;"></div>
      
      <div style="position:absolute; inset:0; z-index:3; display:flex; flex-direction:column; justify-content:space-between; padding:32px 24px; box-sizing:border-box;">
        
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <span style="font-family:var(--font-m); font-size:10px; letter-spacing:.08em; text-transform:uppercase; color:rgba(240,237,230,.6); background:rgba(10,10,10,.6); padding:4px 8px; border-radius:4px;">${d.filter}</span>
          <button onclick="closeModal()" style="width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,.1); border:none; color:var(--white); cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; font-weight:700;">✕</button>
        </div>
        
        <div style="display:flex; flex-direction:column; align-items:flex-start; gap:12px;">
          <div style="font-family:var(--font-h); font-size:clamp(28px, 4vw, 38px); font-weight:900; line-height:1; letter-spacing:-.02em; text-transform:uppercase; color:var(--white);">${d.stat}</div>
          <div style="background:${d.color}; color:#0A0A0A; font-family:var(--font-h); font-size:14px; font-weight:800; text-transform:uppercase; padding:6px 12px; border-radius:5px; line-height:1.2;">${d.title}</div>
        </div>

      </div>
    </div>

    <div style="background:#111; padding:24px 28px; overflow-y:auto; display:flex; flex-direction:column; gap:14px; box-sizing:border-box;">
      <div>
        <div style="font-family:var(--font-m); font-size:9px; letter-spacing:.12em; text-transform:uppercase; color:var(--red); margin-bottom:6px;">O que isso significa</div>
        <p style="font-size:13px; line-height:1.5; color:rgba(240,237,230,.7); margin:0;">${d.exp}</p>
      </div>
      <div style="height:1px; background:#2a2a2a; flex-shrink:0;"></div>
      <div>
        <div style="font-family:var(--font-m); font-size:9px; letter-spacing:.12em; text-transform:uppercase; color:var(--red); margin-bottom:8px;">Mais dados</div>
        ${d.extra.map(e => `
          <div style="background:#1a1a1a; border-radius:10px; padding:10px 14px; display:flex; align-items:center; gap:12px; margin-bottom:6px;">
            <div style="font-family:var(--font-h); font-size:24px; font-weight:900; color:${e.c}; flex-shrink:0; line-height:1;">${e.n}</div>
            <div>
              <div style="font-size:12px; font-weight:600; color:var(--white); margin-bottom:2px;">${e.l}</div>
              <div style="font-size:11px; color:rgba(240,237,230,.5); line-height:1.3;">${e.d}</div>
            </div>
          </div>`).join('')}
      </div>
      <div style="height:1px; background:#2a2a2a; flex-shrink:0;"></div>
      
      <div style="margin-top:auto; display:flex; flex-direction:column; gap:10px;">
        <div style="font-family:var(--font-m); font-size:10px; color:rgba(240,237,230,.3);">${d.src}</div>
        <div style="display:flex; gap:8px;">
          <button onclick="shareCard(${i})" style="flex:1; padding:10px; border-radius:10px; background:transparent; border:1px solid #2a2a2a; color:rgba(240,237,230,.8); font-size:13px; font-weight:600; cursor:pointer; font-family:var(--font-b); display:flex; align-items:center; justify-content:center; gap:8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Compartilhar
          </button>
        </div>
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

