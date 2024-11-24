package com.nfproject.manicure;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;



public class Database {
     private static final String URL = "jdbc:postgresql://decently-deliberate-tripletail.data-1.use1.tembo.io:5432/postgres?user=postgres&password=rFqCbBf9QnbVEVDa";
    private static final String USER = "postgres";
    private static final String PASSWORD = "rFqCbBf9QnbVEVDa";

    public static Connection getConnection() {
         try {
            Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("Conexão estabelecida com sucesso!");
            return connection;
        } catch (SQLException e) {
            System.out.println("Erro ao conectar ao banco de dados: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
