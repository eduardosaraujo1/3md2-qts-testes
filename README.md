# Testes para Dashboard

Sistema simples criado com o intuito da apresentação sobre os testes de compartibilidade e mantainabilidade

## Integrantes

- Davi Felix
- Eduardo Soares
- Gian Pablo
- Miguel Alves
- Enzo Vinícius

## Testes Inclusos

#### Sistema

Gerenciamento de Configurações.

- Interface web interativa para configurar parâmetros de um sistema fictício.
- Dividido em seções temáticas:
  - Aparência & Tema
  - Sistema & Performance
  - Usuários & Segurança
  - Notificações
- Ideal para simular cenários de testes de software em sistemas com UI realista e lógica interativa.

#### Funcionalidades

- Interface responsiva (mobile e desktop)
- Preview de configurações em JSON em tempo real
- Salvamento, carregamento, exportação e reset de configurações
- Indicadores visuais de status do sistema
- Notificações de sucesso ou erro
- Persistência em memória (sem localStorage, por compatibilidade)
- Animações suaves com efeitos modernos
- Compatibilidade com interações em tempo real

<details>
<summary>Teste de Mantainabilidade</summary>

#### Necessidades do Teste

Avaliar a facilidade com que novos desenvolvedores conseguem modificar o sistema, mesmo sem conhecimento prévio do projeto. Esse teste é essencial para garantir que a estrutura de código seja clara, modular e sustentável no longo prazo.

Aspectos que o teste deve observar:

- Clareza e organização do código-fonte (HTML, CSS, JS)
- Separação de responsabilidades (ex: lógica vs apresentação)
- Dificuldade percebida em alterar ou adicionar funcionalidades
- Tempo gasto para realizar alterações comuns

#### Plano de Testes

Simular a atuação de um novo desenvolvedor na equipe.

- Medir o tempo necessário para realizar mudanças específicas, como:
  - Alterar a cor primária do tema
  - Modificar o comportamento de uma notificação
- Anotar dificuldades encontradas e complexidade percebida em cada parte do código.
- Registrar sugestões de melhoria na estrutura do projeto para facilitar futuras manutenções.

</details>

<details>
<summary>Teste de Compatibilidade</summary>

#### Necessidades do Teste

Garantir que o sistema funcione corretamente em dispositivos móveis, especialmente Android. Como o sistema usa animações e visualizações em tempo real, é necessário testar fluidez, legibilidade e interatividade em diferentes tamanhos de tela e navegadores.

#### Foco do teste:

- Layout responsivo
- Funcionalidade de botões e ações
- Exibição correta do preview JSON
- Compatibilidade com diferentes navegadores móveis

#### Plano de Testes

- Acessar o sistema usando diferentes navegadores móveis (Chrome, Firefox, etc.) em dispositivos Android.
- Verificar se todos os recursos funcionam corretamente:
  - Interface responsiva (visual e usabilidade)
  - Preview JSON
  - Botões de salvar/carregar/resetar
  - Notificações visuais
- Identificar possíveis problemas de layout, desempenho ou interatividade.
- Registrar inconsistências ou limitações específicas de algum navegador ou versão de sistema.

</details>
