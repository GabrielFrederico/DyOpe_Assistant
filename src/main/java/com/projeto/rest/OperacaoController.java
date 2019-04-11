package com.projeto.rest;

import com.projeto.models.Operacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.projeto.repository.OperacaoRepository;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("operacoes")
public class OperacaoController {

	@Autowired
	OperacaoRepository operacaoRepository;

	@RequestMapping(method = RequestMethod.POST, value="/cadastraroperacao")
	public Operacao save(@RequestBody Operacao operacao) {
		operacaoRepository.save(operacao);
		return operacao;
	}
	@RequestMapping(method = RequestMethod.GET)
	public  Iterable<Operacao> listAll(){
		return operacaoRepository.findAll();
	}

	@RequestMapping(method = RequestMethod.GET, path = "/getByNome/{descricao}")
	public Operacao getOperacaoByNome(@PathVariable("descricao") String descricao) {
		Operacao operacao  = operacaoRepository.findByDescricao(descricao);
		return operacao ;
	}
	@RequestMapping(method = RequestMethod.GET, path = "/{id}")
	public Operacao getOperacaoById(@PathVariable("id") long id) {
		Operacao operacao = operacaoRepository.findById(id);
		return operacao;
	}

	@RequestMapping(method = RequestMethod.PUT)
	public Operacao update(@RequestBody Operacao operacao ) {
		operacaoRepository.save(operacao );
		return operacao ;
	}

	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public Operacao deleteOperacaoById(@PathVariable("id") long id) {
		Operacao operacao  = operacaoRepository.findById(id);
		operacaoRepository.delete(operacao );
		return operacao ;
	}
}
