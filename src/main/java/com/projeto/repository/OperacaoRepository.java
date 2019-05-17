package com.projeto.repository;

import java.io.Serializable;

import org.springframework.data.repository.CrudRepository;

import com.projeto.models.Operacao;
import com.projeto.models.TipoOperacao;

public interface OperacaoRepository extends CrudRepository<Operacao, Serializable>{

	Operacao findById(long id);

	Operacao findByTipoope(TipoOperacao tipoope);
	
	Operacao findByDescricao(String descricao);
	
}
