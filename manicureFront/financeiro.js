async function fetchCaixa() {
    try {
      const response = await fetch('http://localhost:8080/caixa');
      // const response = await fetch('https://manicure-projetodeextensao.onrender.com/caixa');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const caixa = await response.json();
      populateTable(caixa);
      const totalEntradas = caixa.reduce((total, item) => total + item.entrada, 0);  
      document.getElementById('totalCaixa').textContent = `Caixa: R$${totalEntradas}`; 
       console.log('Total de Entradas:', totalEntradas);
      
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
        <td>R$${service.entrada}</td>
        <td>${service.horaMarcada.servico.nome}</td>
        <td>${service.horaMarcada.dia} </td>
        <td>${service.horaMarcada.hora} </td>
      `;

      tableBody.appendChild(row);
    });
  }

  window.onload = async () => {
    await fetchCaixa();
};