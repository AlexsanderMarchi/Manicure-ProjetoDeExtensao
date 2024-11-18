
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
  const cleaned = telefone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
      return `${match[1]} ${match[2]}-${match[3]}`;
  }
  return telefone;
}

  async function fetchClientes() {
    try {
      const response = await fetch('https://manicure-projetodeextensao.onrender.com/clientes');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      populateTable(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }


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
              <button class="delete-btn">🗑️</button>
          </span>
        </td>
      `;
  
      tableBody.appendChild(row);
    });
  }


  window.onload = async () => {
    await fetchClientes();
};