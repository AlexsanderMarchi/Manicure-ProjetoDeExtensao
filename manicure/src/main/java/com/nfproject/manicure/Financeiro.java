package com.nfproject.manicure;
import java.util.Scanner;

public class Financeiro {

    private double entrada;
    private double saida;

    public Financeiro() {
        this.entrada = 0.0;
        this.saida = 0.0;
    }

    public void adicionarEntrada(double valor) {
        if (valor > 0) {
            entrada += valor;
            System.out.println("Entrada adicionada: " + valor);
        } else {
            System.out.println("Valor de entrada deve ser positivo.");
        }
    }

    public void adicionarSaida(double valor) {
        if (valor > 0) {
            saida += valor;
            System.out.println("Saída adicionada: " + valor);
        } else {
            System.out.println("Valor de saída deve ser positivo.");
        }
    }

    public double calcularSaldo() {
        return entrada - saida;
    }

    public void mostrarResumo() {
        System.out.println("Resumo Financeiro:");
        System.out.println("Total de Entradas: " + entrada);
        System.out.println("Total de Saídas: " + saida);
        System.out.println("Saldo Geral: " + calcularSaldo());
    }
    
     public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Financeiro financeiro = new Financeiro();
        int opcao;

        do {
            System.out.println("\nMenu:");
            System.out.println("1. Adicionar Entrada");
            System.out.println("2. Adicionar Saída");
            System.out.println("3. Mostrar Resumo Financeiro");
            System.out.println("0. Sair");
            System.out.print("Escolha uma opção: ");
            opcao = scanner.nextInt();

            switch (opcao) {
                case 1:
                    System.out.print("Digite o valor da entrada: ");
                    double valorEntrada = scanner.nextDouble();
                    financeiro.adicionarEntrada(valorEntrada);
                    break;
                case 2:
                    System.out.print("Digite o valor da saída: ");
                    double valorSaida = scanner.nextDouble();
                    financeiro.adicionarSaida(valorSaida);
                    break;
                case 3:
                    financeiro.mostrarResumo();
                    break;
                case 0:
                    System.out.println("Saindo...");
                    break;
                default:
                    System.out.println("Opção inválida! Tente novamente.");
            }
        } while (opcao != 0);

        scanner.close();
    }
}

