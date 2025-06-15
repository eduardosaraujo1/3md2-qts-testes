#include <iostream>
using namespace std;

const string alphabet = "abcdefghijklmnopqrstuvxz";
const string vowels = "aeiou";
const int vowel_count = 5;
int index_vowels[vowel_count];

bool is_vowel(char letter)
{
    for (char c : vowels)
    {
        if (c == letter)
        {
            return true;
        }
    }

    return false;
}

char nearest_vowel(char letter)
{
    int index_letter = alphabet.find(letter);
    char current_vowel = 'a';
    int current_distance = 1000;

    for (int i = vowel_count - 1; i >= 0; i--)
    {
        char vowel = vowels[i];
        char index = index_vowels[i];
        int distance = abs(index - index_letter);

        if (distance <= current_distance)
        {
            current_vowel = vowel;
            current_distance = distance;
        }
    }

    return current_vowel;
}

char next_consoant(char letter)
{
    int len_alphabet = alphabet.length();
    int index_letter = alphabet.find(letter);

    if (index_letter < 0)
    {
        return letter;
    }

    for (int i = index_letter + 1; i < len_alphabet; i++)
    {
        if (!is_vowel(alphabet[i]))
        {
            return alphabet[i];
        }
    }

    return letter;
}

int main()
{
    // Pré-calcular posição de todas as vogais
    for (int i = 0; i < vowel_count; i++)
    {
        index_vowels[i] = alphabet.find(vowels[i]);
    }

    char result;

    result = next_consoant('a');
    if (result != 'b')
    {
        cout << "Erro em next_consoant('a'):\n";
        cout << "  Esperado: 'b'\n";
        cout << "  Obtido:   '" << result << "'\n";
        return 1;
    }

    result = next_consoant('d');
    if (result != 'f')
    {
        cout << "Erro em next_consoant('d'):\n";
        cout << "  Esperado: 'f'\n";
        cout << "  Obtido:   '" << result << "'\n";
        return 1;
    }

    if (is_vowel('e') != true)
    {
        cout << "Erro em is_vowel('e'):\n";
        cout << "  Esperado: true\n";
        cout << "  Obtido:   false\n";
        return 1;
    }

    if (is_vowel('f') != false)
    {
        cout << "Erro em is_vowel('f'):\n";
        cout << "  Esperado: false\n";
        cout << "  Obtido:   true\n";
        return 1;
    }

    result = nearest_vowel('l');
    if (result != 'i')
    {
        cout << "Erro em nearest_vowel('l'):\n";
        cout << "  Esperado: 'i'\n";
        cout << "  Obtido:   '" << result << "'\n";
        return 1;
    }

    result = nearest_vowel('c');
    if (result != 'a')
    {
        cout << "Erro em nearest_vowel('c'):\n";
        cout << "  Esperado: 'a'\n";
        cout << "  Obtido:   '" << result << "'\n";
        return 1;
    }

    result = nearest_vowel('z');
    if (result != 'u')
    {
        cout << "Erro em nearest_vowel('z'):\n";
        cout << "  Esperado: 'u'\n";
        cout << "  Obtido:   '" << result << "'\n";
        return 1;
    }

    cout << "Todos os testes passaram.\n";
    return 0;
}
