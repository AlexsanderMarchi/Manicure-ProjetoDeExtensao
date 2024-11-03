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
function formatarTelefone(telefone) {
  const cleaned = telefone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
      return `${match[1]} ${match[2]}-${match[3]}`;
  }
  return telefone;
}

async function fetchAgendamentos() {
    try {
      const response = await fetch('https://manicure-projetodeextensao.onrender.com/agendamentos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      populateTable(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async function fetchEmpregados() {
    try {
      const response = await fetch('https://manicure-projetodeextensao.onrender.com/empregados');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      populateDivs(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async function fetchTotalClientes() {
    try {
      const response = await fetch('https://manicure-projetodeextensao.onrender.com/clientes/total');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const totalClientes = await data;
      document.getElementById('totalClientes').textContent = totalClientes;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async function fetchTotalProdutos() {
    try {
      const response = await fetch('https://manicure-projetodeextensao.onrender.com/produtos/total');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const totalProdutos = await data;
      document.getElementById('totalProdutos').textContent = totalProdutos;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async function fetchTotalAgendamentos() {
    try {
      const response = await fetch('https://manicure-projetodeextensao.onrender.com/agendamentos/total');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const totalAgendamentos = await data;
      document.getElementById('totalAgendamentos').textContent = totalAgendamentos;
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
        <td>${service.cliente.nome} ${service.cliente.sobreNome}</td>
        <td>${service.dia} às ${service.hora}</td>
        <td>${formatarTelefone(service.cliente.telefone)}</td>
      `;

      tableBody.appendChild(row);
    });
  }

  function populateDivs(empregados) {
    const cardBody = document.querySelector('.empregados_container'); // Seleciona a div onde os empregados serão adicionados
    cardBody.innerHTML = ''; // Limpa a div antes de adicionar novos dados

    empregados.forEach(empregado => {
        const customerDiv = document.createElement('div');
        customerDiv.classList.add('customer');

        customerDiv.innerHTML = `
            <div class="info">
                <img src="img2.jpg" width="40px" height="40px" alt="" />
                <div>
                    <h4>${empregado.nome} ${empregado.sobreNome}</h4>
                    <small>${empregado.cargo}</small>
                </div>
            </div>
            <div class="contact">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M17 13.5a1.5 1.5 0 0 0-1.5-1.5h-7A1.5 1.5 0 0 0 7 13.5v.5c0 1.971 1.86 4 5 4s5-2.029 5-4zm-2.25-5.25a2.75 2.75 0 1 0-5.5 0a2.75 2.75 0 0 0 5.5 0M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-1.5 0a8.5 8.5 0 1 0-17 0a8.5 8.5 0 0 0 17 0" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M6 14h8v-2H6zm0-3h12V9H6zm0-3h12V6H6zM2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm3.15-6H20V4H4v13.125zM4 16V4z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z" />
                </svg>
            </div>
        `;

        cardBody.appendChild(customerDiv);
    });
}

  window.onload = async () => {
    await fetchAgendamentos();
    await fetchEmpregados();
    await fetchTotalClientes();
    await fetchTotalProdutos();
    await fetchTotalAgendamentos();
};