package com.projeto.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.projeto.models.SubOperacao;

public interface SubOperacaoRepository extends CrudRepository<SubOperacao, Serializable> {
	
SubOperacao findById (long id);
SubOperacao findByDescricao (String descricao);

@Query(value = "SELECT * FROM SUB_OPERACAO WHERE ID_ETAPA = ?1", nativeQuery = true)
List<SubOperacao> findByIdEtapa(long idEtapa);
}
