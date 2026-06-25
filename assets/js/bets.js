/* ═══════════════════════════════
   BANCO DE DADOS DOSSIÊ DAS BETS
═══════════════════════════════ */
const betDossiers = {

'bet365': {
  name: 'bet365',
  logo: 'assets/imagens/bets/bet365.png',
  origin: 'Reino Unido. A bet365 nasceu em Stoke-on-Trent, nos anos 2000, a partir da transformação de uma operação familiar de apostas físicas em uma das maiores plataformas digitais do setor. A figura central dessa virada é Denise Coates, empresária britânica que levou o negócio para a internet e transformou a marca em uma operação global.',
  operation: 'O ponto central da bet365 não é apenas oferecer apostas, mas operar uma infraestrutura tecnológica de alta escala. A plataforma trabalha com uma enorme variedade de mercados, apostas ao vivo e atualização constante de odds. Para o usuário, isso cria a sensação de que sempre existe uma nova oportunidade acontecendo. Para a casa, significa volume, velocidade e controle matemático sobre cada cotação oferecida.',
  marketing: 'A estratégia da bet365 é menos dependente de microinfluenciadores e mais baseada em presença massiva: mídia esportiva, patrocínios, anúncios durante jogos e reconhecimento global de marca. O risco está justamente nessa normalização. Quando a marca aparece junto do esporte o tempo todo, a aposta deixa de parecer uma decisão financeira arriscada e passa a parecer parte natural da experiência de assistir a uma partida.'
},

'betano': {
  name: 'Betano',
  logo: 'assets/imagens/bets/betano.png',
  origin: 'Grécia. A Betano pertence ao grupo Kaizen Gaming, empresa de origem grega que expandiu sua operação para diversos mercados da Europa e da América Latina. No Brasil, a marca cresceu rapidamente ao combinar tecnologia, localização cultural e forte investimento em futebol.',
  operation: 'A Betano representa o modelo de bet que entende o esporte como porta de entrada emocional. A operação se apoia em apostas esportivas, odds dinâmicas, transmissões, campanhas de ativação e uma experiência digital desenhada para manter o usuário circulando entre jogo, estatística e nova aposta. A promessa visual é de controle, mas a estrutura continua sendo matemática: as odds são calculadas para proteger a margem da casa.',
  marketing: 'A principal força da Betano no Brasil é a ocupação simbólica do futebol. A marca investe em patrocínios de altíssima visibilidade e associa sua imagem a clubes, campeonatos e momentos de torcida. O caso do Flamengo mostra esse movimento: um contrato bilionário em escala publicitária que transforma a bet em parte do uniforme, da transmissão e da conversa entre torcedores. O problema é que essa presença constante aproxima a aposta da paixão esportiva, reduzindo a percepção de risco.'
},

'sportingbet': {
  name: 'Sportingbet',
  logo: 'assets/imagens/bets/sportingbet.jpg',
  origin: 'Reino Unido. A Sportingbet faz parte da Entain, um dos grandes grupos internacionais de apostas e jogos online. No Brasil, a marca se reposicionou com força ao ocupar espaços esportivos de alta visibilidade, principalmente no futebol e no basquete.',
  operation: 'A Sportingbet atua dentro de um ecossistema global de apostas, com foco em mercados esportivos, odds ao vivo e experiência recorrente de usuário. A lógica é simples: quanto mais eventos, estatísticas e possibilidades aparecem na tela, maior a chance de o usuário continuar interagindo. A aposta deixa de ser um ato isolado e vira um fluxo contínuo de microdecisões.',
  marketing: 'A estratégia recente da Sportingbet no Brasil é de presença institucional no esporte. O patrocínio máster ao Palmeiras colocou a marca nos uniformes dos times masculino e feminino, além de canais oficiais do clube. Pouco depois, a marca também se vinculou à NBA no Brasil. Esse tipo de campanha não vende apenas uma plataforma; vende pertencimento, torcida e acesso simbólico ao universo esportivo. É assim que a aposta se disfarça de entretenimento esportivo.'
},

'betnacional': {
  name: 'Betnacional',
  logo: 'assets/imagens/bets/betnacional.png',
  origin: 'Brasil. A Betnacional é ligada ao grupo NSX, uma operação brasileira que ganhou escala em um mercado que cresceu rapidamente entre a legalização das apostas de quota fixa e a regulamentação efetiva do setor. Em 2024, a Flutter, um dos maiores grupos globais de apostas online, anunciou a compra de uma participação majoritária na NSX, dona da Betnacional.',
  operation: 'A Betnacional cresceu em um ambiente muito brasileiro: futebol, Pix, linguagem popular e promessa de acesso rápido. Esse modelo reduz fricção. O usuário vê a marca em contextos familiares, deposita com facilidade e é conduzido a apostar em poucos cliques. A operação se apoia menos na ideia de cassino sofisticado e mais na sensação de proximidade: uma bet com cara de Brasil, mas ligada a uma estrutura global de apostas.',
  marketing: 'A força da Betnacional está na construção de identidade nacional. A comunicação usa futebol, celebridades, humor, música e referências populares para criar uma sensação de confiança e pertencimento. O risco é transformar a aposta em hábito cotidiano: algo que parece tão comum quanto torcer, comentar jogo ou fazer um Pix. Quando a marca se apresenta como “dos brasileiros”, ela suaviza o fato central: continua sendo uma casa de apostas, com vantagem matemática sobre o usuário.'
  }
};

