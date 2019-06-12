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

import com.projeto.models.SubOperacao;
import com.projeto.repository.SubOperacaoRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("suboperacoes")
@PreAuthorize("hasRole('GERENTE') or hasRole('ADMIN')")
public class SubOperacaoController {
	@Autowired
	SubOperacaoRepository subOperacaoRepository;
    

	@RequestMapping(method = RequestMethod.POST, value="/cadastrarsubOperacao")
	public SubOperacao save(@Valid @RequestBody SubOperacao subOperacao) {
		subOperacaoRepository.save(subOperacao);
		return subOperacao;
	}
	
	
	@RequestMapping(method = RequestMethod.GET)
	public  Iterable<SubOperacao> listAll(){
		return subOperacaoRepository.findAll();
	}
	
	
	@RequestMapping(method = RequestMethod.GET, value = "acabamento")
	public  Iterable<SubOperacao> listAllacabamento(){
		return subOperacaoRepository.listByAcabamento();
	}
	
	@RequestMapping(method = RequestMethod.GET, path = "/getByNome/{descricao}")
	public SubOperacao getSubOperacaoByNome(@PathVariable("descricao") String descricao) {
		SubOperacao subOperacao  = subOperacaoRepository.findByDescricao(descricao);
		return subOperacao ;
	}
	@RequestMapping(method = RequestMethod.GET, path = "/{id}")
	public SubOperacao getSubOperacaoById(@PathVariable("id") long id) {
		SubOperacao subOperacao = subOperacaoRepository.findById(id);
		return subOperacao;
	}
	
	@RequestMapping(method = RequestMethod.PUT)
	public SubOperacao update(@RequestBody SubOperacao subOperacao ) {
		subOperacaoRepository.save(subOperacao );
		return subOperacao ;
	}

	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public SubOperacao deleteSubOperacaoById(@PathVariable("id") long id) {
		SubOperacao subOperacao  = subOperacaoRepository.findById(id);
		subOperacaoRepository.delete(subOperacao );
		return subOperacao ;
	}

}
