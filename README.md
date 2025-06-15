# Testes para Cifra da Nlogônia

Sistema simples criado com o intuito da apresentação sobre o teste uinit[ario]

## Integrantes

- Davi Felix
- Eduardo Soares
- Gian Pablo
- Miguel Alves
- Enzo Vinícius

## Testes Inclusos

<details>
<summary>Teste de Unidade</summary>

### Sistema

Este sistema é um módulo auxiliar para a cifragem de documentos baseada em substituição de consoantes, segundo regras específicas de transformação.

Alfabeto considerado:

- `a b c d e f g h i j k l m n o p q r s t u v x z`

Vogais consideradas:

- `a e i o u`

Regras da cifragem:

- Para cada consoante, ela é substituída por três letras, nessa ordem:
  - A própria consoante original.
  - A vogal mais próxima da consoante original, com base na distância dentro do alfabeto.
    - Se a distância for igual entre duas vogais, escolhe-se a que aparece antes no alfabeto.
  - A próxima consoante no alfabeto, ignorando vogais.
- Vogais não são modificadas na cifragem.

#### Necessidades do Teste

O objetivo dos testes é verificar se as funções auxiliares da lógica de cifragem estão corretas e seguem rigorosamente as regras definidas:

- Identificar se uma letra é vogal (is_vowel)
- Encontrar a próxima consoante após uma letra dada (next_consoant)
- Determinar a vogal mais próxima de uma consoante (nearest_vowel)

Todos os testes devem passar sem erros. Caso contrário, o sistema de cifra pode produzir saídas incorretas.

#### Plano de Testes

| Função testada  | Entrada | Saída esperada | Descrição                                                       |
| --------------- | ------- | -------------- | --------------------------------------------------------------- |
| `next_consoant` | `'a'`   | `'b'`          | A próxima consoante após `'a'` é `'b'`                          |
| `next_consoant` | `'d'`   | `'f'`          | A próxima consoante após `'d'` é `'f'`                          |
| `is_vowel`      | `'e'`   | `true`         | `'e'` está na lista de vogais                                   |
| `is_vowel`      | `'f'`   | `false`        | `'f'` não está na lista de vogais                               |
| `nearest_vowel` | `'l'`   | `'i'`          | `'i'` é a vogal mais próxima de `'l'`                           |
| `nearest_vowel` | `'c'`   | `'a'`          | `'c'` está entre `'a'` e `'e'`, mas `'a'` vem antes no alfabeto |
| `nearest_vowel` | `'z'`   | `'u'`          | `'u'` é a vogal mais próxima de `'z'`                           |

</details>
