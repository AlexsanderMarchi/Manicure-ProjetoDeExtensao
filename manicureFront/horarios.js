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
  const nomeCliente = document.getElementById("nome").value;
  const hora = document.getElementById("horario").value;
  const dia = document.getElementById("dia").value;
  const mes = document.getElementById("mes").value;
  const nomeServico  = document.getElementById("servico").value;

  //Transformando dados 
  const diaFormatado = `${dia} de ${mes}`;
  const primeiroNome = nomeCliente.split(" ")[0]
  const segundoNome = nomeCliente.split(" ")[1]
  const clientes = await fetchClientes();
  const servicos = await fetchServicos();
  console.log('servicos', servicos);
  
  const cliente = clientes.find((c) => c.nome === primeiroNome && c.sobreNome === segundoNome);
  console.log('cliente', cliente);
  if (!cliente) {
    throw new Error("Cliente não encontrado!");
  }
  const servico = servicos.find((s) => s.nome == nomeServico);
  if (!servico) {
    throw new Error("Serviço não encontrado!");
  }
  console.log('servico', servico);

  //Ajustando objeto para o fetch
  const agendamentoData = {
      dia: diaFormatado,
      hora: hora,
      cliente: {
        nome: cliente.nome,
        sobreNome: cliente.sobreNome,
        telefone: cliente.telefone,
      },
      servico: {
        nome: servico.nome,
        preco: servico.preco,
      },
    };

  console.log('agendamentoData', agendamentoData);

  try {
    const response = await fetch('https://manicure-projetodeextensao.onrender.com/agendamentos',{
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
   const sortedDates = Object.keys(groupedByDay).sort();

   // Limitar a 5 primeiros dias
   const limitedDates = sortedDates.slice(0, 5);

  // Construir HTML para cada dia
  limitedDates.forEach((date) => {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
      // Título do dia
    const dayTitle = document.createElement('h2');
    dayTitle.textContent = date.charAt(0).toUpperCase() + date.slice(1); // Capitalizar a primeira letra
    dayDiv.appendChild(dayTitle);
    
    // Adicionar agendamentos
    groupedByDay[date].forEach((appointment) => {
          const appointmentDiv = document.createElement('div');
          appointmentDiv.classList.add('appointment');
          
          appointmentDiv.innerHTML = `
            <p class="delete-btn" data-id='${appointment.dia}&${appointment.hora}'><strong class="delete-btn">Horário:</strong> ${appointment.hora}</p>
            <p class="delete-btn" data-id='${appointment.dia}&${appointment.hora}'><strong class="delete-btn">Cliente:</strong> ${appointment.cliente.nome} ${appointment.cliente.sobreNome}</p>
            <p class="delete-btn" data-id='${appointment.dia}&${appointment.hora}'><strong class="delete-btn">Serviço:</strong> ${appointment.servico.nome}</p>
            <span class="delete-icon" data-id='${appointment.dia}&${appointment.hora}' title="Remover"><i class="fas fa-trash-alt"></i></span>
          `;
          dayDiv.appendChild(appointmentDiv);
        });
        
      agendaContainer.appendChild(dayDiv);
  });
}

//----------------------EXCLUIR AGENDAMENTO----------------------//

  //Fetch com método Delete para apagar um cliente especifico
  async function deleteAgendamento(dia, hora, row) {
    try {
      const response = await fetch(`https://manicure-projetodeextensao.onrender.com/agendamentos/${encodeURIComponent(dia)}/${encodeURIComponent(hora)}`, {
      // const response = await fetch(`http://localhost:8080/agendamentos/${encodeURIComponent(dia)}/${encodeURIComponent(hora)}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Erro ao excluir cliente");
      }
      row.remove();
      await fetchAgendamentos();
    } catch (error) {
      console.error("Erro na requisição DELETE:", error);
    }
  }
    // Modal de exclusão
    document.addEventListener("click", async (event) => {
      if (event.target.classList.contains("delete-btn") || event.target.classList.contains("delete-icon")) {
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
    option.value = `${servico.nome} ${servico.sobreNome}`
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
    option.value = servico.nome;
    option.textContent = servico.nome;
    selectElement.appendChild(option);
  });
}

  // Função para popular a tabela
  // function populateTable(services) {
  //   const tableBody = document.getElementById("tableBody"); // Obtém o corpo da tabela
  //   tableBody.innerHTML = ''; // Limpa o conteúdo da tabela antes de adicionar novas linhas
  
  //   services.forEach(service => {
  //     const row = document.createElement("tr"); // Cria uma nova linha
  
  //     row.innerHTML = `
  //       <td>${service.nome} ${service.sobreNome}</td>
  //       <td>${formatarTelefone(service.telefone)}</td>
  //       <td>${service?.email ? service.email : "--"}
  //         <span class="actions">
  //             <button class="edit-btn">✏️</button>
  //             <button class="delete-btn">🗑️</button>
  //         </span>
  //       </td>
  //     `;
  
  //     tableBody.appendChild(row); // Adiciona a linha à tabela
  //   });
  // }

  //----------------------OUTRAS FUNÇÕES----------------------//

  // function formatarTelefone(telefone) {
  //   const cleaned = telefone.replace(/\D/g, '');
  //   const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  //   if (match) {
  //       return `${match[1]} ${match[2]}-${match[3]}`;
  //   }
  //   return telefone;
  // }

  window.onload = async () => {
    await fetchAgendamentos();
    await fetchClientes();
    await fetchServicos();
}
}); 