package com.projeto.rest;


import com.projeto.models.Setor;
import com.projeto.repository.SetorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("setores")
public class SetorController {

    @Autowired
    SetorRepository setorRepository;

    @RequestMapping(method = RequestMethod.POST, value = "/cadastrarsetor")
    public Setor save(@RequestBody Setor setor, ModelAndView model) {
        setorRepository.save(setor);
        return setor;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Setor> listAll() {
        return setorRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public Setor getSetorById(@PathVariable("id") long id) {
        Setor setor = setorRepository.findById(id);
        return setor;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getByNome/{nomesetor}")
    public Setor getSetorByNome(@PathVariable("nomeSetor") String nomeSetor) {
        Setor setor = setorRepository.findByNomeSetor(nomeSetor);
        return setor;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Setor update(@RequestBody Setor setor) {
        setorRepository.save(setor);
        return setor;
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public Setor deleteSetorById(@PathVariable("id") long id) {
        Setor setor = setorRepository.findById(id);
        setorRepository.delete(setor);
        return setor;
    }

}
