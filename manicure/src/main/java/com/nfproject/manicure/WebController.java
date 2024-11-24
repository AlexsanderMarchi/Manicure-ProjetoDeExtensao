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
    
    @Autowired
    private ServicoRepository servicoRepository;
    
    @GetMapping("/servicos")
    public List<Servico> getServico() {
        return servicoRepository.listarServicos();
    }
   
    @GetMapping("/servicos/total")
    public int getTotalServicos() {
           return servicoRepository.contarServicos();
    }
    
    @PostMapping("/servicos")
    public Servico createServico(@RequestBody Servico novoServico) {
        servicoRepository.inserirServico(novoServico);
        return novoServico;
    }
    
    @PutMapping("/servicos/{id}")
    public Servico updateServico(@PathVariable long id, @RequestBody Servico servicoAtualizado) {
        if (servicoRepository.servicoExiste(id)) {
            servicoRepository.atualizarServico(id, servicoAtualizado);
            return servicoAtualizado;
        } else {
            throw new IllegalArgumentException("Servico com ID " + id + " não encontrado");
        }
    }
    
     @DeleteMapping("/servicos/{id}")
    public String deleteServico(@PathVariable long id) {
        try {
            servicoRepository.deletarServicoPorId(id);
            return "Servico com ID " + id + " removido com sucesso!";
        } catch (Exception e) {
            throw new IllegalArgumentException("Erro ao remover servico com ID " + id + ": " + e.getMessage());
        }
    }
    
    //----------------------------------------------------------------------------------
    // Crud Horarios
     
    @Autowired
    private HoraMarcadaRepository horaMarcadaRepository;
            
    @GetMapping("/agendamentos")
    public List<HoraMarcada> getAgendamentos() {
        return horaMarcadaRepository.listarAgendamentos();
    }
    
    @GetMapping("/agendamentos/total")
    public int getTotalAgendamentos() {
        return horaMarcadaRepository.contarAgendamentos();
    }
    
     @PostMapping("/agendamentos")
    public HoraMarcada createAgendamento(@RequestBody HoraMarcada novoAgendamento) {
        horaMarcadaRepository.inserirHoraMarcada(novoAgendamento);
        return novoAgendamento;
    }
      
    @DeleteMapping("/agendamentos/{id_horamarcada}")
    public String deleteAgendamento(@PathVariable long id_horamarcada) {
    try {
            horaMarcadaRepository.deletarAgendamentoPorId(id_horamarcada);
            return "Agendamento com ID " + id_horamarcada + " removido com sucesso!";
        } catch (Exception e) {
            throw new IllegalArgumentException("Erro ao remover agendamento com ID " + id_horamarcada + ": " + e.getMessage());
        }
    }   
}
