package com.projeto.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.projeto.models.Gerente;
import com.projeto.repository.GerenteRepository;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("gerentes")
public class GerenteRest {
	
	@Autowired
	GerenteRepository gerenteRepository;
	
	@RequestMapping(method = RequestMethod.POST, value="/cadastrarGerente")
	public Gerente save(@RequestBody Gerente gerente) {
		gerenteRepository.save(gerente);
		return gerente;
	}
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value ="/cadastro")
	public ModelAndView cadastro(){
        ModelAndView model = new ModelAndView();

        model.setViewName("cadastro");
		return model;
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