/* ═══════════════════════════════
   FUNÇÕES DO MODAL
═══════════════════════════════ */
function openBetModal(betId) {
  const data = betDossiers[betId];
  if (!data) return;

  const modalBox = document.getElementById('bet-modal-box');
  
  // Monta o HTML interno do modal com os dados
  modalBox.innerHTML = `
    <button class="bet-modal-close" onclick="closeBetModal(event)">✕</button>
    
    <div class="modal-brand-header">
      <div class="modal-logo">
        <img src="${data.logo}" alt="${data.name}">
      </div>
      <h3 class="modal-title">${data.name}</h3>
    </div>

    <div class="modal-section-title">// Origem e Base de Operações</div>
    <p class="modal-text">${data.origin}</p>

    <div class="modal-section-title">// Como o Algoritmo Opera</div>
    <p class="modal-text">${data.operation}</p>

    <div class="modal-section-title">// A Tática de Influência (Marketing)</div>
    <p class="modal-text">${data.marketing}</p>
  `;

  // Exibe o overlay e trava o scroll do site
  const overlay = document.getElementById('bet-modal-overlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBetModal(event) {
  // Fecha se clicar no botão X ou fora da caixa do modal
  const overlay = document.getElementById('bet-modal-overlay');
  const modalBox = document.getElementById('bet-modal-box');
  
  if (event.target === overlay || event.target.classList.contains('bet-modal-close')) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Limpa o conteúdo após a animação de saída para evitar piscar o texto errado na próxima abertura
    setTimeout(() => {
      modalBox.innerHTML = '';
    }, 300);
  }
}

