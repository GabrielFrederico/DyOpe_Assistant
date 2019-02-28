package com.projeto.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.Funcionario;
import com.projeto.repository.FuncionarioRepository;

@RestController
@RequestMapping("funcionarios")
public class FuncionarioRest {
    
	@Autowired
	FuncionarioRepository funcionarioRepoository;
	
	@RequestMapping(method = RequestMethod.POST, value="/cadastrarFuncionario")
	public Funcionario save(Funcionario funcionario) {
		funcionarioRepoository.save(funcionario);
		return funcionario;
	}

	
	@RequestMapping(method = RequestMethod.GET)
	public Iterable<Funcionario> listAll(){
		return funcionarioRepoository.findAll();
	}
 }
