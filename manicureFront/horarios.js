document.addEventListener("DOMContentLoaded", () => {
  const adicionarForm = document.getElementById("adicionar-form");
  const modal = document.getElementById("adicionar-modal");

  // Abrir modal
  document.getElementById("btn-adicionar").addEventListener("click", () => {
    document.getElementById("adicionar-modal").style.display = "block";
  });

  // Fechar modais
  document.querySelectorAll(".close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", (event) => {
      const modalId = event.target.getAttribute("data-modal");
      document.getElementById(modalId).style.display = "none";
    });
  });

  // Fechar modal ao clicar fora
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none";
    }
  });

 //----------------------ADICIONAR AGENDAMENTO----------------------//

// Enviar dados do formulário via POST para a API
adicionarForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Pegando os valores do HTML
  const idCliente = parseInt(document.getElementById("nome").value, 10);
  console.log('idCliente', idCliente);
  const hora = document.getElementById("horario").value;
  const dia = document.getElementById("dia").value;
  const mes = document.getElementById("mes").value;
  const idServico  = parseInt(document.getElementById("servico").value, 10);
  console.log('idServico', idServico);

  //Transformando dados 
  const diaFormatado = `${dia} de ${mes}`;
  const clientes = await fetchClientes();
  const servicos = await fetchServicos();
  console.log('clientesFetch', clientes);
  console.log('servicosFetch', servicos);
  
  const cliente = clientes.find((c) => c.id === idCliente);
  console.log('cliente', cliente);
  if (!cliente) {
    throw new Error("Cliente não encontrado!");
  }
  const servico = servicos.find((s) => s.id === idServico);
  if (!servico) {
    throw new Error("Serviço não encontrado!");
  }
  console.log('servico', servico);

  //Ajustando objeto para o fetch
  const agendamentoData = {
      dia: diaFormatado,
      hora: hora,
      cliente: {
        id: cliente.id,
        nome: cliente.nome,
        sobreNome: cliente.sobreNome,
        telefone: cliente.telefone,
      },
      servico: {
        id: servico.id,
        nome: servico.nome,
        preco: servico.preco,
      },
    };

  console.log('agendamentoData', agendamentoData);

  try {
    const response = await fetch('https://manicure-projetodeextensao.onrender.com/agendamentos', {
    // const response = await fetch("http://localhost:8080/agendamentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(agendamentoData)
    });

    if (!response.ok) {
      throw new Error("Erro ao adicionar cliente");
    }

    const data = await response.json();

    modal.style.display = "none";

    await fetchAgendamentos();

  } catch (error) {
    console.error("Erro ao adicionar cliente:", error);
  }
});


//----------------------BUSCAR DADOS AGENDAMENTOS----------------------//

