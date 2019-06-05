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
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("etapaProducao")
@PreAuthorize("hasRole('GERENTE')")
public class EtapaProducaoController {

    @Autowired
    EtapaProducaoRepository etapaProducaoRepository;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<EtapaProducao> listAll() {
        return etapaProducaoRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public EtapaProducao getEtapaProducaoById(@PathVariable("id") long id) {
        EtapaProducao etapaProducao = etapaProducaoRepository.findById(id);
        return etapaProducao;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getByNome/{etapaProducao}")
    public EtapaProducao getEtapaProducaoByNome(@PathVariable("etapaProducao") String etapaProducao) {
        EtapaProducao etapaproducao = etapaProducaoRepository.findByEtapaProducao(etapaProducao);
        return etapaproducao;
    }

}
