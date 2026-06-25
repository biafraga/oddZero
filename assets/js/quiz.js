const perguntas = [
  'Você já apostou mais dinheiro do que planejava?',
  'Depois de perder, você tenta apostar de novo para recuperar o prejuízo?',
  'Você já tentou parar ou diminuir as apostas e não conseguiu?',
  'Você fica ansioso, irritado ou inquieto quando tenta ficar sem apostar?',
  'Você já escondeu ou mentiu para alguém sobre quanto apostou?',
  'Você já usou dinheiro de contas importantes para apostar?',
  'Você pensa em apostas mesmo quando está fazendo outras coisas?',
  'Você sente que precisa apostar valores maiores para sentir a mesma emoção?'
];

const respostas = [
  { texto: 'Nunca', valor: 0 },
  { texto: 'Às vezes', valor: 1 },
  { texto: 'Frequentemente', valor: 2 },
  { texto: 'Quase sempre', valor: 3 }
];

let perguntaAtual = 0;
let respostasUsuario = new Array(perguntas.length).fill(null);

const questionEl = document.getElementById('quiz-question');
const optionsEl = document.getElementById('quiz-options');
const counterEl = document.getElementById('quiz-counter');
const progressBar = document.getElementById('quiz-progress-bar');
const prevBtn = document.getElementById('quiz-prev');
const nextBtn = document.getElementById('quiz-next');
const resultadoEl = document.getElementById('resultado');

function renderQuiz() {
  questionEl.style.display = 'block';
  optionsEl.style.display = 'grid';
  document.querySelector('.quiz-actions').style.display = 'flex';
  document.querySelector('.quiz-top').style.display = 'block';
  resultadoEl.classList.add('hidden');

  questionEl.textContent = perguntas[perguntaAtual];
  counterEl.textContent = `PERGUNTA ${perguntaAtual + 1}/${perguntas.length}`;
  progressBar.style.width = `${((perguntaAtual + 1) / perguntas.length) * 100}%`;

  optionsEl.innerHTML = '';

  respostas.forEach(resposta => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option';
    btn.textContent = resposta.texto;

    if (respostasUsuario[perguntaAtual] === resposta.valor) {
      btn.classList.add('selected');
    }

    btn.addEventListener('click', () => {
      respostasUsuario[perguntaAtual] = resposta.valor;
      renderQuiz();
    });

    optionsEl.appendChild(btn);
  });

  prevBtn.style.visibility = perguntaAtual === 0 ? 'hidden' : 'visible';
  nextBtn.textContent = perguntaAtual === perguntas.length - 1 ? 'Ver resultado →' : 'Próxima →';
}

function mostrarResultado() {
  const total = respostasUsuario.reduce((soma, valor) => soma + valor, 0);

  let titulo = '';
  let texto = '';
  let classe = '';

  if (total <= 5) {
    titulo = 'Baixo risco';
    classe = 'baixo';
    texto = 'Suas respostas indicam poucos sinais de risco no momento. Ainda assim, apostas envolvem perda financeira e devem ser tratadas com cuidado.';
  } else if (total <= 11) {
    titulo = 'Atenção';
    classe = 'medio';
    texto = 'Suas respostas mostram alguns sinais de alerta. Pode ser um bom momento para rever limites, evitar gatilhos e conversar com alguém de confiança.';
  } else if (total <= 17) {
    titulo = 'Alto risco';
    classe = 'alto';
    texto = 'Suas respostas indicam sinais importantes de perda de controle. Procurar apoio profissional ou um grupo de ajuda pode ser um passo importante.';
  } else {
    titulo = 'Risco crítico';
    classe = 'critico';
    texto = 'Suas respostas indicam vários sinais de alerta. Você não precisa lidar com isso sozinho. Procure a central de ajuda do site ou converse com alguém de confiança hoje.';
  }

  questionEl.style.display = 'none';
  optionsEl.style.display = 'none';
  document.querySelector('.quiz-actions').style.display = 'none';
  document.querySelector('.quiz-top').style.display = 'none';

  resultadoEl.innerHTML = `
    <span class="result-label">// resultado da autoavaliação</span>
    <h2 class="${classe}">${titulo}</h2>
    <p>${texto}</p>
    <a href="ajuda.html" class="result-btn">Ver opções de ajuda →</a>
    <button type="button" class="result-restart" onclick="reiniciarQuiz()">Refazer teste</button>
  `;

  resultadoEl.classList.remove('hidden');
}

function reiniciarQuiz() {
  perguntaAtual = 0;
  respostasUsuario = new Array(perguntas.length).fill(null);
  renderQuiz();
}

nextBtn.addEventListener('click', () => {
  if (respostasUsuario[perguntaAtual] === null) {
    alert('Escolha uma resposta antes de continuar.');
    return;
  }

  if (perguntaAtual < perguntas.length - 1) {
    perguntaAtual++;
    renderQuiz();
  } else {
    mostrarResultado();
  }
});

prevBtn.addEventListener('click', () => {
  if (perguntaAtual > 0) {
    perguntaAtual--;
    renderQuiz();
  }
});

renderQuiz();