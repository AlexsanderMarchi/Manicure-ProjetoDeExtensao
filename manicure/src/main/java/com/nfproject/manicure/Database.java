package com.nfproject.manicure;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;



public class Database {
     private static final String URL = "jdbc:mysql://localhost:3306/nome_do_banco"; // Altere para o nome do seu banco
    private static final String USER = "Admin"; // Nome de usuário
    private static final String PASSWORD = "manicuredatabase2024"; // Senha do usuário

    public static Connection getConnection() {
        Connection connection = null;
        try {
            connection = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("Conexão estabelecida com sucesso!");
        } catch (SQLException e) {
            System.out.println("Erro ao conectar ao banco de dados: " + e.getMessage());
        }
        return connection;
    }
    
}
