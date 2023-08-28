// Inicialização de variáveis
let runningTotal = 0; // Armazena o resultado acumulado das operações
let buffer = "0"; // Armazena o número ou operador atual
let previousOperator; // Armazena o operador da operação anterior

// Captura do elemento da tela onde serão exibidos os resultados
const screen = document.querySelector('.screen');

// Função chamada quando um botão é clicado
function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value); // Trata símbolos especiais (C, =, ←, +, -, ×, ÷)
    } else {
        handleNumber(value); // Trata números
    }
    screen.innerText = buffer; // Atualiza a tela com o conteúdo do buffer
}

// Função para tratar símbolos especiais
function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return; // Sai se não houver operador anterior
            }
            flushOperation(parseInt(buffer)); // Executa a operação pendente
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol); // Lida com operadores matemáticos
            break;
    }    
}

// Função para lidar com operadores matemáticos
function handleMath(symbol) {
    if (buffer === '0') {
        return; // Sai se o buffer estiver vazio
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer); // Executa operação pendente se existir
    }
    previousOperator = symbol;
    buffer = '0';
}

// Função para executar uma operação
function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

// Função para tratar números
function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

// Função de inicialização
function init() {
    // Adiciona um ouvinte de evento aos botões da calculadora
    document.querySelector('.calc-buttons')
        .addEventListener('click', function (event) {
            buttonClick(event.target.innerText);
        });
}

// Inicializa a calculadora
init();