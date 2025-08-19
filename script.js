// Temas
const themeToggle  = document.getElementById('theme-toggle');
const themeOpts    = document.getElementById('theme-options');
const customPane   = document.getElementById('custom-theme-settings');
const saveCustom   = document.getElementById('save-custom');
const customBg     = document.getElementById('custom-bg');
const customText   = document.getElementById('custom-text');
const customAccent = document.getElementById('custom-accent');

// URL do GIF Galaxy
const galaxyGifUrl = "galaxy.gif";
const cyberGifUrl  = "Cyber.gif";
const estudanteGifUrl  = "Estudante.gif";

function applyTheme(name, vars = {}) {
  // Define a classe base do tema
  document.body.className = name === 'light' ? '' : `theme-${name}`;

  // Remove imagem de fundo ao sair do Galaxy
  if (name !== 'galaxy') {
    document.body.style.backgroundImage = '';
    document.body.style.backgroundSize = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundAttachment = '';
  }

  // Aplica o GIF no Galaxy
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
  // Aplica variáveis no tema custom
  if (name === 'custom') {
    Object.entries(vars).forEach(([k, v]) =>
      document.documentElement.style.setProperty(`--${k}`, v)
    );
    localStorage.setItem('customVars', JSON.stringify(vars));
  }

  // Salva o nome do tema atual
  localStorage.setItem('theme', name);
}
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
  ],
  subj2: [
    { id: 'subj2-1', label: 'Guia de aprendizagem dos alunos - 16/07' },
    { id: 'subj2-2', label: 'Clube de jogos - 06/08' },
    { id: 'subj2-3', label: 'Clube de jogos - 13/08' },
    { id: 'subj2-4', label: 'Aula 4' },
    { id: 'subj2-5', label: 'Aula 5' },
    { id: 'subj2-6', label: 'Aula 6' },
    { id: 'subj2-7', label: 'Aula 7' },
    { id: 'subj2-8', label: 'Aula 8' },
  ],
   subj3: [
    { id: 'subj3-1', label: 'Guia de aprendizagem dos alunos - 10/07' },
    { id: 'subj3-2', label: 'Introdução á criação de jogos - 17/07' },
    { id: 'subj3-3', label: 'Clube de jogos - 06/08' },
    { id: 'subj3-4', label: 'Clube de jogos - 13/08' },
    { id: 'subj3-5', label: 'Aula 5' },
    { id: 'subj3-6', label: 'Aula 6' },
    { id: 'subj3-7', label: 'Aula 7' },
    { id: 'subj3-8', label: 'Aula 8' },
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
  ],
   subj6: [
    { id: 'subj6-1', label: 'Guia de aprendizagem dos alunos - 14/07' },
    { id: 'subj6-2', label: 'Video HTML e CSS - 04/08' },
    { id: 'subj6-3', label: 'Tema dia do estudante - 11/08' },
    { id: 'subj6-4', label: 'Ergonomia da computação para pessoas com deficiência - 18/08' },
    { id: 'subj6-5', label: 'Aula 5' },
    { id: 'subj6-6', label: 'Aula 6' },
    { id: 'subj6-7', label: 'Aula 7' },
    { id: 'subj6-8', label: 'Aula 8' },
  ],
   subj7: [
    { id: 'subj7-1', label: 'Guia de aprendizagem - 10/07' },
    { id: 'subj7-2', label: 'Guia de aprendizagem - 17/07' },
    { id: 'subj7-3', label: 'Introdução ao google agenda - 07/08' },
    { id: 'subj7-4', label: 'Criação de rotina google agenda - 14/08' },
    { id: 'subj7-5', label: 'Aula 5' },
    { id: 'subj7-6', label: 'Aula 6' },
    { id: 'subj7-7', label: 'Aula 7' },
    { id: 'subj7-8', label: 'Aula 8' },
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
  ],

};

// Ao clicar numa matéria, gera botões de conteúdo
subjects.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const key = btn.dataset.subject;
    optionsPane.innerHTML = '';    
    if (!catalog[key]) return;
    catalog[key].forEach(item=>{
      const b = document.createElement('button');
      b.textContent = item.label;
      b.dataset.contentId = item.id;
      optionsPane.appendChild(b);
    });
    optionsPane.classList.remove('hidden');
  });
});

// Ao clicar num conteúdo, abre modal com o template
optionsPane.addEventListener('click', e=>{
  const id = e.target.dataset.contentId;
  if (!id) return;
  const tpl = document.getElementById(`tpl-${id}`);
  if (!tpl) return;
  frameInner.innerHTML = tpl.innerHTML;
  modal.classList.remove('hidden');
});

// Fechar modal
closeBtn.addEventListener('click', ()=>{
  modal.classList.add('hidden');
});

