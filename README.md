# Sistema de Loja QTS

Sistema simples criado com o intuito da apresentação sobre testes funcionais e não funcionais de Qualidade e Teste de Software.

## Integrantes

- Davi Felix
- Eduardo Soares
- Gian Pablo
- Miguel Alves
- Enzo Vinícius

## Testes Inclusos

<details>
<summary>Teste de Validação</summary>

### Sistema

Um sistema de loja simples, executado em terminal. Ele possui:

- Uma tela de login com usuário e senha hardcoded.
- Três versões da interface de loja, que o usuário pode acessar após o login:
  - Versão A (Loja A): o usuário digita o número do produto para comprar.
  - Versão B (Loja B): o usuário navega pelos produtos com as teclas ↑/↓ ou J/K, e pressiona ENTER para comprar.

### Necessidades do Teste

Verificar:

- Se o sistema segue funcionando (refazer os testes anteriores)
- Se a mudança feita no sistema

### Plano de testes

A validação vai considerar:

- Testes funcionais: login e compra funcionando corretamente.
- Testes de aceitação simulada: execução manual das três interfaces por alunos (ou observadores) e análise da experiência.

### Critérios de sucesso

- O usuário entende como navegar e comprar.
- O sistema responde conforme esperado.
- A interface facilita ou dificulta a jornada de compra.

### Fluxo para o teste

- Rodar a aplicação com python `login.py`.
- Após login bem-sucedido, escolher qual versão da loja será testada (A, B).
- Realizar o processo de compra e avaliar:
  - Funcionamento correto.
  - Clareza das instruções.
  - Intuitividade da interface.
- Em seguida, opcionalmente, executar `pytest` para validar ambos dos sistemas

### Testes automáticos planejados

Com pytest, serão implementados:

- Teste de login com credenciais válidas e inválidas.
- Teste de função de compra (independente da interface visual), para garantir que o pedido seja registrado.
</details>