/* ═══════════════════════════════
   BANCO DE DADOS DOS INFLUENCIADORES
═══════════════════════════════ */
const influencerData = {
  'neymar': {
    name: 'Neymar Jr.',
    role: 'Atleta profissional',
    image: 'assets/imagens/bets/neymar.jpg',
    kicker: '// O ÍDOLO COMO MÍDIA',
    color: 'var(--red)',
    text: 'Neymar representa um dos exemplos mais fortes de como as bets se aproximam do futebol por meio de celebridades. Quando um jogador desse tamanho divulga uma casa de apostas, a publicidade não chega como anúncio comum: ela chega misturada com admiração, torcida e identificação. Reportagens mostram que o Ministério Público pediu acesso a contratos de publicidade de Neymar, Virgínia e outros influenciadores para analisar campanhas que poderiam associar apostas à ideia de “renda extra”. Nesse caso, Neymar não é apontado como investigado diretamente, mas sua imagem aparece no centro da discussão sobre o limite entre influência, publicidade e risco ao consumidor.',
    source: 'https://vejario.abril.com.br/coluna/otavio-furtado/neymar-convocacao-copa-site-apostas/'
  },

  'virginia': {
    name: 'Virgínia Fonseca',
    role: 'Influenciadora e empresária',
    image: 'assets/imagens/bets/virginia.jpg',
    kicker: '// A PUBLICIDADE DA RENDA FÁCIL',
    color: 'var(--red)',
    text: 'Virgínia virou um dos nomes mais citados no debate sobre influenciadores e bets porque sua força está exatamente onde esse mercado quer chegar: audiência massiva, linguagem cotidiana e alto poder de conversão. Reportagens apontam que o Ministério Público solicitou contratos de publicidade ligados a ela e a outros influenciadores para apurar se campanhas poderiam induzir consumidores a erro ao vender apostas como oportunidade de ganho ou “renda extra”. Outra apuração jornalística também cita movimentações financeiras sob análise, enquanto a defesa da influenciadora nega qualquer irregularidade. O ponto central para o usuário não é tratar a figura pública como caso isolado, mas entender como a influência pode transformar risco financeiro em promessa aspiracional.',
    source: 'https://odia.ig.com.br/colunas/andrei-lara/2026/06/7268139-milhoes-bets-e-coincidencias-o-quebra-cabeca-que-a-policia-federal-ainda-tenta-montar-sobre-virginia.html'
  },

  'mbappe': {
    name: 'Kylian Mbappé',
    role: 'Atleta profissional',
    image: 'assets/imagens/bets/mbappe.jpg',
    kicker: '// A RECUSA EM VIRAR ANÚNCIO',
    color: 'var(--lime)',
    text: 'Mbappé aparece no lado oposto da lógica das bets: o atleta que questiona o uso da própria imagem em publicidade de apostas. Segundo reportagem do UOL baseada no jornal L’Équipe, jogadores da seleção francesa reclamaram após imagens feitas para patrocinadores da federação serem usadas em peça de uma casa de apostas. Mbappé já havia dito publicamente que muitos atletas não concordavam com marcas ligadas a apostas e saúde alimentar, lembrando que vários jogadores vieram de bairros onde esse tipo de prática destruiu muita gente. A postura dele mostra que a discussão não é só comercial: é também sobre responsabilidade de imagem, origem social e o impacto que um ídolo pode ter sobre quem o acompanha.',
    source: 'https://www.uol.com.br/esporte/futebol/ultimas-noticias/2026/06/07/jogadores-da-franca-cobram-federacao-apos-imagem-em-comercial-de-bets-diz-lequipe.ghtm',
},

  'anitta': {
    name: 'Anitta',
    role: 'Cantora e empresária',
    image: 'assets/imagens/bets/anitta.jpg',
    kicker: '// A CRÍTICA À NORMALIZAÇÃO',
    color: 'var(--lime)',
    text: 'Anitta entrou no debate público criticando o avanço das bets e o impacto sobre pessoas em situação de vulnerabilidade. Em vídeo repercutido pela Veja Rio, ela afirmou que as apostas estão acabando com a vida do pobre e chamou atenção para uma característica perigosa desse vício: ele pode acontecer em silêncio, direto no celular, sem que as pessoas ao redor percebam. A cantora também aparece entre os artistas associados à campanha “Block no Tigrinho”, mobilização que alerta sobre os riscos das apostas online e defende mais fiscalização sobre a publicidade do setor. Sua posição ajuda a deslocar o tema do entretenimento para o campo da saúde pública e da proteção social.',
    source: 'https://vejario.abril.com.br/beira-mar/bets-acabando-vida-pobre-anitta/',
  }
  };


/* ═══════════════════════════════
   FUNÇÕES DO MODAL DOS INFLUENCIADORES
═══════════════════════════════ */
function openInfModal(infId) {
  const data = influencerData[infId];
  if (!data) return;

  const modalBox = document.getElementById('inf-modal-box');
  const overlay = document.getElementById('inf-modal-overlay');
  
  modalBox.innerHTML = `
  <button class="bet-modal-close" onclick="closeInfModal(event)">✕</button>
  
  <div class="modal-brand-header">
    <div class="inf-avatar" style="background-image: url('${data.image}'); width: 80px; height: 80px; border-radius: 50%; background-size: cover; background-position: center; border: 2px solid ${data.color}"></div>
    <div>
      <h3 class="modal-title" style="font-size: 28px;">${data.name}</h3>
      <span style="font-family: var(--font-m); font-size: 11px; color: var(--muted); text-transform: uppercase;">${data.role}</span>
    </div>
  </div>

  <div class="modal-section-title" style="color: ${data.color}; border-bottom-color: #2a2a2a;">
    ${data.kicker}
  </div>

  <p class="modal-text" style="font-size: 16px;">
    ${data.text}
  </p>

  <a 
    href="${data.source}" 
    target="_blank" 
    rel="noopener noreferrer" 
    class="modal-source-btn"
  >
    Ver fonte da notícia →
  </a>
`;

  if (modalBox) modalBox.scrollTop = 0;
  if (overlay) overlay.scrollTop = 0;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeInfModal(event) {
  const overlay = document.getElementById('inf-modal-overlay');
  const modalBox = document.getElementById('inf-modal-box');
  
  if (event.target === overlay || event.target.classList.contains('bet-modal-close')) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      modalBox.innerHTML = '';
    }, 300);
  }
}

/* ═══════════════════════════════
   MOTOR DO VÍCIO — TABS INTERATIVAS
═══════════════════════════════ */

