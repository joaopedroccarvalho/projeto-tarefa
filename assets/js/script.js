let listaTarefas = document.querySelector('#listContainer');

function abrirModal() {
    document.querySelector('#taskModal').style.display = 'block';
}

function addTarefa() {
    let tarefa = document.querySelector('#tarefa');
    let date = document.querySelector('#date');
    let priority = document.querySelector('#priority');

    let valorTarefa = tarefa.value.trim();
    let valorDate = date.value.trim();
    let valorPriority = priority.value.trim();
    let valorCorPriority = getCorPrioridade(valorPriority);

    if (valorTarefa === '' || valorDate === '' || valorPriority === '') {
        // Se algum dos campos estiver vazio, retorna sem criar a tarefa
        return;
    }

    let novoItem = document.createElement('li');
    novoItem.classList.add('tarefa');

    let infoDiv = document.createElement('div');
    infoDiv.classList.add('info');
    infoDiv.innerHTML = `
        <div class="descricao">${valorTarefa}</div>
        <div class="data">Data: ${valorDate}</div>
        <div class="${valorCorPriority}">Prioridade: ${valorPriority}</div>
    `;

    let spanExcluir = document.createElement('span');
    spanExcluir.classList.add('buttonExcluir');
    spanExcluir.textContent = 'x';

    novoItem.appendChild(infoDiv);
    novoItem.appendChild(spanExcluir);

    listaTarefas.appendChild(novoItem);

    // Adicione os eventos ao novo item
    adicionarEventosAoItem(novoItem);
    salvarDados();
}


// Função para obter a classe de cor com base na prioridade
function getCorPrioridade(prioridade) {
    switch (prioridade.toLowerCase()) {
        case 'alta':
            return 'prioridade-alta';
        case 'media':
            return 'prioridade-media';
        case 'baixa':
            return 'prioridade-baixa';
        default:
            return '';
    }
}


function adicionarEventosAoItem(item) {
    item.addEventListener('click', function() {
        item.classList.toggle('checked');
        salvarDados();
    });

    const spanExcluir = item.querySelector('.buttonExcluir');
    spanExcluir.addEventListener('click', function(event) {
        event.stopPropagation();
        item.remove();
        salvarDados();
    });
}

function adicionarEventosAosItensExistente() {
    document.querySelectorAll('.tarefa').forEach(function(li) {
        adicionarEventosAoItem(li);
    });
}

document.addEventListener('keydown', function (event) {
    // Obtém o valor da tecla pressionada
    const valorTecla = event.key;

    // Verifica se é um número, operador ou Enter
    if (valorTecla === 'Enter' && document.activeElement.tagName.toLowerCase() === 'input') {
        addTarefa();
        closeModal();
        event.preventDefault(); // Evita que a tecla Enter seja inserida no campo de input
    }
});

function closeModal() {
    let modal = document.querySelector('#taskModal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
}

function salvarDados() {
    const listaTarefasArray = Array.from(listaTarefas.children).map(li => li.outerHTML);
    localStorage.setItem("data", JSON.stringify(listaTarefasArray));
} 

function mostraTarefa() {
    const dadosSalvos = localStorage.getItem("data");
    if (dadosSalvos) {
        const listaTarefasArray = JSON.parse(dadosSalvos);
        listaTarefas.innerHTML = listaTarefasArray.join('');
        // Adicione os eventos aos itens recuperados
        adicionarEventosAosItensExistente();
    }
}

mostraTarefa();


