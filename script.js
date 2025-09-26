// Temas
const themeToggle  = document.getElementById('theme-toggle');
const themeOpts    = document.getElementById('theme-options');
const customPane   = document.getElementById('custom-theme-settings');
const saveCustom   = document.getElementById('save-custom');
const customBg     = document.getElementById('custom-bg');
const customText   = document.getElementById('custom-text');
const customAccent = document.getElementById('custom-accent');
const container = document.querySelector('.container');

// URL do GIF Galaxy
const galaxyGifUrl = "galaxy.gif";
const cyberGifUrl  = "Cyber.gif";
const estudanteGifUrl  = "Estudante.gif";

function applyTheme(name, vars = {}) {
  document.body.className = name === 'light' ? '' : `theme-${name}`;
  if (name !== 'galaxy') {
    document.body.style.backgroundImage = '';
    document.body.style.backgroundSize = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundAttachment = '';
  }
  if (name === 'galaxy') {
    document.body.style.backgroundImage = `url('${galaxyGifUrl}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
  }
  if (name === 'cyber') {
    document.body.style.backgroundImage = `url('${cyberGifUrl}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
  }
  if (name === 'estudante') {
    document.body.style.backgroundImage = `url('${estudanteGifUrl}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
  }
  if (name === 'custom') {
    Object.entries(vars).forEach(([k, v]) =>
      document.documentElement.style.setProperty(`--${k}`, v)
    );
    localStorage.setItem('customVars', JSON.stringify(vars));
  }
  localStorage.setItem('theme', name);
}

// Carrega tema salvo
(function loadTheme() {
  const name = localStorage.getItem('theme') || 'light';
  if (name === 'custom') {
    const vars = JSON.parse(localStorage.getItem('customVars') || '{}');
    applyTheme('custom', vars);
  } else {
    applyTheme(name);
  }
})();

// Eventos de UI
themeToggle.addEventListener('click', () => {
  themeOpts.classList.toggle('hidden');
  customPane.classList.add('hidden');
});

themeOpts.addEventListener('click', e => {
  const t = e.target.dataset.theme;
  if (!t) return;
  themeOpts.classList.add('hidden');
  if (t === 'custom') {
    customPane.classList.toggle('hidden');
  } else {
    applyTheme(t);
  }
});

saveCustom.addEventListener('click', () => {
  const vars = {
    'bg-color': customBg.value,
    'text-color': customText.value,
    'accent-color': customAccent.value
  };
  applyTheme('custom', vars);
  customPane.classList.add('hidden');
});

// Fluxo de Matérias → Conteúdos
const subjects    = document.querySelectorAll('[data-subject]');
const optionsPane = document.getElementById('content-options');
const modal       = document.getElementById('content-frame');
const closeBtn    = document.getElementById('close-frame');
const frameInner  = document.getElementById('frame-content');
const templates   = document.getElementById('templates');

// Definição de conteúdos por matéria
const catalog = {
  subj1: [
    { id: 'subj1-1', label: 'Guia de aprendizagem dos alunos - 10/07' },
    { id: 'subj1-2', label: 'Comprar PC - 15/07' },
    { id: 'subj1-3', label: 'Analise de configuração de celular - 17/07' },
    { id: 'subj1-4', label: 'Performance de celular - 05/08' },
    { id: 'subj1-5', label: 'Performance de PC - 08/08' },
    { id: 'subj1-6', label: 'Como montar um servidor - 11/08' },
    { id: 'subj1-7', label: 'Ergonomia da computação para pessoas com deficiência - 18/08' },
    { id: 'subj1-8', label: 'TIC (Tecnologia da informação e comunicação) - 19/08' },
    { id: 'subj1-9', label: 'TIC (Tecnologia da informação e comunicação) - 22/08' },
    { id: 'subj1-10', label: 'Acesso de pessoas com deficiência à escola. - 25/08' },
    { id: 'subj1-11', label: 'Entrevista de TI. - 26/08' },
    { id: 'subj1-12', label: 'Atualização de matérias pendentes. - 02/09' },
    { id: 'subj1-13', label: 'Diferença entre HD e SSD / HD purple e HD comum. - 08/09' },
    { id: 'subj1-14', label: 'Diferença entre HD e SSD / HD purple e HD comum. - 09/09' },
     { id: 'subj1-15', label: 'Diferença entre HD e SSD / HD purple e HD comum. - 09/09' },
     { id: 'subj1-16', label: 'Avaliação global. - 09/09' },
     { id: 'subj1-17', label: 'Avaliação global. - 09/09' },
     { id: 'subj1-18', label: 'Desmontar impressora. - 09/09' },
     { id: 'subj1-19', label: 'Desmontar impressora. - 09/09' },
     { id: 'subj1-20', label: 'Diferença entre HD e SSD / HD purple e HD comum. - 09/09' },
  ],
  // ... demais matérias
  subj2: [
    { id: 'subj2-1', label: 'Guia de aprendizagem dos alunos - 16/07' },
    { id: 'subj2-2', label: 'Clube de jogos - 06/08' },
    { id: 'subj2-3', label: 'Clube de jogos - 13/08' },
    { id: 'subj2-4', label: 'Desenvolvimento do projeto de robôtica - 20/08' },
    { id: 'subj2-5', label: 'Exoesqueletos - 27/09' },
    { id: 'subj2-6', label: 'Organizar armario de robôtica - 03/09' },
    { id: 'subj2-7', label: 'Revisão prova global - 10/09' },
    { id: 'subj2-8', label: 'Avaliação global - ' },
      { id: 'subj2-9', label: 'Projeto robotica - ' },
  ],
  // ... demais matérias (subj3, subj4, subj5, subj6, subj7, subj8) igual ao original
  subj3: [
    { id: 'subj3-1', label: 'Guia de aprendizagem dos alunos - 10/07' },
    { id: 'subj3-2', label: 'Introdução á criação de jogos - 17/07' },
    { id: 'subj3-3', label: 'Clube de jogos - 06/08' },
    { id: 'subj3-4', label: 'Clube de jogos - 13/08' },
    { id: 'subj3-5', label: 'Projeto robôtica - 20/08' },
    { id: 'subj3-6', label: 'Projeto robôtica - 27/08' },
    { id: 'subj3-7', label: 'Projeto robôtica - 03/09' },
    { id: 'subj3-8', label: 'Revisão prova global - 10/09' },
      { id: 'subj3-9', label: 'Avaliação global - 10/09' },
      { id: 'subj3-10', label: 'Projeto robotica - 10/09' },
  ],
  subj4: [
    { id: 'subj4-1', label: 'Guia de aprendizagem dos alunos - 11/07' },
    { id: 'subj4-2', label: 'Guia de aprendizagem dos alunos - 15/07' },
    { id: 'subj4-3', label: 'Atualização de software - 16/07' },
    { id: 'subj4-4', label: 'Acolhimento/Festa junina - 18/07' },
    { id: 'subj4-5', label: 'Atualização de software - 05/08' },
    { id: 'subj4-6', label: 'Atualização de software - 06/08' },
    { id: 'subj4-7', label: 'Atualização de software - 08/08' },
    { id: 'subj4-8', label: 'Preparação pro projeto de juventude - 12/08' },
    { id: 'subj4-9', label: 'Atualização de software - 13/08' },
    { id: 'subj4-10', label: 'Atualização de software - 15/08' },
    { id: 'subj4-11', label: 'Projeto robotica - 19/08' },
    { id: 'subj4-12', label: 'Projeto robotica - 20/08' },
    { id: 'subj4-13', label: 'Projeto robotica - 22/08' },
    { id: 'subj4-14', label: 'Projeto robotica - 26/08' },
    { id: 'subj4-15', label: 'Projeto robotica - 27/08' },
    { id: 'subj4-16', label: 'Atualização do software - 29/08' },
    { id: 'subj4-17', label: 'Atualização do software - 02/09' },
    { id: 'subj4-18', label: 'Atualização do software - 03/09' },
    { id: 'subj4-19', label: 'Atualização do software - 05/09' },
    { id: 'subj4-20', label: 'Atualização do software - 09/09' },
    { id: 'subj4-21', label: 'Atualização do software - 10/09' },
    { id: 'subj4-22', label: 'Atualização do software - 12/09' },
    { id: 'subj4-23', label: 'Avaliação global - 12/09' },
    { id: 'subj4-24', label: 'Avaliação global - 12/09' },
    { id: 'subj4-25', label: 'Avaliação global - 12/09' },
    { id: 'subj4-26', label: 'Desafio - 12/09' },
    { id: 'subj4-27', label: 'Projeto java - 12/09' },
    { id: 'subj4-28', label: 'Projeto java - 12/09' },
    { id: 'subj4-29', label: 'Atualização do software - 12/09' },
    { id: 'subj4-30', label: 'Atualização do software - 12/09' },
  ],
  subj5: [
    { id: 'subj5-1', label: 'Guia de aprendizagem dos alunos - 11/07' },
    { id: 'subj5-2', label: 'Definição JavaScript, MySQL e PHP - 14/07' },
    { id: 'subj5-3', label: 'Festa junina - 18/07' },
    { id: 'subj5-4', label: 'Explicação JavaScript, MySQL e PHP - 04/08' },
    { id: 'subj5-5', label: 'Atualizar matérias pendentes - 08/08' },
    { id: 'subj5-6', label: 'Tema dia do estudante - 11/08' },
    { id: 'subj5-7', label: 'Atualizar matérias pendentes - 15/08' },
    { id: 'subj5-8', label: 'Ergonomia da computação para pessoas com deficiência - 18/08' },
    { id: 'subj5-9', label: 'Projeto robôtica - 22/08' },
    { id: 'subj5-10', label: 'Verlibras - 25/08' },
    { id: 'subj5-11', label: 'Atualizar materias no site - 29/08' },
    { id: 'subj5-12', label: 'Atualizar materias no site - 05/09' },
    { id: 'subj5-13', label: 'Atualizar materias no site - 08/09' },
    { id: 'subj5-14', label: 'Atualizar materias no site - 12/09' },
      { id: 'subj5-15', label: 'Atualizar materias no site - 12/09' },
      { id: 'subj5-16', label: 'Atualizar materias no site - 12/09' },
      { id: 'subj5-17', label: 'Atualizar materias no site - 12/09' },
      { id: 'subj5-18', label: 'Site - 12/09' },
      { id: 'subj5-19', label: 'Atualizar materias pendentes - 12/09' },
      { id: 'subj5-14', label: 'Atualizar materias no site - 12/09' },
  ],
  subj6: [
    { id: 'subj6-1', label: 'Guia de aprendizagem dos alunos - 14/07' },
    { id: 'subj6-2', label: 'Video HTML e CSS - 04/08' },
    { id: 'subj6-3', label: 'Tema dia do estudante - 11/08' },
    { id: 'subj6-4', label: 'Ergonomia da computação para pessoas com deficiência - 18/08' },
    { id: 'subj6-5', label: 'Recursos assistivos para pessoas deficientes - 25/08' },
    { id: 'subj6-6', label: 'Atualização das matérias - 08/09' },
    { id: 'subj6-7', label: 'Site' },
    { id: 'subj6-8', label: 'Site' },
    { id: 'subj6-9', label: 'Site' },
  ],
  subj7: [
    { id: 'subj7-1', label: 'Guia de aprendizagem - 10/07' },
    { id: 'subj7-2', label: 'Guia de aprendizagem - 17/07' },
    { id: 'subj7-3', label: 'Introdução ao google agenda - 07/08' },
    { id: 'subj7-4', label: 'Criação de rotina google agenda - 14/08' },
    { id: 'subj7-5', label: 'Projeto robôtica - 21/08' },
    { id: 'subj7-6', label: 'Competição de pipa - 23/08' },
    { id: 'subj7-7', label: 'Quebra-Cabeça - 28/08' },
    { id: 'subj7-8', label: 'Quebra-Cabeça - 04/09' },
    { id: 'subj7-9', label: 'Reset computador - 11/09' },
    { id: 'subj7-10', label: 'Tarefas no google agenda - 11/09' },
    { id: 'subj7-11', label: 'Desafio - 11/09' },
  ],
  subj8: [
    { id: 'subj8-1', label: 'Introdução a criação de jogos - Video-Game - 11/07' },
    { id: 'subj8-2', label: 'Otimização de PC a partir de confifurações de SO - 15/07' },
    { id: 'subj8-3', label: 'Festa junina - 18/07' },
    { id: 'subj8-4', label: 'Otimização de PC a partir de confifurações de SO - 05/08 ' },
    { id: 'subj8-5', label: 'Otimização de PC a partir de confifurações de SO - 08/08' },
    { id: 'subj8-6', label: 'Montagem de servidor (teoria) - 13/08' },
    { id: 'subj8-7', label: 'Montagem de servidor (Pratica) - 15/08' },
    { id: 'subj8-8', label: 'Projeto robotica - 19/08' },
    { id: 'subj8-9', label: 'Projeto robotica - 22/08' },
    { id: 'subj8-10', label: 'Preparar entrevista de TI - 26/08' },
    { id: 'subj8-11', label: 'Organizar a sala - 29/08' },
    { id: 'subj8-12', label: 'Otimização de PC a partir do SO - 02/09' },
    { id: 'subj8-13', label: 'Comparar linux e windows - 05/09' },
    { id: 'subj8-14', label: 'Otimização de PC a partir de confifurações de SO - 09/09' },
    { id: 'subj8-15', label: 'Otimização de PC a partir de confifurações de SO - 12/09' },
    { id: 'subj8-16', label: 'Otimização de PC a partir de confifurações de SO - 12/09' },
    { id: 'subj8-17', label: 'Otimização de PC a partir de confifurações de SO - 12/09' },
    { id: 'subj8-18', label: 'Desafio - 12/09' },
    { id: 'subj8-19', label: 'SO de tablet e celulares - 12/09' },
    { id: 'subj8-20', label: 'Otimização de PC a partir de confifurações de SO - 12/09' },
  ],
};

// Ao clicar numa matéria, gera botões de conteúdo divididos em duas colunas de forma equilibrada
subjects.forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.subject;
    const columnLeft = document.getElementById('column-left');
    const columnRight = document.getElementById('column-right');
    columnLeft.innerHTML = '';
    columnRight.innerHTML = '';
    optionsPane.classList.remove('hidden');
    if (!catalog[key]) return;

    // Divisão igual entre as colunas
    const items = catalog[key];
    const mid = Math.ceil(items.length / 2);
    items.forEach((item, idx) => {
      const b = document.createElement('button');
      b.textContent = item.label;
      b.dataset.contentId = item.id;
      if (idx < mid) {
        columnLeft.appendChild(b);
      } else {
        columnRight.appendChild(b);
      }
    });
  });
});

// Ao clicar num conteúdo, abre modal com o template
optionsPane.addEventListener('click', e => {
  const id = e.target.dataset.contentId;
  if (!id) return;
  const tpl = document.getElementById(`tpl-${id}`);
  if (!tpl) return;
  frameInner.innerHTML = tpl.innerHTML;
  modal.classList.remove('hidden');
});

// Fechar modal
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});
