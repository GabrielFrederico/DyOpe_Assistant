package com.projeto.repository;

import java.io.Serializable;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.projeto.models.Gerente;

public interface GerenteRepository extends CrudRepository<Gerente, Serializable> {

    Gerente findById(long id);
    
    
    Boolean existsByNomeUsuario(String nomeUsuario);

    Boolean existsByEmail(String email);

    Boolean existsByCpf(String cpf);

    Boolean existsByRg(String rg);

    Boolean existsBySenha(String senha);

    Boolean existsByNome(String nome);

    Gerente findByNome(String nome);
    
 
    
    Optional<Gerente> findByNomeUsuario(String nomeUsuario);
}
