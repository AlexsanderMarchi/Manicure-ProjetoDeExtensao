
package com.nfproject.manicure;


public class Cliente {
    
    private long id;
    private String nome;
    private String sobreNome;
    private long telefone;

    public Cliente (long id, String nome, String sobreNome, long telefone){
        setId(id);
        setNome(nome);
        setSobreNome(sobreNome);
        setTelefone(telefone);
    }
    
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
         if(!nome.isBlank()){
        this.nome = nome;
         }
    }

    public String getSobreNome() {
        return sobreNome;
    }

    public void setSobreNome(String sobreNome) {
        if(!sobreNome.isBlank()){
        this.sobreNome = sobreNome;
        }
    }
    
    public long getTelefone() {
        return telefone;
    }

    public void setTelefone(long telefone) {
            this.telefone = telefone;
    }
    
    @Override
    public String toString(){
        String cliente = """
                     Cliente: %s %s
                     Contato: %d
                     """;
        String clientesFormatados = String.format(cliente, nome, sobreNome, telefone);
        
        return clientesFormatados;
    }
      
}