async function fetchAgendamentos() {
  try {
    // const response = await fetch("http://localhost:8080/agendamentos");
    const response = await fetch('https://manicure-projetodeextensao.onrender.com/agendamentos');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    populateAgenda(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function populateAgenda(appointments) {
  const agendaContainer = document.querySelector('.agenda');
  agendaContainer.innerHTML = ''; // Limpa o conteúdo anterior

  const monthMap = {
    Janeiro: 0,
    Fevereiro: 1,
    Março: 2,
    Abril: 3,
    Maio: 4,
    Junho: 5,
    Julho: 6,
    Agosto: 7,
    Setembro: 8,
    Outubro: 9,
    Novembro: 10,
    Dezembro: 11
  };

  function parseDate(dateStr) {
    const [day, , month] = dateStr.split(' '); // Divide em ["12", "de", "Novembro"]
    return new Date(new Date().getFullYear(), monthMap[month], parseInt(day, 10));
  }

  //Function dor horarios dentro do dia
  // function parseTime(timeStr) {
  //   const [hours, minutes] = timeStr.split(':').map(Number); // Divide em ["10", "10"] e converte para números
  //   return hours * 60 + minutes; // Converte o horário em minutos totais para facilitar a comparação
  // }

  // Agrupar por dia
  const groupedByDay = appointments.reduce((acc, appointment) => {
      const date = appointment.dia;
      if (!acc[date]) {
          acc[date] = [];
      }
      acc[date].push(appointment);
      return acc;
  }, {});

   // Ordenar as datas (como strings, isso vai ordenar de forma crescente)
    const sortedDates = Object.keys(groupedByDay).sort((a, b) => parseDate(a) - parseDate(b));

  // Construir HTML para cada dia
  sortedDates.forEach((date) => {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
      // Título do dia
    const dayTitle = document.createElement('h2');
    dayTitle.textContent = date.charAt(0).toUpperCase() + date.slice(1); // Capitalizar a primeira letra
    dayDiv.appendChild(dayTitle);
    
    // const sortedAppointments = groupedByDay[date].sort((a, b) => parseTime(a.hora) - parseTime(b.hora));
    
    // Adicionar agendamentos
    groupedByDay[date].forEach((appointment) => {
          const appointmentDiv = document.createElement('div');
          appointmentDiv.classList.add('appointment');
          
          appointmentDiv.innerHTML = `
            <p><strong class="delete-btn">Horário:</strong> ${appointment.hora}</p>
            <p><strong class="delete-btn">Cliente:</strong> ${appointment.cliente.nome} ${appointment.cliente.sobreNome}</p>
            <p><strong class="delete-btn">Serviço:</strong> ${appointment.servico.nome}</p>
            <span class="delete-icon" data-id='${appointment.id_horamarcada}' title="Remover"><i class="fas fa-trash-alt"></i></span>
          `;
          dayDiv.appendChild(appointmentDiv);
        });
        
      agendaContainer.appendChild(dayDiv);
  });
}

//----------------------EXCLUIR AGENDAMENTO----------------------//

  //Fetch com método Delete para apagar um cliente especifico
  async function deleteAgendamento(id_horamarcadaDelete, row) {
    try {
      const response = await fetch(`https://manicure-projetodeextensao.onrender.com/agendamentos/${id_horamarcadaDelete}`, {
      // const response = await fetch(`http://localhost:8080/agendamentos/${id_horamarcadaDelete}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Erro ao excluir cliente");
      }
      await fetchAgendamentos();
      row.remove();
    } catch (error) {
      console.error("Erro na requisição DELETE:", error);
    }
  }
    // Modal de exclusão
    document.addEventListener("click", async (event) => {
      if (event.target.classList.contains("delete-icon")) {
        const row = event.target.closest(".appointment");
        const dataId = event.target.getAttribute("data-id");
  
        if (dataId) {
          const [dia, hora] = dataId.split("&");
    
          // Exibe o modal
          const modalExcluir = document.getElementById("apagar-modal");
          modalExcluir.style.display = "block";
    
          // Botão "Excluir" no modal
          const excluirButton = modalExcluir.querySelector("button:last-of-type");
          excluirButton.onclick = async () => {
            await deleteAgendamento(dia, hora, row);
            modalExcluir.style.display = "none"; // Fecha o modal após excluir
          };
    
          // Botão "Cancelar" no modal
          const cancelarButton = modalExcluir.querySelector("button:first-of-type");
          cancelarButton.onclick = () => {
            modalExcluir.style.display = "none"; // Fecha o modal sem excluir
          }
        }else {
          console.error("data-id não encontrado ou inválido");
        }
      }
  });

//----------------------BUSCAR DADOS CLIENTES----------------------//

async function fetchClientes() {
  try {
    const response = await fetch('https://manicure-projetodeextensao.onrender.com/clientes');
    // const response = await fetch('http://localhost:8080/clientes');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    populateClientes(data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function populateClientes(servicos) {
  const selectElement = document.getElementById("nome");
  selectElement.innerHTML = `
    <option value="" disabled selected>
      Selecione um cliente
    </option>
  `;

  servicos.forEach((servico) => {
    const option = document.createElement("option");
    option.value = `${servico.id}`
    option.textContent = `${servico.nome} ${servico.sobreNome}`;
    selectElement.appendChild(option);
  });
}

//----------------------BUSCAR DADOS SERVIÇOS----------------------//

async function fetchServicos() {
  try {
    // const response = await fetch("http://localhost:8080/servicos");
    const response = await fetch('https://manicure-projetodeextensao.onrender.com/servicos');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const servicosData = await response.json();
    populateServicos(servicosData);
    return servicosData;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function populateServicos(servicos) {
  const selectElement = document.getElementById("servico");
  selectElement.innerHTML = `
    <option value="" disabled selected>
      Selecione um serviço
    </option>
  `;

  servicos.forEach((servico) => {
    const option = document.createElement("option");
    option.value = servico.id;
    option.textContent = servico.nome;
    selectElement.appendChild(option);
  });
}

  window.onload = async () => {
    await fetchAgendamentos();
    await fetchClientes();
    await fetchServicos();
}
}); 