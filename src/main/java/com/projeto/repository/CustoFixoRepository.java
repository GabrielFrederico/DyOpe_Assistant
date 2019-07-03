package com.projeto.repository;

import java.io.Serializable;

import org.springframework.data.repository.CrudRepository;

import com.projeto.models.CustoFixo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustoFixoRepository extends JpaRepository<CustoFixo, Serializable> {

	CustoFixo findById(long id);
}
