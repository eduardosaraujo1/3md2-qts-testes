from loja.A import comprar
from loja.A import main

def test_compra_simples(monkeypatch):
    entradas = iter(["0"])
    monkeypatch.setattr("builtins.input", lambda: next(entradas))

    comprar("Camiseta")

def test_compra_completa(monkeypatch):
    entradas = iter(["4", "0", "0"])
    monkeypatch.setattr("builtins.input", lambda: next(entradas))

    main();
    