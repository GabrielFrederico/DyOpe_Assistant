package com.projeto.repository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import com.projeto.models.TipoOperacao;
import org.springframework.data.repository.CrudRepository;

import com.projeto.models.Gerente;
import com.projeto.models.Operacao;

public interface OperacaoRepository extends CrudRepository<Operacao, Serializable>{

	Operacao findById(long id);

	Operacao findByTipoope(TipoOperacao tipoope);
	
	Operacao findByDescricao(String descricao);
	
}
