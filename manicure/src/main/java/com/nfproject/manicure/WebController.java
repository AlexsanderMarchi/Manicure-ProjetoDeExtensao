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
    
    private List<HoraMarcada> agendamentoGerais = new ArrayList<>();
    
    @GetMapping("/agendamentos")
    public List<HoraMarcada> getAgendamentos() {
        Cliente anaBeatriz = new Cliente("Ana", "Beatriz", "48998878787");
        Cliente carlaFontes = new Cliente("Carla", "Fontes", "48987654321");
        
        HoraMarcada horaAna = new HoraMarcada("11 de Outubro", "11:00", anaBeatriz);
        HoraMarcada horaCarla = new HoraMarcada("10 de Outubro", "12:00", carlaFontes);
        
        agendamentoGerais.add(horaAna);
        agendamentoGerais.add(horaCarla);
        
        return agendamentoGerais;
    }
    
     @PostMapping("/agendamentos")
    public HoraMarcada createAgendamento(@RequestBody HoraMarcada novoAgendamento) {
        agendamentoGerais.add(novoAgendamento);
        return novoAgendamento;
    }
    
    @PutMapping("/agendamentos/{index}")
    public HoraMarcada updateAgendamento(@PathVariable int index, @RequestBody HoraMarcada agendamentoAtualizado) {
        if (index >= 0 && index < agendamentoGerais.size()) {
            agendamentoGerais.set(index, agendamentoAtualizado);
            return agendamentoAtualizado;
        } else {
            throw new IllegalArgumentException("Índice inválido");
        }
    }

    @DeleteMapping("/agendamentos/{index}")
    public String deleteAgendamento(@PathVariable int index) {
        if (index >= 0 && index < agendamentoGerais.size()) {
            agendamentoGerais.remove(index);
            return "Agendamento removido com sucesso!";
        } else {
            throw new IllegalArgumentException("Índice inválido");
        }
    }
}
