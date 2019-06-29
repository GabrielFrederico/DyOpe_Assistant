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
public class EtapaProducaoController {

	@Autowired
	EtapaProducaoRepository etapaProducaoRepository;

	@PreAuthorize("hasRole('GERENTE') or hasRole('FUNCIONARIO') or hasRole('ADMIN')")
	@RequestMapping(method = RequestMethod.GET)
	public Iterable<EtapaProducao> listAll() {
		return etapaProducaoRepository.findAll();
	}

	@PreAuthorize("hasRole('GERENTE') or hasRole('FUNCIONARIO') or hasRole('ADMIN')")
	@RequestMapping(method = RequestMethod.GET, path="predefinidas")
	public Iterable<EtapaProducao> listarEtapasPredefinidas() {
		return etapaProducaoRepository.listaEtapasPredefinidas();
	}
	
	@PreAuthorize("hasRole('GERENTE')")
	@RequestMapping(method = RequestMethod.GET, path = "/{id}")
	public EtapaProducao getEtapaProducaoById(@PathVariable("id") long id) {
		EtapaProducao etapaProducao = etapaProducaoRepository.findById(id);
		return etapaProducao;
	}

	@PreAuthorize("hasRole('GERENTE')")
	@RequestMapping(method = RequestMethod.GET, path = "/getByNome/{etapaProducao}")
	public EtapaProducao getEtapaProducaoByNome(@PathVariable("etapaProducao") String etapaProducao) {
		EtapaProducao etapaproducao = etapaProducaoRepository.findByEtapaProducao(etapaProducao);
		return etapaproducao;
	}

}
