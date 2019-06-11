package com.projeto.repository;

import java.io.Serializable;
import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.projeto.models.SubOperacao;

public interface SubOperacaoRepository extends CrudRepository<SubOperacao, Serializable> {

	SubOperacao findById(long id);

	SubOperacao findByDescricao(String descricao);
 
	@Query(value = "SELECT * FROM SUB_OPERACAO WHERE ID_ETAPA = 5", nativeQuery = true)
	Set<SubOperacao> listByAcabamento();
}
