package com.projeto.rest;

import com.projeto.models.TipoOperacao;
import com.projeto.repository.TipoOperacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("tipoOpe")
@CrossOrigin(origins = "http://localhost:4200")

public class TipoOperacaoController {

    @Autowired
    TipoOperacaoRepository tipoOperacaoRepository;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<TipoOperacao> listAll() {
        return tipoOperacaoRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{idtipoope}")
    public TipoOperacao getTipoOperacaoById(@PathVariable("idTipoOpe") long idTipoOpe) {
        TipoOperacao tipoOperacao = tipoOperacaoRepository.findByidTipoOpe(idTipoOpe);
        return tipoOperacao;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getByNome/{tipoope}")
    public TipoOperacao getTipoOperacaoByNome(@PathVariable("tipoOpe") String tipoOpe) {
        TipoOperacao tipoOperacao = tipoOperacaoRepository.findBytipoOpe(tipoOpe);
        return tipoOperacao;
    }

}
