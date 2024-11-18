document.querySelectorAll('.close').forEach(btn => {
  btn.addEventListener('click', (event) => {
  const modalId = event.target.getAttribute('data-modal');
  document.getElementById(modalId).style.display = 'none';
  });
  });


  document.getElementById("btn-adicionar").addEventListener("click", () => {
  document.getElementById("adicionar-modal").style.display = "block";
  });

  document.querySelectorAll(".close").forEach(closeBtn => {
  closeBtn.addEventListener("click", (event) => {
  const modalId = event.target.getAttribute("data-modal");
  document.getElementById(modalId).style.display = "none";
  });
  });

  window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
  event.target.style.display = "none";
  }
  });

function formatarTelefone(telefone) {
  const cleaned = telefone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
      return `${match[1]} ${match[2]}-${match[3]}`;
  }
  return telefone;
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

  // Construir HTML para cada dia
  Object.keys(groupedByDay).forEach((date) => {
      const dayDiv = document.createElement('div');
      dayDiv.classList.add('day');

      // Título do dia
      const dayTitle = document.createElement('h2');
      const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
      });
      dayTitle.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      dayDiv.appendChild(dayTitle);

      // Adicionar agendamentos
      groupedByDay[date].forEach((appointment) => {
          const appointmentDiv = document.createElement('div');
          appointmentDiv.classList.add('appointment');

          appointmentDiv.innerHTML = `
              <p><strong>Horário:</strong> ${appointment.hora}</p>
              <p><strong>Cliente:</strong> ${appointment.cliente.nome} ${appointment.cliente.sobreNome}</p>
              <p><strong>Serviço:</strong> ${appointment.servico}</p>
              <p><strong>Profissional:</strong> ${appointment.profissional}</p>
          `;
          dayDiv.appendChild(appointmentDiv);
      });

      agendaContainer.appendChild(dayDiv);
  });
}

// function populateAgenda(appointments) {
//   const agendaContainer = document.querySelector('.agenda');
//   agendaContainer.innerHTML = ''; // Limpa o conteúdo anterior

//   // Data base: hoje
//   const today = new Date();
  
//   // Gerar lista de 7 dias consecutivos
//   const daysToRender = Array.from({ length: 5 }, (_, i) => {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
//       return date.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
//   });

//   // Agrupar agendamentos por dia
//   const groupedByDay = appointments.reduce((acc, appointment) => {
//       const date = appointment.dia;
//       if (!acc[date]) {
//           acc[date] = [];
//       }
//       acc[date].push(appointment);
//       return acc;
//   }, {});

//   // Garantir que todos os 7 dias estejam presentes no grupo
//   daysToRender.forEach((date) => {
//       if (!groupedByDay[date]) {
//           groupedByDay[date] = []; // Adicionar dias sem agendamentos
//       }
//   });

//   // Construir HTML para cada dia
//   daysToRender.forEach((date) => {
//       const dayDiv = document.createElement('div');
//       dayDiv.classList.add('day');

//       // Título do dia
//       const dayTitle = document.createElement('h2');
//       const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
//           weekday: 'long',
//           day: 'numeric',
//           month: 'long',
//       });
//       dayTitle.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
//       dayDiv.appendChild(dayTitle);

//       // Adicionar agendamentos
//       groupedByDay[date].forEach((appointment) => {
//           const appointmentDiv = document.createElement('div');
//           appointmentDiv.classList.add('appointment');

//           appointmentDiv.innerHTML = `
//               <p><strong>Horário:</strong> ${appointment.hora}</p>
//               <p><strong>Cliente:</strong> ${appointment.cliente.nome} ${appointment.cliente.sobreNome}</p>
//               <p><strong>Serviço:</strong> ${appointment.servico}</p>
//               <p><strong>Profissional:</strong> ${appointment.profissional}</p>
//           `;
//           dayDiv.appendChild(appointmentDiv);
//       });

//       agendaContainer.appendChild(dayDiv);
//   });
// }
  
  
async function fetchAgendamentos() {
  try {
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


  window.onload = async () => {
    await fetchAgendamentos();
};