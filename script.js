// Variáveis de estado do jogo
let producao = 0;
let sustentabilidade = 100;
const limiteProducao = 100;

// Elementos da Interface (DOM)
const txtProducao = document.getElementById("producao");
const txtSustentabilidade = document.getElementById("sustentabilidade");
const barraSustentavel = document.getElementById("barra-sustentavel");
const mensagemDiario = document.getElementById("mensagem-diario");

const btnPlantar = document.getElementById("btn-plantar");
const btnOrganico = document.getElementById("btn-organico");
const btnReforestar = document.getElementById("btn-reflorestar");
const btnReiniciar = document.getElementById("btn-reiniciar");

const modalFim = document.getElementById("modal-fim");
const modalTitulo = document.getElementById("modal-titulo");
const modalTexto = document.getElementById("modal-texto");

// Configuração dos Eventos dos Botões
btnPlantar.addEventListener("click", () => executarAcao(10, -15, "Você usou técnicas agressivas. A produção aumentou, mas o solo e as águas sofreram!"));
btnOrganico.addEventListener("click", () => executarAcao(5, 5, "Cultivo orgânico realizado! Alimentos saudáveis e meio ambiente protegido."));
btnReforestar.addEventListener("click", () => executarAcao(0, 20, "Área de Preservação Permanente recuperada! A biodiversidade agradece."));
btnReiniciar.addEventListener("click", reiniciarJogo);

// Função Principal de Atualização
function executarAcao(qtdProducao, qtdSustentabilidade, mensagem) {
    producao += qtdProducao;
    sustentabilidade += qtdSustentabilidade;

    // Trava os limites da sustentabilidade entre 0 e 100
    if (sustentabilidade > 100) sustentabilidade = 100;
    if (sustentabilidade < 0) sustentabilidade = 0;

    // Atualiza a tela
    atualizarInterface(mensagem);

    // Checa as condições de vitória ou derrota
    verificarFimDeJogo();
}

// Atualiza os dados visuais
function atualizarInterface(mensagem) {
    txtProducao.textContent = producao;
    txtSustentabilidade.textContent = sustentabilidade;
    barraSustentavel.style.width = sustentabilidade + "%";
    mensagemDiario.textContent = mensagem;

    // Altera a cor da barra dependendo da gravidade
    if (sustentabilidade > 50) {
        barraSustentavel.style.backgroundColor = "#4caf50"; // Verde
    } else if (sustentabilidade > 20) {
        barraSustentavel.style.backgroundColor = "#ff9800"; // Laranja
    } else {
        barraSustentavel.style.backgroundColor = "#f44336"; // Vermelho
    }
}

// Valida as regras de negócio do Concurso (Equilíbrio)
function verificarFimDeJogo() {
    if (sustentabilidade <= 0) {
        mostrarModal(
            "Game Over! Faltou Equilíbrio", 
            "Sua fazenda produziu, mas a degradação ambiental destruiu os recursos naturais. Lembre-se: sem meio ambiente não há futuro para o agro!"
        );
    } else if (producao >= limiteProducao) {
        mostrarModal(
            "Vitória Sustentável!", 
            "Parabéns! Você alcançou a meta de produção mantendo a saúde do ecossistema. Você provou que o Agro Forte e o Futuro Sustentável caminham juntos!"
        );
    }
}

function mostrarModal(titulo, texto) {
    modalTitulo.textContent = titulo;
    modalTexto.textContent = texto;
    modalFim.classList.remove("hide");
}

function reiniciarJogo() {
    producao = 0;
    sustentabilidade = 100;
    modalFim.classList.add("hide");
    atualizarInterface("Novo ciclo iniciado. Busque o equilíbrio perfeito!");
}
