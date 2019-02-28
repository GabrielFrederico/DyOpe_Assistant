package com.projeto.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.projeto.models.Gerente;
import com.projeto.repository.GerenteRepository;

@RestController
@RequestMapping("gerentes")

public class GerenteRest {
	
	@Autowired
	GerenteRepository gerenteRepository;
	
	@RequestMapping(method = RequestMethod.POST, value="/cadastrarGerente")
	public Gerente save(Gerente gerente) {
		gerenteRepository.save(gerente);
		return gerente;
	}
	@ResponseBody
	@RequestMapping(value ="../../../cadastroGerente", method = RequestMethod.GET)
	public String cadastroGerente(Model model){
		model.addAttribute("gerente", new Gerente());
		return "cadastro_gerente";
	}

	@RequestMapping(value ="/loginGerente", method = RequestMethod.GET)
		public String loginGerente(Model model){
		model.addAttribute("login_gerente");
			return "loginGerente";
	}

	@RequestMapping(method = RequestMethod.GET)
	   public Iterable<Gerente> listAll(){
		   return gerenteRepository.findAll();
	   }
	
	 @RequestMapping(method = RequestMethod.GET, path = "/{id}")
	   public Gerente getGerenteById(@PathVariable("id")long id){
		   Gerente gerente = gerenteRepository.findById(id);
		   return gerente;
	   }
	   
	   @RequestMapping(method = RequestMethod.GET, path = "/getByNome/{nome}")
	   public Gerente getGerenteByNome(@PathVariable("nome") String nome){
		   Gerente gerente = gerenteRepository.findByNome(nome);
		   return gerente;
	   }
	   
	   @RequestMapping(method = RequestMethod.PUT)
		public Gerente update(@RequestBody Gerente gerente) {
			gerenteRepository.save(gerente);
			return gerente;
		}
	   
	   @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
		public Gerente deleteGerenteById(@PathVariable("id") long id) {
		   Gerente gerente = gerenteRepository.findById(id);
		   gerenteRepository.delete(gerente);
			return gerente;
		}
}
