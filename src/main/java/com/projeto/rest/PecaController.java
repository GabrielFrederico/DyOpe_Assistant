package com.projeto.rest;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.Operacao;
import com.projeto.models.Peca;
import com.projeto.repository.OperacaoRepository;
import com.projeto.repository.PecaRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("pecas")
@PreAuthorize("hasRole('GERENTE') or hasRole('ADMIN')")
public class PecaController {

	@Autowired
	PecaRepository pecaRepository;
	@Autowired
	OperacaoRepository operacaoRepository;

	@RequestMapping(method = RequestMethod.POST, value = "/cadastrarpeca")
	public Peca save(@Valid @RequestBody Peca peca) {
		pecaRepository.save(peca);
		return peca;
	}

	@RequestMapping(method = RequestMethod.GET)
	public Iterable<Peca> listAll() {
		return pecaRepository.findAll();
	}

	@RequestMapping(method = RequestMethod.GET, path = "/getByNome/{descricao}")
	public Peca getPecaByNome(@PathVariable("descricao") String descricao) {
		Peca peca = pecaRepository.findByDescricao(descricao);
		return peca;
	}

	@RequestMapping(method = RequestMethod.GET, path = "/{id}")
	public Peca getPecaById(@PathVariable("id") long id) {
		Peca peca = pecaRepository.findById(id);
		return peca;
	}

	@RequestMapping(method = RequestMethod.PUT)
	public Peca update(@RequestBody Peca peca) {
		if (peca.getOperacoesAndamento().size() == 1) {
			pecaRepository.save(peca);
	
		}
		Operacao ultima = peca.getOperacoes().get(peca.getOperacoes().size() - 1);
		Operacao.calcular(ultima);
		pecaRepository.save(peca);
		return peca;
	}

	@RequestMapping(method = RequestMethod.PUT, value = "operacao")
	public Peca updateOpe(@RequestBody Peca peca) {

		pecaRepository.save(peca);
		return peca;
	}

	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public Peca deletePecaById(@PathVariable("id") long id) {
		Peca peca = pecaRepository.findById(id);
		pecaRepository.delete(peca);
		return peca;
	}
}