const engineData = {
  crash: {
    file: 'crash_games.loop',
    mode: 'MODO: URGÊNCIA',
    risk: 'RISCO ALTO',
    title: 'CRASH<br>GAMES',
    tags: ['gatilho rápido', 'decisão impulsiva', 'quase vitória', 'nova aposta'],
    headline: 'O jogo te força a decidir antes de pensar.',
    text: 'Partidas rápidas criam tensão em poucos segundos. Quanto menor o tempo de decisão, maior a chance de agir no impulso.',
    lines: [
      'iniciar_rodada(5s)',
      'reduzir_tempo_de_decisão()',
      'mostrar_quase_vitoria()',
      'repetir_aposta()'
    ]
  },

  rtp: {
    file: 'rtp_margin.system',
    mode: 'MODO: MARGEM FIXA',
    risk: 'BANCA PROTEGIDA',
    title: 'RTP<br>95%',
    tags: ['promessa técnica', 'perda diluída', 'lucro invisível', 'banca vence'],
    headline: 'A matemática já entra no jogo antes de você.',
    text: 'O RTP parece uma informação neutra, mas mostra que o sistema foi configurado para devolver menos do que recebe no longo prazo.',
    lines: [
      'receber_apostas(total)',
      'calcular_retorno_parcial()',
      'reter_margem_da_casa()',
      'saldo_usuario--'
    ]
  },

  odds: {
    file: 'sports_odds.engine',
    mode: 'MODO: FALSA CONFIANÇA',
    risk: 'CONTROLE ILUSÓRIO',
    title: 'ODDS<br>ESPORTIVAS',
    tags: ['paixão pelo time', 'confiança pessoal', 'odd ajustada', 'aposta emocional'],
    headline: 'Você acha que está usando conhecimento. A banca usa estatística.',
    text: 'A aposta esportiva se aproveita da familiaridade com futebol, escalação e campeonato para criar a sensação de que a decisão é racional.',
    lines: [
      'ler_comportamento_da_torcida()',
      'ajustar_odd_em_tempo_real()',
      'explorar_vies_do_usuario()',
      'garantir_margem()'
    ]
  },

  bonus: {
    file: 'bonus_rollover.trap',
    mode: 'MODO: RETENÇÃO',
    risk: 'SAQUE BLOQUEADO',
    title: 'BÔNUS<br>30X',
    tags: ['presente falso', 'saldo preso', 'novas rodadas', 'perda acumulada'],
    headline: 'O bônus não foi feito para te dar dinheiro. Foi feito para te manter jogando.',
    text: 'O rollover transforma um bônus aparentemente gratuito em obrigação de apostar várias vezes antes de conseguir sacar.',
    lines: [
      'oferecer_bonus("grátis")',
      'bloquear_saque()',
      'exigir_apostas_repetidas()',
      'converter_bonus_em_perda()'
    ]
  }
};

const engineButtons = document.querySelectorAll('.engine-item');
const engineVisual = document.querySelector('.engine-visual');

const engineFile = document.getElementById('engine-file');
const engineMode = document.getElementById('engine-mode');
const engineRisk = document.getElementById('engine-risk');
const engineTitle = document.getElementById('engine-title');
const engineHeadline = document.getElementById('engine-headline');
const engineText = document.getElementById('engine-text');

const tagEls = [
  document.getElementById('tag-1'),
  document.getElementById('tag-2'),
  document.getElementById('tag-3'),
  document.getElementById('tag-4')
];

const lineEls = [
  document.getElementById('line-1'),
  document.getElementById('line-2'),
  document.getElementById('line-3'),
  document.getElementById('line-4')
];

let typingTimeouts = [];

function typeTerminal(lines) {
  typingTimeouts.forEach(timeout => clearTimeout(timeout));
  typingTimeouts = [];

  lineEls.forEach(line => {
    line.textContent = '';
  });

  lines.forEach((text, index) => {
    const timeout = setTimeout(() => {
      let charIndex = 0;

      const type = setInterval(() => {
        lineEls[index].textContent += text.charAt(charIndex);
        charIndex++;

        if (charIndex >= text.length) {
          clearInterval(type);
        }
      }, 18);
    }, index * 260);

    typingTimeouts.push(timeout);
  });
}

function updateEngine(type) {
  const data = engineData[type];

  if (!data) return;

  engineVisual.classList.add('changed');

  setTimeout(() => {
    engineFile.textContent = data.file;
    engineMode.textContent = data.mode;
    engineRisk.textContent = data.risk;
    engineTitle.innerHTML = data.title;
    engineHeadline.textContent = data.headline;
    engineText.textContent = data.text;

    tagEls.forEach((tag, index) => {
      tag.textContent = data.tags[index];
    });

    typeTerminal(data.lines);

    engineVisual.classList.remove('changed');
  }, 150);
}

engineButtons.forEach(button => {
  button.addEventListener('click', () => {
    engineButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');

    updateEngine(button.dataset.engine);
  });
});

updateEngine('crash');