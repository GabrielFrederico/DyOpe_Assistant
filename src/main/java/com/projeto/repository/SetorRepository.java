package com.projeto.repository;

import java.io.Serializable;
import org.springframework.data.repository.CrudRepository;
import com.projeto.models.Setor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SetorRepository extends JpaRepository<Setor, Serializable> {

    Setor findById(long id);

    Setor findByNomeSetor(String nomeSetor);
    
    Boolean existsByNomeSetor(String nomeSetor);
}
