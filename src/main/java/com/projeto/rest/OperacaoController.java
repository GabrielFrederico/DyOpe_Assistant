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
import com.projeto.repository.OperacaoRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("operacoes")
@PreAuthorize("hasRole('GERENTE') or hasRole('ADMIN')")
public class OperacaoController {

	@Autowired
	OperacaoRepository operacaoRepository;

	@RequestMapping(method = RequestMethod.POST, value = "/cadastraroperacao")
	public Operacao save(@Valid @RequestBody Operacao operacao) {

		operacaoRepository.save(operacao);
		return operacao;
	}

	@RequestMapping(method = RequestMethod.GET)
	public Iterable<Operacao> listAll() {
		return operacaoRepository.findAll();
	}

	@RequestMapping(method = RequestMethod.GET, path = "/{id}")
	public Operacao getOperacaoById(@PathVariable("id") long id) {
		Operacao operacao = operacaoRepository.findById(id);
		return operacao;
	}

	@RequestMapping(method = RequestMethod.GET, path = "operacao")
	@PreAuthorize("hasRole('GERENTE')")
	public Operacao getGerente(@RequestBody Operacao operacao) {
		return operacao;
	}

	@RequestMapping(method = RequestMethod.PUT, path = "atualizar")
	@PreAuthorize("hasRole('GERENTE')")
	public Operacao update(@RequestBody Operacao operacao) {
		operacaoRepository.save(operacao);
		return operacao;
	}

	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public Operacao deleteOperacaoById(@PathVariable("id") long id) {
		Operacao operacao = operacaoRepository.findById(id);
		operacaoRepository.delete(operacao);
		return operacao;
	}
}
