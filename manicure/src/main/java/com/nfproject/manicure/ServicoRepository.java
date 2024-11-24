package com.nfproject.manicure;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class ServicoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Servico> listarServicos() {
        String sql = "SELECT * FROM servico";
        return jdbcTemplate.query(sql, new RowMapper<Servico>() {
            @Override
            public Servico mapRow(java.sql.ResultSet rs, int rowNum) throws java.sql.SQLException {
                return new Servico(
                    rs.getLong("id"),
                    rs.getString("nome"),
                    rs.getDouble("preco")
                );
            }
        });
    }
    public int contarServicos() {
        String sql = "SELECT COUNT(*) FROM servico";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }
    
    public void inserirServico(Servico novoServico) {
    String sql = "INSERT INTO servico (nome, preco) VALUES (?, ?)";
    jdbcTemplate.update(sql, novoServico.getNome(), novoServico.getPreco());
}
    
    public void atualizarServico(long id, Servico servicoAtualizado) {
    String sql = "UPDATE servico SET nome = ?, preco = ? WHERE id = ?";
    jdbcTemplate.update(sql, servicoAtualizado.getNome(), servicoAtualizado.getPreco(), id);
}
    public boolean servicoExiste(long id) {
    String sql = "SELECT COUNT(*) FROM servico WHERE id = ?";
    Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
    return count != null && count > 0;
}
    
    public void deletarServicoPorId(long id) {
    String sql = "DELETE FROM servico WHERE id = ?";
    jdbcTemplate.update(sql, id);
}
}