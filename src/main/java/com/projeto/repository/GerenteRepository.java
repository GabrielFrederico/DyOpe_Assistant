package com.projeto.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import com.projeto.models.Gerente;

public interface GerenteRepository extends JpaRepository<Gerente, Long> {

    Gerente findById(long id);

    Gerente findByNome(String nome);

}
