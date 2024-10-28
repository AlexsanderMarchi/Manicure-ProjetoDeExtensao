package com.nfproject.manicure;

public class Produtos {
    private String nome;
    private double preco;
    private int qtd_estoque;

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

    public int getQtd_estoque() {
        return qtd_estoque;
    }

    public void setQtd_estoque(int qtd_estoque) {
        if(qtd_estoque >= 0){
            this.qtd_estoque = qtd_estoque;
        }
    }
    
     @Override
    public String toString(){
        String produtos = """
                     Serviço: %s %s
                     Preço: %.2f
                     Quantidade em estoque: %d
                     """;
        String produtosFormatados = String.format(produtos, nome, preco, qtd_estoque);
        
        return produtosFormatados;
    }
}