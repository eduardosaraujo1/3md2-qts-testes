from login import autenticar

def test_login_valido():
    assert autenticar("admin", "1234")

def test_login_invalido():
    assert not autenticar("admin", "senhaerrada")
