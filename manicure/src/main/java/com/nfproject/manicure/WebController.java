package com.nfproject.manicure;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
public class WebController {
    
    private final List<HoraMarcada> agendamentoGerais = new ArrayList<>();
    private final List<Cliente> clientes = new ArrayList<>();
    private final List<Servico> servicos = new ArrayList<>();
    private final List<Financeiro> caixa = new ArrayList<>();
    
    public WebController() {
        // Inicializando Clientes
        Cliente anaBeatriz = new Cliente("Ana", "Beatriz", 48998878787L);
        Cliente carlaFontes = new Cliente("Carla", "Fontes", 48987654321L);
        Cliente roebrtaDores = new Cliente("Roberta", "das Dores", 48987612345L);
        Cliente gertrudesSilva = new Cliente("Gertrudes", "Silva", 48967854820L);
        Cliente gertrudesSilva2 = new Cliente("Gertrudes2", "Silva2", 48967854822L);
        Cliente gertrudesSilva3 = new Cliente("Gertrudes3", "Silva3", 48967854823L);
        clientes.add(anaBeatriz);
        clientes.add(carlaFontes);
        clientes.add(roebrtaDores);
        clientes.add(gertrudesSilva);
        clientes.add(gertrudesSilva2);
        clientes.add(gertrudesSilva3);

        // Inicializando Servicos
        Servico manicure = new Servico("Manicure", 19.90);
        Servico pedicure = new Servico("Pedicure", 25.90);
        Servico alongamento = new Servico("Alongamento", 70.90);
        Servico tesoura = new Servico("Tesoura", 30.79);
        Servico alicateGrande = new Servico("Alicate grande", 70.25);
        Servico algodao = new Servico("Algodão", 5.25);
        servicos.add(manicure);
        servicos.add(pedicure);
        servicos.add(alongamento);
        servicos.add(tesoura);
        servicos.add(alicateGrande);
        servicos.add(algodao);
        
        // Inicializando Agendamentos
        HoraMarcada horaAna = new HoraMarcada("11 de Outubro", "11:00", anaBeatriz, manicure);
        HoraMarcada horaCarla = new HoraMarcada("10 de Outubro", "16:00", carlaFontes, pedicure);
        HoraMarcada horaGertrudes = new HoraMarcada("10 de Outubro", "15:00", gertrudesSilva, alongamento);
        HoraMarcada horaGertrude2 = new HoraMarcada("11 de Outubro", "11:00", gertrudesSilva, alongamento);
        HoraMarcada horaGertrudes3 = new HoraMarcada("11 de Outubro", "19:00", gertrudesSilva, alongamento);
        HoraMarcada anaBeatriz2 = new HoraMarcada("12 de Outubro", "16:00", anaBeatriz, pedicure);
        HoraMarcada carlaFontes3 = new HoraMarcada("11 de Outubro", "13:00", carlaFontes, manicure);

        
        agendamentoGerais.add(horaAna);
        agendamentoGerais.add(horaCarla);
        agendamentoGerais.add(horaGertrudes);
        agendamentoGerais.add(horaGertrude2);
        agendamentoGerais.add(horaGertrudes3);
        agendamentoGerais.add(anaBeatriz2);
        agendamentoGerais.add(carlaFontes3);
        
        // Inicializando Caixa
        Financeiro horaAnaCaixa = new Financeiro(horaAna);
        Financeiro horaCarlaCaixa = new Financeiro(horaCarla);
        Financeiro horaGertrudesCaixa = new Financeiro(horaGertrudes);
        Financeiro horaGertrude2Caixa = new Financeiro(horaGertrude2);
        Financeiro anaBeatriz2Caixa = new Financeiro(anaBeatriz2);
        caixa.add(horaAnaCaixa);
        caixa.add(horaCarlaCaixa);
        caixa.add(horaGertrudesCaixa);
        caixa.add(horaGertrude2Caixa);
        caixa.add(anaBeatriz2Caixa);
    }
    
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
    
    @GetMapping("/clientes/total")
    public int getTotalClientes() {
        return clientes.size();
    }
    
    @GetMapping("/servicos/total")
    public int getTotalServicos() {
           return servicos.size();
    }
    
    @GetMapping("/caixa")
    public List<Financeiro> getTotalCaixa() {
           return caixa;
    }
    
    //----------------------------------------------------------------------------------
    //Crud Clientes
    
    @GetMapping("/clientes")
    public List<Cliente> getClientes() {
        return clientes;
    }
    
    @PostMapping("/clientes")
    public Cliente createCliente(@RequestBody Cliente novoCliente) {
        clientes.add(novoCliente);
        return novoCliente;
    }
    
   @PutMapping("/clientes/{telefone}")
    public Cliente updateCliente(@PathVariable long telefone, @RequestBody Cliente clienteAtualizado) {
    // Buscar o cliente com o telefone fornecido
    Cliente clienteExistente = clientes.stream()
                                       .filter(c -> c.getTelefone() == telefone)
                                       .findFirst()
                                       .orElse(null);

    // Verifica se o cliente foi encontrado
    if (clienteExistente != null) {
        // Atualiza os dados do cliente
        clienteExistente.setNome(clienteAtualizado.getNome());
        clienteExistente.setSobreNome(clienteAtualizado.getSobreNome());
        clienteExistente.setTelefone(clienteAtualizado.getTelefone());

        // Retorna o cliente atualizado
        return clienteExistente;
    } else {
        throw new IllegalArgumentException("Cliente com telefone " + telefone + " não encontrado");
    }
}
    
    @DeleteMapping("/clientes/{telefone}")
public String deleteCliente(@PathVariable long telefone) {
    Cliente cliente = clientes.stream()
                              .filter(c -> c.getTelefone() == telefone)
                              .findFirst()
                              .orElse(null);

    if (cliente != null) {
        clientes.remove(cliente);
        return "Cliente removido com sucesso!";
    } else {
        throw new IllegalArgumentException("Cliente com telefone " + telefone + " não encontrado");
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
