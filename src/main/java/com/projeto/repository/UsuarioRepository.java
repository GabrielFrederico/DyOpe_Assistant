package com.projeto.repository;

import java.io.Serializable;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.projeto.models.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, Serializable> {

    Usuario findById(long id);

    Boolean existsByEmail(String email);

    Optional<Usuario> findByNomeUsuario(String nomeUsuario);

    Boolean existsByNomeUsuario(String nomeUsuario);

    Boolean existsBySenha(String senha);
    
    Usuario findBySenha(String senha);
}
