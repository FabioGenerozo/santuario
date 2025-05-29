// Configuração Firebase
const firebaseConfig = {
  databaseURL: "https://patrimonio-santuario-bjp-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const estoqueRef = database.ref("estoque");
const solicitacoesRef = database.ref("solicitacoes");

// Exibir estoque
estoqueRef.on("value", (snapshot) => {
  const lista = document.getElementById("listaEstoque");
  if (lista) {
    lista.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      const li = document.createElement("li");
      li.textContent = `${item.nome} - ${item.quantidade} unidades`;
      lista.appendChild(li);
    });
  }
});

// Finalizar solicitação (salvar no banco)
document.getElementById("solicitarForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const solicitante = document.getElementById("solicitante").value.trim();
  const departamento = document.getElementById("departamento").value.trim();
  const itemSolicitado = document.getElementById("itemSolicitado").value.trim();
  const quantidadeSolicitada = parseInt(document.getElementById("quantidadeSolicitada").value);

  if (!solicitante || !departamento || !itemSolicitado || !quantidadeSolicitada) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const novaSolicitacao = {
    solicitante,
    departamento,
    item: itemSolicitado,
    quantidade: quantidadeSolicitada,
    data: new Date().toLocaleString()
  };

  solicitacoesRef.push(novaSolicitacao);

  document.getElementById("solicitarForm").reset();
  document.getElementById("mensagemSucesso").textContent = "Solicitação registrada com sucesso!";

  setTimeout(() => {
    document.getElementById("mensagemSucesso").textContent = "";
  }, 4000);
});

// Listar solicitações registradas
solicitacoesRef.on("value", (snapshot) => {
  const lista = document.getElementById("listaSolicitacoes");
  lista.innerHTML = "";

  snapshot.forEach((childSnapshot) => {
    const s = childSnapshot.val();

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${s.solicitante}</strong> (${s.departamento}) - 
      ${s.item} (${s.quantidade}) - ${s.data}
    `;

    lista.appendChild(li);
  });
});
