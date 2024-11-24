package com.nfproject.manicure;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class ClienteRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Cliente> listarClientes() {
        String sql = "SELECT * FROM cliente";
        return jdbcTemplate.query(sql, new RowMapper<Cliente>() {
            @Override
            public Cliente mapRow(java.sql.ResultSet rs, int rowNum) throws java.sql.SQLException {
                return new Cliente(
                    rs.getLong("id"),
                    rs.getString("nome"),
                    rs.getString("sobrenome"),
                    rs.getLong("telefone")
                );
            }
        });
    }
    public int contarClientes() {
        String sql = "SELECT COUNT(*) FROM cliente";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }
    
    public void inserirCliente(Cliente novoCliente) {
    String sql = "INSERT INTO cliente (nome, sobrenome, telefone) VALUES (?, ?, ?)";
    jdbcTemplate.update(sql, novoCliente.getNome(), novoCliente.getSobreNome(), novoCliente.getTelefone());
}
    
    public void atualizarCliente(long id, Cliente clienteAtualizado) {
    String sql = "UPDATE cliente SET nome = ?, sobrenome = ?, telefone = ? WHERE id = ?";
    jdbcTemplate.update(sql, clienteAtualizado.getNome(), clienteAtualizado.getSobreNome(), 
                        clienteAtualizado.getTelefone(), id);
}
    public boolean clienteExiste(long id) {
    String sql = "SELECT COUNT(*) FROM cliente WHERE id = ?";
    Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
    return count != null && count > 0;
}
    
    public void deletarClientePorId(long id) {
    String sql = "DELETE FROM cliente WHERE id = ?";
    jdbcTemplate.update(sql, id);
}
}