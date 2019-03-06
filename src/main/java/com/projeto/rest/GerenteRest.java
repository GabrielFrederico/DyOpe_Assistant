package com.projeto.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.projeto.models.Gerente;
import com.projeto.repository.GerenteRepository;
import org.springframework.web.servlet.ModelAndView;


@RestController
@RequestMapping("gerentes")

public class GerenteRest {

    @Autowired
    GerenteRepository gerenteRepository;


    @RequestMapping(method = RequestMethod.POST, value = "/cadastrarGerente")
    public ModelAndView save(Gerente gerente, ModelAndView model) {
        gerenteRepository.save(gerente);
        return new ModelAndView("redirect:/loginGerente");
    }

    @RequestMapping(value = "/loginGerente", method = RequestMethod.GET)
    public ModelAndView login(ModelAndView model, Model model1, Gerente gerente, String error, String logout) {
        gerenteRepository.findById(gerente.getId());

        return new ModelAndView("redirect:/gerenteIndex");
    }


    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Gerente> listAll() {
        return gerenteRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public Gerente getGerenteById(@PathVariable("id") long id) {
        Gerente gerente = gerenteRepository.findById(id);
        return gerente;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public ModelAndView perfil(@PathVariable("id") long id) {
        Gerente gerente = gerenteRepository.findById(id);

        return new ModelAndView("redirect:/gerentePerfil");

    }


    @RequestMapping(method = RequestMethod.GET, path = "/getByNome/{nome}")
    public Gerente getGerenteByNome(@PathVariable("nome") String nome) {
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
