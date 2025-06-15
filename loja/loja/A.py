import os

produtos = ["Camiseta", "Tênis", "Boné", "Calça", "Relógio"]

def mostrar_menu():
    print("\nProdutos disponíveis:")
    for i, p in enumerate(produtos, 1):
        print(f"{i}. {p}")
    print("Digite o número do produto para comprar. 0 para sair.")

def comprar(produto):
    print(f"Compra de '{produto}' concluída com êxito! Pressione 0 para continuar.")
    while input() != "0":
        pass
    os.system('cls' if os.name == 'nt' else 'clear')

    return produto;

def main():
    while True:
        mostrar_menu()
        escolha = input("Opção: ")
        if escolha == "0":
            break
        elif escolha.isdigit() and 1 <= int(escolha) <= len(produtos):
            return comprar(produtos[int(escolha) - 1])
        else:
            print("Opção inválida.")

if __name__ == "__main__":
    main()
