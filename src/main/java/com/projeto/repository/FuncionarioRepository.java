package com.projeto.repository;

import java.io.Serializable;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.projeto.models.Funcionario;

public interface FuncionarioRepository extends CrudRepository<Funcionario, Serializable> {

	Funcionario findById(long id);

	Boolean existsByNomeUsuario(String nomeUsuario);

	Boolean existsByEmail(String email);

	Funcionario findByNome(String nome);

    Optional<Funcionario> findByNomeUsuario(String nomeUsuario);

}
