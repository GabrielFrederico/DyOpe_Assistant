package com.projeto.repository;

import com.projeto.models.Setor;
import org.springframework.data.repository.CrudRepository;

import java.io.Serializable;

public interface SetorRepository extends CrudRepository<Setor, Serializable> {

    Setor findById(long id);

    Setor findByNome_setor(String nome);
}
