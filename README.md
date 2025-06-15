# Sistema de Loja QTS

Sistema simples criado com o intuito da apresentação sobre testes funcionais e não funcionais de Qualidade e Teste de Software.

## Integrantes

- Davi Felix
- Eduardo Soares
- Gian Pablo
- Miguel Alves
- Enzo Vinícius

## Testes Inclusos

### Sistema

Este sistema é uma API RESTful desenvolvida em Python + Flask, que permite armazenamento, leitura, atualização e exclusão de arquivos de texto enviados por meio de requisições HTTP. Por padrão, somente 5 arquivos são permitidos simultaneamente, mas caso exatamente 5 sejam armazenados, o sistema automaticamente "escalará" para permitir até 10 arquivos, salvando-os em uma subpasta diferente (simulando outro servidor).

<details>
<summary>Teste de Stress</summary>

### Necessidades do Teste

Verificar:

- Se a autenticação funciona corretamente.
- Se o sistema permite realizar uma compra com sucesso.Add commentMore actions
- Se a interface atende à necessidade de usabilidade e clareza esperadas para diferentes perfis de usuários.
- Se diferentes modos de uso realmente facilitam ou dificultam a experiência (UX).

### Plano de testes

A validação vai considerar:

- Testes funcionais: login e compra funcionando corretamente.
- Testes de aceitação simulada: execução manual das três interfaces por alunos (ou observadores) e análise da experiência.

</details>

<details>
<summary>Teste de Escalabilidade</summary>
</details>

<details>
<summary>Teste de Confiabilidade</summary>
</details>

<details>
<summary>Teste de Segurança</summary>
</details>
