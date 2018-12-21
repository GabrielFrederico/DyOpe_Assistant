package com.projeto.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.Gerente;
import com.projeto.repository.GerenteRepository;

@RestController
@RequestMapping("gerentes")
public class GerenteRest {
	
	@Autowired
	GerenteRepository gerenteRepository;
	
	@RequestMapping(method = RequestMethod.POST)
	public Gerente save(@RequestBody Gerente gerente) {
		gerenteRepository.save(gerente);
		return gerente;
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
