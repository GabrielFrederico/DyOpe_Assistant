package com.projeto.rest;

import com.projeto.models.Operacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.repository.OperacaoRepository;

@RestController
@RequestMapping("operacoes")
public class OperacaoRest {

	@Autowired
	OperacaoRepository operacaoRepository;

	@RequestMapping(method = RequestMethod.POST, value="/cadastrarOperacao")
	public Operacao save(Operacao operacao) {
		operacaoRepository.save(operacao);
		return operacao;
	}

	@RequestMapping(method = RequestMethod.GET)
	public  Iterable<Operacao> listAll(){
		return operacaoRepository.findAll();
	}
}
