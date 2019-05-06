package com.projeto.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.InfoSetor;
import com.projeto.repository.InfoSetorRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("infosetor")
public class InfoSetorController {

    @Autowired
    InfoSetorRepository infoSetorRepository;

    @RequestMapping(method = RequestMethod.POST, value = "/cadastrarinfosetor")
    @PreAuthorize("hasRole('FUNCIONARIO')")
    public InfoSetor save(@RequestBody InfoSetor infoSetor) {
        infoSetorRepository.save(infoSetor);
        return infoSetor;
    }


    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasRole('GERENTE')")
    public Iterable<InfoSetor> listAll() {
        return infoSetorRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{idinfosetor}")
    @PreAuthorize("hasRole('GERENTE')")
    public InfoSetor getInfoSetorById(@PathVariable("idinfosetor") long idinfosetor) {
        InfoSetor infoSetor = infoSetorRepository.findByIdInfosetor(idinfosetor);
        return infoSetor;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "infosetor")
    @PreAuthorize("hasRole('FUNCIONARIO')")
    public InfoSetor update(@RequestBody InfoSetor infoSetor) {
        infoSetorRepository.save(infoSetor);
        return infoSetor;
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{idinfosetor}")
    @PreAuthorize("hasRole('FUNCIONARIO')")
    public InfoSetor deleteInfoSetorById(@PathVariable("idInfosetor") long idInfosetor) {
        InfoSetor infoSetor = infoSetorRepository.findByIdInfosetor(idInfosetor);
        infoSetorRepository.delete(infoSetor);
        return infoSetor;
    }

}
