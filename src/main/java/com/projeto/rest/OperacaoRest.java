package com.projeto.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.repository.GerenteRepository;
import com.projeto.repository.OperacaoRepository;

@RestController
@RequestMapping("operacoes")
public class OperacaoRest {

	@Autowired
	OperacaoRepository operacaoRepository;
}
