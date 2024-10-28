package com.nfproject.manicure;


public class Servico {
    private String nome;
    private double preco;

    public Servico (String nome, double preco){
        setNome(nome);
        setPreco(preco);
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
        String servicoFormatados = String.format(servico, nome, preco);
        
        return servicoFormatados;
    }
    
}
