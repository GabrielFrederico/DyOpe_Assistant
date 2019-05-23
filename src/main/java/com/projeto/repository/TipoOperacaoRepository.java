package com.projeto.repository;

import com.projeto.models.EtapaProducao;
import org.springframework.data.repository.CrudRepository;

import java.io.Serializable;

public interface EtapaProducaoRepository extends CrudRepository<EtapaProducao, Serializable> {

    EtapaProducao findByidTipoOpe(long idTipoOpe);

    EtapaProducao findBytipoOpe(String tipoOpe);
}
