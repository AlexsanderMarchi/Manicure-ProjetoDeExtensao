package com.nfproject.manicure;


public class Servico {
    
    private long id;
    private String nome;
    private double preco;

    public Servico (long id, String nome, double preco){
        setId(id);
        setNome(nome);
        setPreco(preco);
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

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        if(preco >= 0){
            this.preco = preco;
        }
    }
    
    @Override
    public String toString(){
        String servico = """
                     Serviço: %s %s
                     Preço: %.2f
                     """;
        String servicosFormatados = String.format(servico, nome, preco);
        
        return servicosFormatados;
    }
    
}
