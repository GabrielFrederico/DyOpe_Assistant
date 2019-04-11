package com.projeto.rest;

import com.projeto.models.InfoSetor;

import com.projeto.repository.InfoSetorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("infosetor")
public class InfoSetorController {

    @Autowired
    InfoSetorRepository infoSetorRepository;

    @RequestMapping(method = RequestMethod.POST, value = "/cadastrarinfosetor")
    public InfoSetor save(@RequestBody InfoSetor infoSetor) {
        infoSetorRepository.save(infoSetor);
        return infoSetor;
    }


    @RequestMapping(method = RequestMethod.GET, value = "infosetores")
    public Iterable<InfoSetor> listAll() {
        return infoSetorRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{idinfosetor}")
    public InfoSetor getInfoSetorById(@PathVariable("idinfosetor") long idinfosetor) {
        InfoSetor infoSetor = infoSetorRepository.findByIdInfosetor(idinfosetor);
        return infoSetor;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "infosetor")
    public InfoSetor update(@RequestBody InfoSetor infoSetor) {
        infoSetorRepository.save(infoSetor);
        return infoSetor;
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{idinfosetor}")
    public InfoSetor deleteInfoSetorById(@PathVariable("idInfosetor") long idInfosetor) {
        InfoSetor infoSetor = infoSetorRepository.findByIdInfosetor(idInfosetor);
        infoSetorRepository.delete(infoSetor);
        return infoSetor;
    }

}
