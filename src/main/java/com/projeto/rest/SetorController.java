package com.projeto.rest;


import com.projeto.models.Setor;
import com.projeto.repository.SetorRepository;
import com.projeto.seguranca.ResponseMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("setores")

public class SetorController {

    @Autowired
    SetorRepository setorRepository;

    @RequestMapping(method = RequestMethod.POST, value = "/cadastrarsetor")
    public ResponseEntity<?> save(@RequestBody Setor setor, ModelAndView model) {
    	if(setorRepository.existsByNomeSetor(setor.getNomeSetor())) {
    		return new ResponseEntity<>(new ResponseMessage("Erro -> RG Já está em uso !"), HttpStatus.BAD_REQUEST);
    	}
        setorRepository.save(setor);
        return new ResponseEntity<>(new ResponseMessage("Setor Cadastrado com sucesso!"), HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasRole('GERENTE') or hasRole('admin')")
    public Iterable<Setor> listAll() {
        return setorRepository.findAll();
    }

    
    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    @PreAuthorize("hasRole('GERENTE') or hasRole('admin')")
    public Setor getSetorById(@PathVariable("id") long id) {
        Setor setor = setorRepository.findById(id);
        return setor;
    }
    @PreAuthorize("hasRole('GERENTE') or hasRole('admin')")
    @RequestMapping(method = RequestMethod.GET, path = "/getByNome/{nomeSetor}")
    public Setor getSetorByNome(@PathVariable("nomeSetor") String nomeSetor) {
        Setor setor = setorRepository.findByNomeSetor(nomeSetor);
        return setor;
    }

    @PreAuthorize("hasRole('GERENTE') or hasRole('admin')")
    @RequestMapping(method = RequestMethod.PUT)
    public Setor update(@RequestBody Setor setor) {
        setorRepository.save(setor);
        return setor;
    }
    @PreAuthorize("hasRole('GERENTE') or hasRole('admin')")
    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public Setor deleteSetorById(@PathVariable("id") long id) {
        Setor setor = setorRepository.findById(id);
        setorRepository.delete(setor);
        return setor;
    }

}
