package com.projeto.rest;

import com.projeto.models.InfoSetor;
import com.projeto.repository.InfoSetorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("infoSetor")
public class InfoSetorController {

    @Autowired
    InfoSetorRepository infoSetorRepository;

    @RequestMapping(method = RequestMethod.POST, value = "/cadastrarInfoSetor")
    public ModelAndView save(InfoSetor infoSetor) {
        infoSetorRepository.save(infoSetor);
        return new ModelAndView("redirect:/funcionarioIndex");
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<InfoSetor> listAll() {
        return infoSetorRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{idInfosetor}")
    public InfoSetor getInfoSetorById(@PathVariable("idInfosetor") long idInfosetor) {
        InfoSetor infoSetor = infoSetorRepository.findByIdInfosetor(idInfosetor);
        return infoSetor;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public InfoSetor update(@RequestBody InfoSetor infoSetor) {
        infoSetorRepository.save(infoSetor);
        return infoSetor;
    }
    @ResponseBody
    @RequestMapping(method = RequestMethod.DELETE, path = "/{idInfosetor}")
    public InfoSetor deleteInfoSetorById(@PathVariable("idInfosetor") long idInfosetor) {
        InfoSetor infoSetor = infoSetorRepository.findByIdInfosetor(idInfosetor);
        infoSetorRepository.delete(infoSetor);
        return infoSetor;
    }

}
