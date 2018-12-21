package com.projeto.repository;

import java.io.Serializable;

import org.springframework.data.repository.CrudRepository;

import com.projeto.models.Funcionario;

public interface FuncionarioRepository extends CrudRepository<Funcionario, Serializable> {
	
	Funcionario findById(long id);
	
	Funcionario findByNome(String nome);

}
