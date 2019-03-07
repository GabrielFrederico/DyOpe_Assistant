package com.projeto.repository;

import com.projeto.models.Usuario;
import org.springframework.data.repository.CrudRepository;

import java.io.Serializable;

public interface UsuarioRepository extends CrudRepository<Usuario, Serializable> {

    Usuario findById(long id);

    Usuario findByNomeUsuario(String nomeUsuario);
}
