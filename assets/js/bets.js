/* ═══════════════════════════════
   BANCO DE DADOS DOSSIÊ DAS BETS
═══════════════════════════════ */
const betDossiers = {
  'bet365': {
    name: 'bet365',
    logo: 'assets/imagens/bets/bet365.png',
    origin: 'Reino Unido (Stoke-on-Trent). Fundada no ano 2000 por Denise Coates em um trailer de estacionamento, operando hoje globalmente.',
    operation: 'É uma gigante tecnológica. Diferente das plataformas menores que compram sistemas prontos (white-labels), a bet365 desenvolve seu próprio algoritmo e modelagem estatística. Isso garante a eles uma precisão cirúrgica na definição de odds, reduzindo drasticamente as chances de "quebrarem" a banca.',
    marketing: 'A bet365 foca pesado em anúncios globais de televisão durante jogos e forte presença digital em banners. Eles são menos dependentes de "micro-influenciadores" brasileiros e mais apoiados em patrocínios de painéis de campo e naming rights de estádios pela Europa (como o Bet365 Stadium).'
  },
  'betano': {
    name: 'Betano',
    logo: 'assets/imagens/bets/betano.png',
    origin: 'Grécia. Pertence ao grupo Kaizen Gaming, operando no Brasil desde 2021.',
    operation: 'Eles operam sob licenciamento de Malta (MGA) e focaram em adaptar agressivamente o mercado europeu para o sul-americano. Possuem algoritmos terceirizados de alta eficiência para mercados de futebol ao vivo.',
    marketing: 'A estratégia deles é o "Marketing de Dominação". Eles compraram as cotas de patrocínio das maiores competições do país (Série A do Brasileirão e Copa do Brasil). A tática é associar a marca à paixão nacional, usando a imagem de ex-jogadores de credibilidade e estampando camisas de times gigantes (como o Atlético Mineiro) para normalizar a aposta.'
  },
  'sportingbet': {
    name: 'Sportingbet',
    logo: 'assets/imagens/bets/sportingbet.jpg',
    origin: 'Reino Unido. Faz parte do gigantesco conglomerado Entain, dono de outras marcas como Bwin e PartyPoker.',
    operation: 'Por serem uma das empresas mais antigas (1998), seu sistema de back-end foca no "apostador recreativo". A plataforma é configurada para ter odds mais conservadoras (lucrando na alta margem de retenção em apostas múltiplas) em vez de focar no apostador profissional.',
    marketing: 'Eles foram os pioneiros da agressividade publicitária no Brasil com a famosa campanha "Faz um Sportingbet aê". O foco é usar celebridades do mais alto escalão que inspiram sucesso e descontração, como Marcelo (futebol), Ronaldo Fenômeno e influenciadores de entretenimento, mascarando o risco do vício com humor.'
  },
  'betnacional': {
    name: 'Betnacional',
    logo: 'assets/imagens/bets/betnacional.png',
    origin: 'Brasil. Faz parte do NSX Group, operando a partir de Curaçao para driblar a ausência de leis brasileiras na época.',
    operation: 'Eles popularizaram o modelo "White-label + Pix". Eles não criaram o jogo, apenas licenciaram um software gringo e acoplaram métodos de pagamento instantâneo brasileiros. O foco operacional é altíssimo giro de dinheiro rápido em mercados menores (estaduais e série B).',
    marketing: 'A "Bet dos Brasileiros" aposta no hiper-nacionalismo e pertencimento. A tática deles é comprar a imagem das vozes mais familiares do país (Galvão Bueno) e estrelas pop de massa (Vinícius Jr., Thiaguinho, Ludmilla). Eles atrelam o ato de apostar à identidade cultural e à ascensão social rápida.'
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