package com.projeto.repository;

import java.io.Serializable;

import org.springframework.data.repository.CrudRepository;

import com.projeto.models.Funcionario;

public interface FuncionarioRepository extends CrudRepository<Funcionario, Serializable> {

    Funcionario findById(long id);

    Boolean existsByNomeUsuario(String nomeUsuario);

    Boolean existsByEmail(String email);

    Boolean existsByCpf(String cpf);

    Boolean existsByRg(String rg);

    Boolean existsBySenha(String senha);

    Boolean existsByNome(String nome);

    Funcionario findByNome(String nome);

    Funcionario findByNomeUsuario(String nomeUsuario);

}
