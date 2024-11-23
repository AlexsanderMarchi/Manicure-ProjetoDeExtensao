function formatarTelefone(telefone) {
  const telefoneStr = String(telefone);
  const cleaned = telefoneStr.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
      return `${match[1]} ${match[2]}-${match[3]}`;
  }
  return telefoneStr;
}

async function fetchAgendamentos() {
    try {
      // const response = await fetch('http://localhost:8080/agendamentos');
      const response = await fetch('https://manicure-projetodeextensao.onrender.com/agendamentos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      populateTable(data);
      console.log(data);
      const totalEntradas = data.reduce((total, item) => total + item.servico.preco, 0); 
      document.getElementById('totalCaixa').textContent = `R$${totalEntradas.toFixed(2)}`; 
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  // async function fetchCaixa() {
  //   try {
  //     // const response = await fetch('http://localhost:8080/caixa');
  //     const response = await fetch('https://manicure-projetodeextensao.onrender.com/caixa');
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const caixa = await response.json();
  //     const totalEntradas = caixa.reduce((total, item) => total + item.entrada, 0);  
  //     document.getElementById('totalCaixa').textContent = `R$${totalEntradas.toFixed(2)}`; 
      
  //   } catch (error) {
  //     console.error('Fetch error:', error);
  //   }
  // }


  async function fetchTotalServicos() {
    try {
      // const response = await fetch('http://localhost:8080/servicos/total');
      const response = await fetch('https://manicure-projetodeextensao.onrender.com/servicos/total');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const totalServicos = await response.json();
      document.getElementById('totalServicos').textContent = totalServicos;
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
        <td>${service.servico.nome} </td>
        <td>R$${service.servico.preco}</td>
      `;

      tableBody.appendChild(row);
    });
  }

  window.onload = async () => {
    await fetchAgendamentos();
    // await fetchCaixa();
    await fetchTotalServicos();
    await fetchTotalClientes();
    await fetchTotalAgendamentos();
};