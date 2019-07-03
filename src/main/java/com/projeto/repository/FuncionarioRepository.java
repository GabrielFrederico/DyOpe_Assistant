package com.projeto.repository;

import java.io.Serializable;

import org.springframework.data.repository.CrudRepository;

import com.projeto.models.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Serializable> {

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
