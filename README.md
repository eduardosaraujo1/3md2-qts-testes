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
<summary>Teste de Regressão</summary>

### Sistema

Um sistema de loja simples, executado em terminal. Ele possui:

- Uma tela de login com usuário e senha hardcoded.
- Três versões da interface de loja, que o usuário pode acessar após o login:
  - Versão A (Loja A): o usuário digita o número do produto para comprar.
  - Versão B (Loja B): o usuário navega pelos produtos com as teclas ↑/↓ ou J/K, e pressiona ENTER para comprar.

### Necessidades do Teste

Verificar:

- Se os componentes anteriores seguem funcionando da mesma forma

### Plano de testes

A validação vai considerar:

- Testes funcionais: login e compra funcionando corretamente.

### Critérios de sucesso

- O sistema responde conforme esperado pelos testes anteriores.

### Fluxo para o teste

- Em seguida, opcionalmente, executar `pytest` para efetuar regressão
- Rodar a aplicação com python `login.py`.
- Realizar o processo de compra e avaliar:

  - Funcionamento correto.
  - Clareza das instruções.
  - Intuitividade da interface.

</details>
