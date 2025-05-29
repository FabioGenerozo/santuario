// Configuração do Firebase
const firebaseConfig = {
  databaseURL: "https://patrimonio-santuario-bjp-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const estoqueRef = database.ref("estoque");
const solicitacoesRef = database.ref("solicitacoes");

// Mostrar lista de estoque
estoqueRef.on("value", (snapshot) => {
  const lista = document.getElementById("listaEstoque");
  lista.innerHTML = "";

  snapshot.forEach((childSnapshot) => {
    const item = childSnapshot.val();
    const li = document.createElement("li");
    li.textContent = `${item.nome} - ${item.quantidade} unidades`;
    lista.appendChild(li);
  });
});

// Enviar solicitação de item
document.getElementById("solicitarForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const solicitante = document.getElementById("solicitante").value;
  const itemSolicitado = document.getElementById("itemSolicitado").value;
  const quantidadeSolicitada = parseInt(document.getElementById("quantidadeSolicitada").value);
  const observacao = document.getElementById("observacao").value;

  const novaSolicitacao = {
    solicitante,
    item: itemSolicitado,
    quantidade: quantidadeSolicitada,
    observacao,
    data: new Date().toLocaleString()
  };

  solicitacoesRef.push(novaSolicitacao);

  document.getElementById("solicitarForm").reset();
  document.getElementById("mensagemSucesso").textContent = "Solicitação enviada com sucesso!";

  setTimeout(() => {
    document.getElementById("mensagemSucesso").textContent = "";
  }, 4000);
});
