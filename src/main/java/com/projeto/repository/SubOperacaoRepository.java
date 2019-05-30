package com.projeto.repository;

import java.io.Serializable;

import org.springframework.data.repository.CrudRepository;

import com.projeto.models.SubOperacao;

public interface SubOperacaoRepository extends CrudRepository<SubOperacao, Serializable> {
	
SubOperacao findById (long id);
SubOperacao findByDescricao (String descricao);
}
