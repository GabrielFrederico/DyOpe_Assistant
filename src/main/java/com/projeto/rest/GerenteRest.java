package com.projeto.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.projeto.models.Gerente;
import com.projeto.repository.GerenteRepository;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class GerenteRest {

    @Autowired
    GerenteRepository gerenteRepository;

    @RequestMapping("/")
    String index() {
        return "index";

    }

    @RequestMapping(method = RequestMethod.POST, value = "/cadastrargerente")
    public ModelAndView save(Gerente gerente) {
        gerenteRepository.save(gerente);
        return new ModelAndView("login_gerente", "gerente", gerente);
    }


    @RequestMapping(method = RequestMethod.GET, value = "/perfilGerente.{id}")
    public ModelAndView teste(@PathVariable("id") long id) {
        Gerente gerente = gerenteRepository.findById(id);
        ModelAndView model = new ModelAndView("perfil_gerente", "gerente", gerente);
        model.addObject("nomeGerente", gerente.getNome());
        model.addObject("cpfGerente", gerente.getCpf());
        model.addObject("rgGerente", gerente.getRg());
        model.addObject("emailGerente", gerente.getEmail());

        return model;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/redefinirPerfilGerente")
    public ModelAndView redefinirPerfilGerente(Gerente gerente) {
        ModelAndView model12 = new ModelAndView("perfil_gerente", "gerente", gerente);
        gerenteRepository.save(gerente);
        return model12;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/perfil/{nome}")
    public ModelAndView perfil(@PathVariable("nome") String nome) {
        Gerente perfilGerente3 = gerenteRepository.findByNome(nome);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("nomeGerente", perfilGerente3.getNome());
        modelAndView.setViewName("redirect:/gerentePerfil");
        return modelAndView;
    }

    @RequestMapping("/hello")
    public String hello(Model model, @RequestParam(value = "name", required = false, defaultValue = "World") String name) {
        model.addAttribute("name", name);
        return "hello";
    }


    @RequestMapping(value = "/gerentelogado", method = RequestMethod.GET)
    public ModelAndView login(Model model1, Gerente gerente, String error, String logout) {
        gerenteRepository.findById(gerente.getId());
        ModelAndView model = new ModelAndView("gerente_index", "gerente", gerente);
        model.addObject("nomeGerente", gerente.getNome());

        return model;
    }


    @RequestMapping(method = RequestMethod.GET, value = "gerentes")
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
