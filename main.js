let pedidos = []; // Criando array de pedidos

function fazerPedido(nomeDoProduto) {
  // FUnção de fazer pedido
  pedidos.push(nomeDoProduto);
}

function verificarPedido(nomeDoProduto) {
  // FUnção de Verificar pedido
  return pedidos.includes(nomeDoProduto);
}
function testeIntegracao() {
  // Fazendo o pedido
  fazerPedido("Pizza");

  // Verificando se o produto cadastrado (pizza) existe
  let pedidoExiste = verificarPedido("Pizza");

  if (pedidoExiste) {
    // Verificando o resultado
    console.log("Passou!");
  } else {
    console.log("Pedido não foi salvo corretamente");
  }
}

testeIntegracao();
