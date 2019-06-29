package com.projeto.repository;

import java.io.Serializable;

import org.springframework.data.repository.CrudRepository;

import com.projeto.models.CustoFixo;

public interface CustoFixoRepository extends CrudRepository<CustoFixo, Serializable> {

	CustoFixo findById(long id);
}
