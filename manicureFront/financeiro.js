async function fetchCaixa() {
    try {
    //   const response = await fetch('http://localhost:8080/caixa');
      const response = await fetch('https://manicure-projetodeextensao.onrender.com/agendamentos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const caixa = await response.json();
      populateTable(caixa);
      const totalEntradas = caixa.reduce((total, item) => total + item.servico.preco, 0);  
      document.getElementById('totalCaixa').textContent = `Caixa: R$${totalEntradas.toFixed(2)}`;
      
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  function populateTable(services) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = '';

    
    services.forEach(service => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>R$${service.servico.preco}</td>
        <td>${service.servico.nome}</td>
        <td>${service.dia} </td>
        <td>${service.hora} </td>
      `;

      tableBody.appendChild(row);
    });
  }

  window.onload = async () => {
    await fetchCaixa();
};