package com.projeto.repository;

import java.io.Serializable;
import org.springframework.data.repository.CrudRepository;
import com.projeto.models.Setor;

public interface SetorRepository extends CrudRepository<Setor, Serializable> {

    Setor findById(long id);

    Setor findByNomeSetor(String nomeSetor);
    
    Boolean existsByNomeSetor(String nomeSetor);
}
