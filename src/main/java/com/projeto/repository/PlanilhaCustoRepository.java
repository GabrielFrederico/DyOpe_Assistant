package com.projeto.repository;

import java.io.Serializable;
import org.springframework.data.repository.CrudRepository;
import com.projeto.models.PlanilhaCusto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanilhaCustoRepository extends CrudRepository<PlanilhaCusto, Serializable> {
	PlanilhaCusto findById(long id);
}
