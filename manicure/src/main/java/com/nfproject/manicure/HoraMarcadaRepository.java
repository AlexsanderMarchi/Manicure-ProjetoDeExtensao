package com.nfproject.manicure;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class HoraMarcadaRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
      
    public List<HoraMarcada> listarAgendamentos() {
        // Fazendo JOIN com as tabelas Cliente e Servico
        String sql = "SELECT hm.ID_HoraMarcada, hm.DIA, hm.hora, hm.ID_Cliente, hm.ID_Servico, " +
                     "c.Nome as cliente_nome, c.Sobrenome as cliente_sobrenome, c.Telefone as cliente_telefone, " +
                     "s.Nome as servico_nome, s.Preco as servico_preco " +
                     "FROM HoraMarcada hm " +
                     "JOIN Cliente c ON hm.ID_Cliente = c.id " +
                     "JOIN Servico s ON hm.ID_Servico = s.id";
        
        return jdbcTemplate.query(sql, new RowMapper<HoraMarcada>() {
            @Override
            public HoraMarcada mapRow(java.sql.ResultSet rs, int rowNum) throws java.sql.SQLException {
                long id = rs.getLong("ID_HoraMarcada");
                String dia = rs.getString("DIA");
                String hora = rs.getString("hora");

                // Mapeando os dados de Cliente
                Cliente cliente = new Cliente(
                        rs.getLong("ID_Cliente"),
                        rs.getString("cliente_nome"),
                        rs.getString("cliente_sobrenome"),
                        rs.getLong("cliente_telefone")
                );

                // Mapeando os dados de Servico
                Servico servico = new Servico(
                        rs.getLong("ID_Servico"),
                        rs.getString("servico_nome"),
                        rs.getDouble("servico_preco")
                );

                // Retorna o agendamento com Cliente e Servico associados
                return new HoraMarcada(id, dia, hora, cliente, servico);
            }
        });
    }
    
    public void inserirHoraMarcada(HoraMarcada horaMarcada) {
        String sql = "INSERT INTO HoraMarcada (DIA, hora, ID_Cliente, ID_Servico) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, horaMarcada.getDia(), horaMarcada.getHora(), 
                            horaMarcada.getCliente().getId(), horaMarcada.getServico().getId());
    }
    
    public int contarAgendamentos() {
        String sql = "SELECT COUNT(*) FROM HoraMarcada";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }
    
    public void deletarAgendamentoPorId(long id_horamarcada) {
    String sql = "DELETE FROM HoraMarcada WHERE id_horamarcada = ?";
    jdbcTemplate.update(sql, id_horamarcada);
}
}
