package com.nfproject.manicure;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.nfproject.manicure")
public class ManicureApplication {

	public static void main(String[] args) {
		SpringApplication.run(ManicureApplication.class, args);
                try {
                    Database.getConnection();
                } catch (Exception e) {
                    System.err.println("Erro ao tentar conectar ao banco de dados: " + e.getMessage());
                }
	}

}
