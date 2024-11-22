package com.nfproject.manicure;

public class Financeiro {

    private double entrada;
    private HoraMarcada horaMarcada;

    public Financeiro(HoraMarcada horaMarcada) {
        setHoraMarcada(horaMarcada);
    }
    
     public double getEntrada() {
        return entrada;
    }

     private void atualizarEntradaComPrecoServico() {
        if (horaMarcada != null) {
            this.entrada = horaMarcada.getServico().getPreco();
        } else {
            this.entrada = 0;
        }
    }
     
     public HoraMarcada getHoraMarcada() {
        return horaMarcada;
    }

    public void setHoraMarcada(HoraMarcada horaMarcada) {
        if(horaMarcada != null){
        this.horaMarcada = horaMarcada;
        atualizarEntradaComPrecoServico();
        }
    }
    
     @Override
    public String toString(){
        String financeiro = """
                     Resumo Financeiro:
                     Total de Entradas: %.2f
                     """;
        String financeiroFormatados = String.format(financeiro, entrada);
        
        return financeiroFormatados;
    }
}

