package com.projeto.rest;

import com.projeto.models.InfoSetor;
import com.projeto.repository.InfoSetorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("infoSetor")
public class InfoSetorRest {

    @Autowired
    InfoSetorRepository infoSetorRepository;


    @RequestMapping(method = RequestMethod.POST, value = "/cadastrarInfoSetor")
    public ModelAndView save(InfoSetor infoSetor) {
        infoSetorRepository.save(infoSetor);
        return new ModelAndView("redirect:/funcionarioIndex");
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<InfoSetor> listAll() {
        return infoSetorRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id_infosetor}")
    public InfoSetor getInfoSetorById(@PathVariable("id_infosetor") long id_infosetor) {
        InfoSetor infoSetor = infoSetorRepository.findById_infosetor(id_infosetor);
        return infoSetor;
    }
    @RequestMapping(method = RequestMethod.PUT)
    public InfoSetor update(@RequestBody InfoSetor infoSetor) {
        infoSetorRepository.save(infoSetor);
        return infoSetor;
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id_infosetor}")
    public InfoSetor deleteInfoSetorById(@PathVariable("id_infosetor") long id_infosetor) {
        InfoSetor infoSetor = infoSetorRepository.findById_infosetor(id_infosetor);
        infoSetorRepository.delete(infoSetor);
        return infoSetor;
    }

}
