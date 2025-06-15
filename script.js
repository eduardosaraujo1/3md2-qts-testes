const CRITERIA = 200;
const MAX_ARRAY_SIZE = 15000;
const STEP = 100;
const QUANTIDADE_TESTES = 1;

document.getElementById("criteriaValue").textContent = CRITERIA;
document.querySelectorAll(".criteria-text").forEach((el) => {
  el.textContent = CRITERIA;
});

function generateRandomArray(size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 1000));
  }
  return arr;
}

function getEnabledAlgs() {
  return {
    quick: document.querySelector("#quick").checked,
    bubble: document.querySelector("#bubble").checked,
    stooge: document.querySelector("#stooge").checked,
  };
}

function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];

  for (let element of arr) {
    if (element < pivot) {
      left.push(element);
    } else if (element > pivot) {
      right.push(element);
    } else {
      equal.push(element);
    }
  }

  return [...quickSort(left), ...equal, ...quickSort(right)];
}

function stoogeSort(arr, i = 0, j = arr.length - 1) {
  if (i >= j) return arr;

  // Se o primeiro elemento é maior que o último, troca
  if (arr[i] > arr[j]) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // Se há mais de 2 elementos
  if (j - i + 1 > 2) {
    const t = Math.floor((j - i + 1) / 3);

    // Recursivamente ordena os primeiros 2/3
    stoogeSort(arr, i, j - t);

    // Recursivamente ordena os últimos 2/3
    stoogeSort(arr, i + t, j);

    // Recursivamente ordena os primeiros 2/3 novamente
    stoogeSort(arr, i, j - t);
  }

  return arr;
}

function bubbleSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    // Last i elements are already in place
    for (var j = 0; j < arr.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      if (arr[j] > arr[j + 1]) {
        // If the condition is true
        // then swap them
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

function measureTime(func, arr) {
  let total = 0;

  for (let i = 0; i < QUANTIDADE_TESTES; i++) {
    const arrCopy = [...arr]; // Garante que func não altere o array original
    const start = performance.now();
    func(arrCopy);
    const end = performance.now();
    total += end - start;
  }

  const average = total / QUANTIDADE_TESTES;
  return Math.round(average * 100) / 100; // Arredonda para 2 casas decimais
}

function addResultRow(size, quickTime, bubbleTime, stoogeTime) {
  const tbody = document.getElementById("resultsBody");
  const row = tbody.insertRow();
  const algs = getEnabledAlgs();

  const sizeCell = row.insertCell();
  sizeCell.textContent = size.toLocaleString();
  sizeCell.className = "number-cell";

  const quickTimeCell = row.insertCell();
  quickTimeCell.textContent = algs["quick"] ? quickTime : "N/A";
  quickTimeCell.className = quickTime > CRITERIA ? "time-bad" : "time-good";

  const bubbleTimeCell = row.insertCell();
  bubbleTimeCell.textContent = algs["bubble"] ? bubbleTime : "N/A";
  bubbleTimeCell.className = bubbleTime > CRITERIA ? "time-bad" : "time-good";

  const stoogeTimeCell = row.insertCell();
  stoogeTimeCell.textContent = algs["stooge"] ? stoogeTime : "N/A";
  stoogeTimeCell.className = stoogeTime > CRITERIA ? "time-bad" : "time-good";
}

// Função principal do teste
async function runTest() {
  const startBtn = document.getElementById("startBtn");
  const status = document.getElementById("status");
  const tbody = document.getElementById("resultsBody");
  const algs = getEnabledAlgs();

  startBtn.disabled = true;
  startBtn.innerHTML = 'Testando... <div class="loading"></div>';
  tbody.innerHTML = "";

  for (let size = STEP; size <= MAX_ARRAY_SIZE; size += STEP) {
    status.textContent = `Testando array de tamanho ${size.toLocaleString()}...`;

    // Pequeno delay para atualizar a UI
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Gera array aleatório
    const testArray = generateRandomArray(size);

    // Teste Quick Sort
    let quickTime;
    if (algs["quick"]) {
      quickTime = measureTime(quickSort, testArray);
    }

    // Teste Quick Sort
    let bubbleTime;
    if (algs["bubble"]) {
      bubbleTime = measureTime(bubbleSort, testArray);
    }

    // Teste Stooge Sort
    let stoogeTime;
    if (algs["stooge"]) {
      stoogeTime = measureTime(stoogeSort, testArray);
    }

    // Adiciona resultado na tabela
    addResultRow(size, quickTime, bubbleTime, stoogeTime);

    if (size >= MAX_ARRAY_SIZE) {
      status.textContent = `Teste concluído: tamanho máximo de ${MAX_ARRAY_SIZE} atingido`;
      break;
    }
  }

  if (status.textContent.includes("Testando")) {
    status.textContent = "Teste concluído com sucesso!";
  }

  startBtn.disabled = false;
  startBtn.innerHTML = "Iniciar Teste";
}

// Event listener para o botão
document.getElementById("startBtn").addEventListener("click", runTest);
