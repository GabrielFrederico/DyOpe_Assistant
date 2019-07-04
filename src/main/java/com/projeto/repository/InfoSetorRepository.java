package com.projeto.repository;

import com.projeto.models.InfoSetor;
import org.springframework.data.repository.CrudRepository;

import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfoSetorRepository extends  CrudRepository<InfoSetor, Serializable>{

    InfoSetor findByIdInfosetor(long idInfosetor);

}
