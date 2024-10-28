
package com.nfproject.manicure;


public class Cliente {
    private String nome;
    private String sobreNome;
    private String telefone;

    public Cliente (String nome, String sobreNome, String telefone){
        setNome(nome);
        setSobreNome(sobreNome);
        setTelefone(telefone);
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
    
    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        if(!telefone.isBlank()){
            this.telefone = telefone;
        }
    }
    
    @Override
    public String toString(){
        String cliente = """
                     Cliente: %s %s
                     Contato: %s
                     """;
        String clientesFormatados = String.format(cliente, nome, sobreNome, telefone);
        
        return clientesFormatados;
    }
    
}
