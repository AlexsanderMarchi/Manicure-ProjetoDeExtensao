package com.nfproject.manicure;


public class Empregado {
    private String nome;
    private String sobreNome;
    private String telefone;
    private String cargo;

    public Empregado (String nome, String sobreNome, String telefone, String cargo){
        setNome(nome);
        setSobreNome(sobreNome);
        setTelefone(telefone);
        setCargo(cargo);
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

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        if(!cargo.isBlank()){
            this.cargo = cargo;
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
        String empregado = """
                     Empregado: %s $s
                     Contato: %s
                     Cargo: %s
                     """;
        String empregadoFormatados = String.format(empregado, nome, sobreNome, telefone, cargo);
        
        return empregadoFormatados;
    }
}
