// Configuração do Firebase
const firebaseConfig = {
  databaseURL: "https://patrimonio-santuario-bjp-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const estoqueRef = database.ref("estoque");

// Adicionar item
document.getElementById("itemForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);

  const novoItem = {
    nome,
    quantidade
  };

  estoqueRef.push(novoItem);

  document.getElementById("itemForm").reset();
});

// Listar itens
estoqueRef.on("value", (snapshot) => {
  const lista = document.getElementById("listaEstoque");
  lista.innerHTML = "";

  snapshot.forEach((childSnapshot) => {
    const key = childSnapshot.key;
    const item = childSnapshot.val();

    const li = document.createElement("li");
    li.textContent = `${item.nome} - ${item.quantidade} unidades`;

    const btn = document.createElement("button");
    btn.textContent = "Remover";
    btn.onclick = () => {
      estoqueRef.child(key).remove();
    };

    li.appendChild(btn);
    lista.appendChild(li);
  });
});
