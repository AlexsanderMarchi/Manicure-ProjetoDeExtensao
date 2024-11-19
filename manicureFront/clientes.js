
document.addEventListener("DOMContentLoaded", () => {
  const adicionarButton = document.querySelector(".btn-adicionar");
  const modal = document.getElementById("adicionar-modal");
  const closeButton = document.querySelector(".close[data-modal='adicionar-modal']");

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
});

function formatarTelefone(telefone) {
  const telefoneStr = String(telefone);
  const cleaned = telefoneStr.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
      return `${match[1]} ${match[2]}-${match[3]}`;
  }
  return telefoneStr;
}

//Get
  async function fetchClientes() {
    try {
      const response = await fetch('https://manicure-projetodeextensao.onrender.com/clientes');
      // const response = await fetch('http://localhost:8080/clientes');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      populateTable(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

//Delete
  async function deleteCliente(clienteId, row) {
    try {
      const response = await fetch(`https://manicure-projetodeextensao.onrender.com/clientes/${clienteId}`, {
      // const response = await fetch(`http://localhost:8080/clientes/${clienteId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Erro ao excluir cliente");
      }
      row.remove();
      alert("Cliente excluído com sucesso!");
    } catch (error) {
      console.error("Erro na requisição DELETE:", error);
      alert("Erro ao excluir cliente.");
    }
  }
  document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const row = event.target.closest("tr");
      const clienteId = event.target.getAttribute("data-id");
  
      if (confirm("Tem certeza que deseja excluir este cliente?")) {
        await deleteCliente(clienteId, row);
      }
    }
  });

  // Função para popular a tabela
  function populateTable(services) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = '';
  
    services.forEach(service => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${service.nome} ${service.sobreNome}</td>
        <td>${formatarTelefone(service.telefone)}</td>
        <td>${service?.email ? service.email : "--"}
          <span class="actions">
              <button class="edit-btn">✏️</button>
              <button class="delete-btn" data-id='${service.telefone}'>🗑️</button>
          </span>
        </td>
      `;
  
      tableBody.appendChild(row);
    });
  }


  window.onload = async () => {
    await fetchClientes();
};