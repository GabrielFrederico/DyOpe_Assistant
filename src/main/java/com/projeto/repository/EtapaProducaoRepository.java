package com.projeto.repository;

import com.projeto.models.EtapaProducao;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EtapaProducaoRepository extends CrudRepository<EtapaProducao, Serializable> {

    EtapaProducao findById(long id);

    EtapaProducao findByEtapaProducao(String etapaProducao);
    
    @Query(value = "SELECT * FROM etapa_producao WHERE predefinidas = 1", nativeQuery = true)
	Iterable<EtapaProducao> listaEtapasPredefinidas();
}
