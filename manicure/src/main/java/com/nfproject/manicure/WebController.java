package com.nfproject.manicure;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
public class WebController {
    
    private final List<HoraMarcada> agendamentoGerais = new ArrayList<>();
    private final List<Servico> servicos = new ArrayList<>();
    
    //----------------------------------------------------------------------------------
    //Pagina Inicial
    
    @GetMapping("/agendamentos")
    public List<HoraMarcada> getAgendamentos() {
        return agendamentoGerais;
    }
    
    @GetMapping("/agendamentos/total")
    public int getTotalAgendamentos() {
        return agendamentoGerais.size();
    }
    
    @GetMapping("/servicos/total")
    public int getTotalServicos() {
           return servicos.size();
    }
    
    
    //----------------------------------------------------------------------------------
    //Crud Clientes
    
    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("/clientes")
    public List<Cliente> getClientes() {
        return clienteRepository.listarClientes();
    }
    
    @GetMapping("/clientes/total")
    public int getTotalClientes() {
        return clienteRepository.contarClientes();
    }
    
    @PostMapping("/clientes")
    public Cliente createCliente(@RequestBody Cliente novoCliente) {
        clienteRepository.inserirCliente(novoCliente);
        return novoCliente;
    }
    
   @PutMapping("/clientes/{id}")
    public Cliente updateCliente(@PathVariable long id, @RequestBody Cliente clienteAtualizado) {
        if (clienteRepository.clienteExiste(id)) {
            clienteRepository.atualizarCliente(id, clienteAtualizado);
            return clienteAtualizado;
        } else {
            throw new IllegalArgumentException("Cliente com ID " + id + " não encontrado");
        }
    }
    
    @DeleteMapping("/clientes/{id}")
    public String deleteCliente(@PathVariable long id) {
        try {
            clienteRepository.deletarClientePorId(id);
            return "Cliente com ID " + id + " removido com sucesso!";
        } catch (Exception e) {
            throw new IllegalArgumentException("Erro ao remover cliente com ID " + id + ": " + e.getMessage());
        }
    }
    
    //----------------------------------------------------------------------------------
    //Crud Servicos
    
    @GetMapping("/servicos")
    public List<Servico> getServico() {
        return servicos;
    }
   
    @PostMapping("/servicos")
        public Servico createServico(@RequestBody Servico novoServico) {
        servicos.add(novoServico);
        return novoServico;
    }
    
   @PutMapping("/servicos/{nome}")
    public Servico updateServico(@PathVariable String nome, @RequestBody Servico servicoAtualizado) {
    // Buscar o servico com o nome fornecido
    Servico servicoExistente = servicos.stream()
                                       .filter(c -> c.getNome().equals(nome))
                                       .findFirst()
                                       .orElse(null);

    // Verifica se o servico foi encontrado
    if (servicoExistente != null) {
        // Atualiza os dados do cliente
        servicoExistente.setNome(servicoAtualizado.getNome());
        servicoExistente.setPreco(servicoAtualizado.getPreco());

        // Retorna o servico atualizado
        return servicoExistente;
    } else {
        throw new IllegalArgumentException("Servico com nome " + nome + " não encontrado");
    }
}
    
    @DeleteMapping("/agendamentos/{dia}/{hora}")
    public String deleteAgendamento(@PathVariable String dia, @PathVariable String hora) {
    HoraMarcada agendamento = agendamentoGerais.stream()
                              .filter(c -> c.getDia().equals(dia))
                              .filter(c -> c.getHora().equals(hora))
                              .findFirst()
                              .orElse(null);

    if (agendamento != null) {
        agendamentoGerais.remove(agendamento);
        return "Servico removido com sucesso!";
    } else {
        throw new IllegalArgumentException("Agendamento não encontrado");
    }
}
    //----------------------------------------------------------------------------------
    // Crud Horarios (Get is in main page)
        
     @PostMapping("/agendamentos")
    public HoraMarcada createAgendamento(@RequestBody HoraMarcada novoAgendamento) {
        agendamentoGerais.add(novoAgendamento);
        return novoAgendamento;
    }
//    
//    @PutMapping("/agendamentos/{index}")
//    public HoraMarcada updateAgendamento(@PathVariable int index, @RequestBody HoraMarcada agendamentoAtualizado) {
//        if (index >= 0 && index < agendamentoGerais.size()) {
//            agendamentoGerais.set(index, agendamentoAtualizado);
//            return agendamentoAtualizado;
//        } else {
//            throw new IllegalArgumentException("Índice inválido");
//        }
//    }
//
//    @DeleteMapping("/agendamentos/{index}")
//    public String deleteAgendamento(@PathVariable int index) {
//        if (index >= 0 && index < agendamentoGerais.size()) {
//            agendamentoGerais.remove(index);
//            return "Agendamento removido com sucesso!";
//        } else {
//            throw new IllegalArgumentException("Índice inválido");
//        }
//    }
}
