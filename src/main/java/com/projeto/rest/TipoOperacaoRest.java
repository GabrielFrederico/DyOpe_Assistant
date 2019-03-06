package com.projeto.rest;

import com.projeto.models.TipoOperacao;
import com.projeto.repository.TipoOperacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("tipoOpe")
public class TipoOperacaoRest {

    @Autowired
    TipoOperacaoRepository tipoOperacaoRepository;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<TipoOperacao> listAll() {
        return tipoOperacaoRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public TipoOperacao getTipoOperacaoById(@PathVariable("id") long id) {
        TipoOperacao tipoOperacao = tipoOperacaoRepository.findById(id);
        return tipoOperacao;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getByNome/{tipoOpe}")
    public TipoOperacao getTipoOperacaoByNome(@PathVariable("tipoOpe") String tipoOpe) {
        TipoOperacao tipoOperacao = tipoOperacaoRepository.findByNome(tipoOpe);
        return tipoOperacao;
    }

}
