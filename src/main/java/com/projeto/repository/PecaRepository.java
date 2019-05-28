package com.projeto.repository;

import java.io.Serializable;

import org.springframework.data.repository.CrudRepository;

import com.projeto.models.Peca;

public interface PecaRepository extends CrudRepository<Peca, Serializable> {
	
	Peca findById (long id);
	
	Peca findByDescricao (String descricao);

}
