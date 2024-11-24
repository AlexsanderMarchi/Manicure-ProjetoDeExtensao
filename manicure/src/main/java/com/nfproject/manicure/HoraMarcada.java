
package com.nfproject.manicure;


public class HoraMarcada {
    private long id_horamarcada;
    private String dia;
    private String hora;
    private Cliente cliente;
    private Servico servico;

     public HoraMarcada (long id_horamarcada, String dia, String hora, Cliente cliente, Servico servico){
        setId_horamarcada(id_horamarcada);
        setDia(dia);
        setHora(hora);
        setCliente(cliente);
        setServico(servico);
    }
    
      public long getId_horamarcada() {
        return id_horamarcada;
    }

    public void setId_horamarcada(long id_horamarcada) {
        this.id_horamarcada = id_horamarcada;
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
