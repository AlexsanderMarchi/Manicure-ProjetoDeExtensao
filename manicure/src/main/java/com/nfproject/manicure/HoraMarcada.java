
package com.nfproject.manicure;


public class HoraMarcada {
     private String dia;
    private String hora;
    private Cliente cliente;
    private Servico servico;

     public HoraMarcada (String dia, String hora, Cliente cliente, Servico servico){
        setDia(dia);
        setHora(hora);
        setCliente(cliente);
        setServico(servico);
    }
    
    
    public String getDia() {
        return dia;
    }
    
     public void setDia(String dia) {
        if(!dia.isBlank()){
        this.dia = dia;
        }
    }
     
    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        if(!hora.isBlank()){
        this.hora = hora;
        }
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        if(cliente != null){
        this.cliente = cliente;
        }
    }
    
     public Servico getServico() {
        return servico;
    }

    public void setServico(Servico servico) {
        if(servico != null){
        this.servico = servico;
        }
    }

   
    
     @Override
    public String toString(){
        String horaMarcada = """
                     %sDia: %s
                     hora: %s
                     %s
                     ************************
                     """;
        String horaMarcadaFormatada = String.format(horaMarcada, cliente, dia, hora, servico);
        
        return horaMarcadaFormatada;
    }
}
