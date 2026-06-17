/* ═══════════════════════════════
   LÓGICA DO FÓRUM
═══════════════════════════════ */
const EMOJIS = ['🦊','🐢','🦋','🐻','🦁','🐺','🦝','🦉'];
const COLORS = ['#FF8FA3','#C8F135','#A8D8FF','#FFD6A5','#CAFFBF','#BDB2FF'];

let posts = [
  {id:'s1', name:'Raposa Anônima', emoji:'🦊', color:'#FF8FA3', text:'Comecei apostando R$20 por semana. Achei que era lazer. Em 4 meses estava escondendo o extrato bancário. O Aviator parecia que ia pagar qualquer hora. Quando percebi, tinha perdido R$34 mil e devia para família e amigos.', tag:'Dívidas', time:'há 2 dias', likes:34, liked:false},
  {id:'s2', name:'Tartaruga Verde', emoji:'🐢', color:'#C8F135', text:'Meu pai perdeu o FGTS em bets. Ele tem 54 anos e os influencers que ele via no YouTube pareciam especialistas de verdade. Só descobrimos quando ele pediu dinheiro emprestado pela terceira vez no mês.', tag:'Família', time:'há 5 dias', likes:61, liked:false},
  {id:'s3', name:'Borboleta Azul', emoji:'🦋', color:'#A8D8FF', text:'Fui ao psicólogo por ansiedade e só na terceira sessão percebi que era relacionada às apostas. A sensação de esperar o resultado é viciante de um jeito que eu não entendia. Faz 6 meses que não aposto.', tag:'Superação', time:'há 1 semana', likes:89, liked:false},
];

let activeFilter = 'todos';
let selectedTag = null;

function timeAgo(ts) {
  if(typeof ts === 'string') return ts;
  const d = (Date.now() - ts) / 1000;
  if(d < 60) return 'agora mesmo';
  if(d < 3600) return `há ${Math.floor(d/60)}min`;
  if(d < 86400) return `há ${Math.floor(d/3600)}h`;
  return `há ${Math.floor(d/86400)}d`;
}

function esc(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
}

function renderFeed() {
  const feed = document.getElementById('feed');
  feed.querySelectorAll('.card').forEach(c => c.remove());
  
  const f = activeFilter === 'todos' ? posts : posts.filter(p => p.tag === activeFilter);
  document.getElementById('emptyState').style.display = f.length === 0 ? 'block' : 'none';
  
  f.forEach((p, i) => feed.appendChild(buildCard(p, i)));
  document.getElementById('countLabel').textContent = `${posts.length} relato${posts.length !== 1 ? 's' : ''}`;
}

function buildCard(p, delay) {
  const long = p.text.length > 280;
  const c = document.createElement('div');
  c.className = 'card';
  c.style.animationDelay = `${delay * 0.07}s`;
  
  c.innerHTML = `
    <div class="card-header">
      <div class="avatar" style="background:${p.color}; color:#0A0A0A;">${p.emoji}</div>
      <div class="author-info">
        <div class="author-name">${p.name}</div>
        <div class="author-meta">
          <span class="post-time">${timeAgo(p.time)}</span>
          ${p.tag ? `<span class="tag-chip tag-${p.tag}">${p.tag}</span>` : ''}
        </div>
      </div>
    </div>
    <div class="card-body ${long ? 'truncated' : ''}" id="body-${p.id}">${esc(p.text)}</div>
    ${long ? `<button class="read-more" id="rm-${p.id}">Ler relato completo ↓</button>` : ''}
    <div class="card-footer">
      <div class="safe-label">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Ambiente Seguro
      </div>
      <button class="like-btn ${p.liked ? 'liked' : ''}" data-id="${p.id}">
        <svg viewBox="0 0 24 24" fill="${p.liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        Apoiar (${p.likes})
      </button>
    </div>`;
    
  if(long) {
    let ex = false;
    const rm = c.querySelector(`#rm-${p.id}`);
    const bd = c.querySelector(`#body-${p.id}`);
    rm.addEventListener('click', () => {
      ex = !ex;
      bd.classList.toggle('truncated', !ex);
      rm.textContent = ex ? 'Ocultar texto ↑' : 'Ler relato completo ↓';
    });
  }
  
  c.querySelector('.like-btn').addEventListener('click', e => toggleLike(p.id, e.currentTarget));
  return c;
}

function toggleLike(id, btn) {
  const p = posts.find(x => x.id === id);
  if(!p) return;
  p.liked = !p.liked;
  p.likes += p.liked ? 1 : -1;
  btn.classList.toggle('liked', p.liked);
  
  // Atualiza o botão mantendo o ícone de coração e pintando se estiver curtido
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="${p.liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
    Apoiar (${p.likes})
  `;
}

// Filtros
document.querySelectorAll('.pill').forEach(p => {
  p.addEventListener('click', () => {
    document.querySelectorAll('.pill').forEach(x => x.classList.remove('active'));
    p.classList.add('active');
    activeFilter = p.dataset.filter;
    renderFeed();
  });
});

// Modal Actions
function openModal() {
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('textInput').addEventListener('input', () => {
  const len = document.getElementById('textInput').value.length;
  document.getElementById('charCounter').textContent = `${len} / 1500`;
  validateForm();
});

document.getElementById('nameInput').addEventListener('input', validateForm);

function validateForm() {
  const name = document.getElementById('nameInput').value.trim();
  const text = document.getElementById('textInput').value.trim();
  document.getElementById('submitBtn').disabled = !(name.length >= 2 && text.length >= 20);
}

document.querySelectorAll('.tag-option').forEach(o => {
  o.addEventListener('click', () => {
    const isSelected = o.classList.contains('selected');
    document.querySelectorAll('.tag-option').forEach(x => x.classList.remove('selected'));
    if(!isSelected) {
      o.classList.add('selected');
      selectedTag = o.dataset.tag;
    } else {
      selectedTag = null;
    }
  });
});

document.getElementById('submitBtn').addEventListener('click', () => {
  const name = document.getElementById('nameInput').value.trim();
  const text = document.getElementById('textInput').value.trim();
  if(!name || text.length < 20) return;
  
  const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  
  posts.unshift({
    id: 'u' + Date.now(),
    name, emoji, color, text,
    tag: selectedTag || 'Outro',
    time: Date.now(),
    likes: 0, liked: false
  });
  
  closeModal();
  document.getElementById('nameInput').value = '';
  document.getElementById('textInput').value = '';
  document.querySelectorAll('.tag-option').forEach(x => x.classList.remove('selected'));
  selectedTag = null;
  document.getElementById('submitBtn').disabled = true;
  document.getElementById('charCounter').textContent = '0 / 1500';
  
  activeFilter = 'todos';
  document.querySelectorAll('.pill').forEach(x => {
    x.classList.toggle('active', x.dataset.filter === 'todos');
  });
  
  renderFeed();
  
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
});

// Start
renderFeed();