# Organizador - Teste de Desempenho

Aplicativo simples criado para comparar três algorítimos de organizar números em uma pilha

## Integrantes

- Davi Felix
- Eduardo Soares
- Gian Pablo
- Miguel Alves
- Enzo Vinícius

## Testes Inclusos

<details>
<summary>Teste de Performance</summary>

### Sistema

Funções utilizadas em sistemas de organizar livros por ordem alfabética, chamados "algorítimos de ordenação". Os sistemas são:

- Quick Sort: Algoritmo eficiente com complexidade O(n log n) em média, usando estratégia de divisão e conquista com pivot.
- Bubble Sort: Algoritmo ineficiente com complexidade O(n^2) em média
- Stooge Sort: Algoritmo ineficiente com complexidade O(n^2.7), implementado recursivamente com divisão em terços.

### Necessidades do Teste

Verificar:

- Se todos os algoritmos de ordenação retornam valores válidos sem quebrarem com o aumento de
- Identificar qual a carga máxima que pode afetar o algorítmo
- Verificar como o algorítmo reage a cargas grandes

### Critérios de Sucesso

- Os algoritmos produzem resultados corretos (arrays completamente ordenados) em 100% dos testes.
- A diferença de performance entre Quick Sort, Bubble Sort e Stooge Sort é abaixo ou igual ao critério limitador de 200 ms para arrays de 15.000 dígitos

</details>
