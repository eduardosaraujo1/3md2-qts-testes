import os
from loja.A import main as lojaA
from loja.B import main as lojaB

def autenticar(usuario, senha):
    return usuario == "admin" and senha == "1234"

def main():
    print("Login da Loja")
    usuario = input("Usuário: ")
    senha = input("Senha: ")

    if autenticar(usuario, senha):
        print("Login bem-sucedido!")
        print("===================")
        print("Teste de Validação")
        print("===================")
        print("Escolha a versão da loja: [A] Números | [B] Setas")
        versao = input("Versão: ").upper()
        if versao == "A":
            os.system('cls' if os.name == 'nt' else 'clear')
            lojaA()
        elif versao == "B":
            os.system('cls' if os.name == 'nt' else 'clear')
            lojaB()
        else:
            print("Versão inválida.")
    else:
        print("Usuário ou senha incorretos.")

if __name__ == "__main__":
    main()
