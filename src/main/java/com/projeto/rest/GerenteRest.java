package com.projeto.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.projeto.models.Gerente;
import com.projeto.repository.GerenteRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("gerentes")
public class GerenteRest {

    @Autowired
    GerenteRepository gerenteRepository;
 

    @RequestMapping(method = RequestMethod.POST, value = "/cadastrargerente")
    public Gerente save(@RequestBody Gerente gerente) {
        gerenteRepository.save(gerente);
        return gerente;
    }

    
    @RequestMapping(method = RequestMethod.GET, value = "/perfilGerente.{id}")
    public Gerente teste(@PathVariable("id") long id) {
        Gerente gerente = gerenteRepository.findById(id);
        return gerente;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/redefinirPerfilGerente")
    public Gerente redefinirPerfilGerente(Gerente gerente) {
        gerenteRepository.save(gerente);
        return gerente;
    }

    @RequestMapping(value = "/gerentelogado", method = RequestMethod.GET)
    public Gerente login(Gerente gerente, String error, String logout) {
        gerenteRepository.findById(gerente.getId());

        return gerente;
    }


    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Gerente> listAll() {
        return gerenteRepository.findAll();
    }
    

    @RequestMapping(method = RequestMethod.GET, path = "gerente.{id}")
    public Gerente getGerenteById(@PathVariable("id") long id) {
        Gerente gerente = gerenteRepository.findById(id);
        return gerente;
    }


    @RequestMapping(method = RequestMethod.GET, path = "gerente/getByNome/{nome}")
    public Gerente getGerenteByNome(@PathVariable("nome") String nome) {
        Gerente gerente = gerenteRepository.findByNome(nome);
        return gerente;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "gerente")
    public Gerente update(@RequestBody Gerente gerente) {
        gerenteRepository.save(gerente);
        return gerente;
    }


    @RequestMapping(method = RequestMethod.POST, value = "/redefinirsenhaperfilgerente")
    public Gerente redefinirSenhaPerfilGerente(Gerente gerente) {
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
