package com.projeto.repository;

import com.projeto.models.TipoOperacao;
import org.springframework.data.repository.CrudRepository;

import java.io.Serializable;

public interface TipoOperacaoRepository extends CrudRepository<TipoOperacao, Serializable> {

    TipoOperacao findById(long idTipoOpe);

    TipoOperacao findByNome(String tipoOpe);
}
