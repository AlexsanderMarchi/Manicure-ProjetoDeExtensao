// document.addEventListener("DOMContentLoaded", () => {
//     // URL da API
//     const apiUrl = "https://manicure-projetodeextensao.onrender.com/api/endpoint"; // Altere para o seu endpoint real

//     // Função para fazer o fetch
//     const fetchData = async () => {
//         try {
//             const response = await fetch(apiUrl);
//             // Verifica se a resposta foi bem-sucedida
//             if (!response.ok) {
//                 throw new Error(`Erro: ${response.status}`);
//             }
//             const data = await response.json(); // Ou response.text() se a resposta não for JSON

//             // Manipule os dados conforme necessário
//             console.log(data);
//             // Por exemplo, exiba os dados na página
//             displayData(data);
//         } catch (error) {
//             console.error("Erro ao buscar dados:", error);
//         }
//     };

//     // Função para exibir os dados na página
//     const displayData = (data) => {
//         const mainContent = document.querySelector('.main-content');
//         const dataList = document.createElement('ul');

//         data.forEach(item => {
//             const listItem = document.createElement('li');
//             listItem.textContent = item.name; // Altere 'name' para a propriedade desejada
//             dataList.appendChild(listItem);
//         });

//         mainContent.appendChild(dataList);
//     };

//     // Chama a função fetchData
//     fetchData();
// });

async function fetchServices() {
    try {
      const response = await fetch('https://manicure-projetodeextensao.onrender.com/agendamentos'); // Substitua pela URL real da API
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      populateTable(data);
      const totalAgendamentos = data.length; // Conta a quantidade de agendamentos
      document.getElementById('totalAgendamentos').textContent = totalAgendamentos;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  // Função para popular a tabela
  function populateTable(services) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ''; // Limpa o conteúdo anterior

    services.forEach(service => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${service.cliente.nome} ${service.cliente.sobreNome}</td>
        <td>${service.dia} às ${service.hora}</td>
        <td>
          <span class="status"></span>
          Status não definido
        </td>
      `;

      tableBody.appendChild(row);
    });
  }

  // Chama a função para buscar os dados quando a página carregar
  window.onload = fetchServices;