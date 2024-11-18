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
    private final List<Produtos> produtos = new ArrayList<>();
    private final List<Produtos> produtosEstoque = new ArrayList<>();
    private final List<Empregado> empregados = new ArrayList<>();
    
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

        // Inicializando Produtos
        Produtos esmalte = new Produtos("Esmalte", 19.90, 13);
        Produtos acetona = new Produtos("Acetona", 25.90, 10);
        Produtos alicate = new Produtos("Alicate", 70.90, 100);
        Produtos tesoura = new Produtos("Tesoura", 30.79, 24);
        Produtos alicateGrande = new Produtos("Alicate grande", 70.25, 0);
        Produtos algodao = new Produtos("Algodão", 5.25, 0);
        produtos.add(esmalte);
        produtos.add(acetona);
        produtos.add(alicate);
        produtos.add(tesoura);
        produtos.add(alicateGrande);
        produtos.add(algodao);
    
        for (Produtos produto : produtos) {
            if (produto.getQtd_estoque() > 0) {
                produtosEstoque.add(produto);
            }
        }
        
        // Inicializando Agendamentos
        HoraMarcada horaAna = new HoraMarcada("11 de Outubro", "11:00", anaBeatriz);
        HoraMarcada horaCarla = new HoraMarcada("10 de Outubro", "12:00", carlaFontes);
        agendamentoGerais.add(horaAna);
        agendamentoGerais.add(horaCarla);
        
        // Inicializando Empregados
        Empregado ramonaFlowers = new Empregado("Ramona", "Flowers", "48967854820", "Manicure");
        empregados.add(ramonaFlowers);
    }
    
    //----------------------------------------------------------------------------------
    //Pagina Inicial
    
    @GetMapping("/agendamentos")
    public List<HoraMarcada> getAgendamentos() {
        return agendamentoGerais;
    }
    
    @GetMapping("/empregados")
    public List<Empregado> getEmpregados() {
        return empregados;
    }
    
    @GetMapping("/agendamentos/total")
    public int getTotalAgendamentos() {
        return agendamentoGerais.size();
    }
    
    @GetMapping("/clientes/total")
    public int getTotalClientes() {
        return clientes.size();
    }
    
    @GetMapping("/produtos/total-estoque")
    public int getTotalProdutosEstoque() {
           return produtosEstoque.size();
    }
    
    //----------------------------------------------------------------------------------
    //Crud Clientes
    
    @GetMapping("/clientes")
    public List<Cliente> getClientes() {
        return clientes;
    }
//    
//    @PostMapping("/clientes")
//    public Cliente createCliente(@RequestBody Cliente novoCliente) {
//        clientes.add(novoCliente);
//        return novoCliente;
//    }
//    
//    @PutMapping("/clientes/{index}")
//    public Cliente updateCliente(@PathVariable int index, @RequestBody Cliente clienteAtualizado) {
//        if (index >= 0 && index < clientes.size()) {
//            clientes.set(index, clienteAtualizado);
//            return clienteAtualizado;
//        } else {
//            throw new IllegalArgumentException("Índice inválido");
//        }
//    }
//    
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
    //Crud Produtos
    
    @GetMapping("/produtos")
    public List<Produtos> getProdutos() {
        return produtos;
    }
//    
//    @PostMapping("/produtos")
//    public Produtos createProduto(@RequestBody Produtos novoProduto) {
//        produtos.add(novoProduto);
//        return novoProduto;
//    }
//    
//    @PutMapping("/produtos/{index}")
//    public Produtos updateProduto(@PathVariable int index, @RequestBody Produtos produtoAtualizado) {
//        if (index >= 0 && index < produtos.size()) {
//            produtos.set(index, produtoAtualizado);
//            return produtoAtualizado;
//        } else {
//            throw new IllegalArgumentException("Índice inválido");
//        }
//    }
//    
//    @DeleteMapping("/produtos/{index}")
//    public String deleteProduto(@PathVariable int index) {
//        if (index >= 0 && index < produtos.size()) {
//            produtos.remove(index);
//            return "Produto removido com sucesso!";
//        } else {
//            throw new IllegalArgumentException("Índice inválido");
//        }
//    }
    
    //----------------------------------------------------------------------------------
    // Crud Horarios (Get is in main page)
    
//     @PostMapping("/agendamentos")
//    public HoraMarcada createAgendamento(@RequestBody HoraMarcada novoAgendamento) {
//        agendamentoGerais.add(novoAgendamento);
//        return novoAgendamento;
//    }
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
