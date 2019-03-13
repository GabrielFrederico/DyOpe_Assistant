package com.projeto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import com.projeto.models.Gerente;
import com.projeto.repository.GerenteRepository;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;


@Controller
@RequestMapping("gerentes")
public class GerenteController {

    @Autowired
    GerenteRepository gerenteRepository;


    @RequestMapping(method = RequestMethod.POST, value = "/cadastrarGerente")
    public ModelAndView save(Gerente gerente, ModelMap model) {
        gerenteRepository.save(gerente);

        model.addAttribute("nome", gerente.getNome());
        model.addAttribute("id", gerente.getId());

        return new ModelAndView("redirect:/loginGerente");
    }

    @RequestMapping(method = RequestMethod.GET, path = "/perfila/{id}")
    public ModelAndView teste(@PathVariable("id") long id, Map<String, Object> item){
        Gerente gerente = gerenteRepository.findById(id);
        item.put("nome", gerente.getNome());
        item.put("cpf", gerente.getCpf());
        ModelAndView modelAndView = new ModelAndView("perfil");
        modelAndView.addObject("nomeGerente", gerente);
        return modelAndView;
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

    @RequestMapping(method = RequestMethod.GET, path = "/perfil/{nome}")
    public ModelAndView perfil(@PathVariable("nome") String nome, ModelMap item) {
        Gerente perfilGerente = gerenteRepository.findByNome(nome);
        item.put("nome", perfilGerente.getNome());
        item.put("cpf", perfilGerente.getCpf());
        return new ModelAndView("redirect:/perfilGerente", "dadosGer", item);
    }
    @RequestMapping("/perfilGerente")
    public String ok() {

        return "perfil";
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
