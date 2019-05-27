package com.projeto.rest;

import com.projeto.models.EtapaProducao;
import com.projeto.repository.EtapaProducaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("tipoOpe")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('GERENTE')")
public class EtapaProducaoController {

    @Autowired
    EtapaProducaoRepository etapaProducaoRepository;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<EtapaProducao> listAll() {
        return etapaProducaoRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{idTipoOpe}")
    public EtapaProducao getEtapaProducaoById(@PathVariable("idTipoOpe") long idTipoOpe) {
        EtapaProducao etapaProducao = etapaProducaoRepository.findByidTipoOpe(idTipoOpe);
        return etapaProducao;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getByNome/{tipoope}")
    public EtapaProducao getEtapaProducaoByNome(@PathVariable("tipoOpe") String tipoOpe) {
        EtapaProducao etapaProducao = etapaProducaoRepository.findBytipoOpe(tipoOpe);
        return etapaProducao;
    }

}