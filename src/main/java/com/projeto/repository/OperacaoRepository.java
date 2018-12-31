package com.projeto.repository;

import java.io.Serializable;

import org.springframework.data.repository.CrudRepository;

import com.projeto.models.Operacao;

public interface OperacaoRepository extends CrudRepository<Operacao, Serializable>{

	Operacao findById(long id);
	
	Operacao findByTipo(long idTipoOpe);
	
	Operacao findByDescricao(String descricao);
}
