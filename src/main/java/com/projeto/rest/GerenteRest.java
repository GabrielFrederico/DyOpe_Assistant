package com.projeto.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.projeto.models.Gerente;
import com.projeto.repository.GerenteRepository;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;


@Controller
public class GerenteRest {

    @Autowired
    GerenteRepository gerenteRepository;


    @RequestMapping(method = RequestMethod.POST, value = "/cadastrarGerente")
    public ModelAndView save(Gerente gerente) {
        gerenteRepository.save(gerente);
        return new ModelAndView("redirect:/loginGerente");
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/perfilGerente.{id}")
    public ModelAndView teste(@PathVariable("id") long id) {
        Gerente gerente = gerenteRepository.findById(id);
        ModelAndView model = new ModelAndView("perfil", "gerente", gerente);
        model.addObject("nomeGerente", gerente.getNome());
        model.addObject("cpfGerente", gerente.getCpf());
        model.addObject("rgGerente", gerente.getRg());
        model.addObject("emailGerente", gerente.getEmail());

        return model;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/perfil/{nome}")
    public ModelAndView perfil(@PathVariable("nome") String nome) {
        Gerente perfilGerente = gerenteRepository.findByNome(nome);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("nomeGerente", perfilGerente.getNome());
        modelAndView.setViewName("redirect:/gerentePerfil");
        return modelAndView;
    }

    @RequestMapping("/hello")
    public String hello(Model model, @RequestParam(value = "name", required = false, defaultValue = "World") String name) {
        model.addAttribute("name", name);
        return "hello";
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

    @RequestMapping(method = RequestMethod.PUT, value = "/redefinirSenhaPerfil")
    public Gerente redefinirSenhaPerfil(Gerente gerente) {
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
