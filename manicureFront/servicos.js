//----------------------MODAIS ADICIONAR/EDITAR----------------------//

let modalEditar;
let clienteIdEditando = null;
document.addEventListener("DOMContentLoaded", () => {
  //Modal Adcionar
  const adicionarButton = document.querySelector(".btn-adicionar");
  const modal = document.getElementById("adicionar-modal");
  const closeButton = document.querySelector(".close[data-modal='adicionar-modal']");
  const adicionarForm = document.getElementById("adicionar-form");
  
   //Modal editar (verificando se o modal existe)
   modalEditar = document.getElementById("editar-modal");
   if (!modalEditar) {
     console.error("Modal de edição não encontrado no DOM.");
   }
   const closeButtonEditar = document.querySelector(".close[data-modal='editar-modal']");
   const editarForm = document.getElementById("editar-form");

  // Abrir modal ao clicar no botão
  adicionarButton.addEventListener("click", () => {
      modal.style.display = "block";
  });

  // Fechar modal ao clicar no botão de fechar
  closeButton.addEventListener("click", () => {
      modal.style.display = "none";
  });

  // Fechar modal ao clicar fora do conteúdo do modal
  window.addEventListener("click", (event) => {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });

  //----------------------ADICIONAR SERVIÇO----------------------//

  // Enviar dados do formulário via POST para a API
  adicionarForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;

    const clienteData = {
      nome: nome,
      preco: parseFloat(preco)
    };

    try {
      const response = await fetch('https://manicure-projetodeextensao.onrender.com/servicos', {
      // const response = await fetch("http://localhost:8080/servicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(clienteData)
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar cliente");
      }

      const data = await response.json();

      modal.style.display = "none";

      await fetchClientes();

    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
    }
  });
  
  //----------------------EDITAR SERVIÇO----------------------//

  // Fechar modal de edição
  closeButtonEditar.addEventListener("click", () => {
    modalEditar.style.display = "none";
  });

   // Enviar dados de edição via PUT para a API
  editarForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nomeEditado").value;
    const preco = document.getElementById("precoEditado").value;

    const servicoData = {
      nome: nome,
      preco: parseFloat(preco)
    };

    console.log("Dados a serem enviados para edição:", servicoData);
    try {
      const response = await fetch(`https://manicure-projetodeextensao.onrender.com/servicos/${servicoIdEditando}`, {
      // const response = await fetch(`http://localhost:8080/servicos/${servicoIdEditando}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(servicoData)
      });

      if (!response.ok) {
        throw new Error("Erro ao editar servico");
      }

      const data = await response.json();
      modalEditar.style.display = "none";
      await fetchClientes();

    } catch (error) {
      console.error("Erro ao editar cliente:", error);
    }
  });
});

// Função para editar um cliente
function editarServico(servico) {
  servicoIdEditando = servico.id;
  document.getElementById("nomeEditado").value = servico.nome;
  document.getElementById("precoEditado").value = servico.preco;

  if (modalEditar) {
    modalEditar.style.display = "block";
  } else {
    console.error("Modal de edição não encontrado.");
  }
}

//----------------------BUSCAR DADOS----------------------//

  async function fetchClientes() {
    try {
      const response = await fetch('https://manicure-projetodeextensao.onrender.com/servicos');
      // const response = await fetch('http://localhost:8080/servicos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      populateTable(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

//----------------------EXCLUSÃO----------------------//

  async function deleteCliente(servicoId, row) {
    try {
      const response = await fetch(`https://manicure-projetodeextensao.onrender.com/servicos/${servicoId}`, {
      // const response = await fetch(`http://localhost:8080/servicos/${servicoId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Erro ao excluir servico");
      }
      row.remove();
    } catch (error) {
      console.error("Erro na requisição DELETE:", error);
    }
  }
  //Modal de exclusão
  document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const row = event.target.closest("tr");
      const clienteId = event.target.getAttribute("data-id");
  
      // Exibe o modal
      const modalExcluir = document.getElementById("apagar-modal");
      modalExcluir.style.display = "block";

      // botão "Excluir" no modal
      const excluirButton = modalExcluir.querySelector("button:last-of-type");
      excluirButton.onclick = async () => {
        await deleteCliente(clienteId, row);
        modalExcluir.style.display = "none";
      };

      // botão "Cancelar" no modal
      const cancelarButton = modalExcluir.querySelector("button:first-of-type");
      cancelarButton.onclick = () => {
        modalExcluir.style.display = "none"; 
      };
    }
  });

  //----------------------POPULAR TABELA----------------------//

  function populateTable(services) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = '';
  
    services.forEach(service => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${service.nome}</td>
        <td>R$${service.preco}
          <span class="actions">
              <button class="edit-btn" data-id="${service.id}">✏️</button>
              <button class="delete-btn" data-id='${service.id}'>🗑️</button>
          </span>
        </td>
      `;
      const editButton = row.querySelector(".edit-btn");
      editButton.addEventListener("click", () => editarServico(service));
      tableBody.appendChild(row);
    });
  }
  window.onload = async () => {
    await fetchClientes();
};