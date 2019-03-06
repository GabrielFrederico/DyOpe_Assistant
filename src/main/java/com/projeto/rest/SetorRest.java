package com.projeto.rest;


import com.projeto.models.Setor;
import com.projeto.repository.SetorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("setor")

public class SetorRest {

    @Autowired
    SetorRepository setorRepository;

    @RequestMapping(method = RequestMethod.POST, value = "/cadastrarSetor")
        public ModelAndView save(Setor setor, ModelAndView model) {
            setorRepository.save(setor);
            return new ModelAndView("redirect:/Setor");
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Setor> listAll() {
        return setorRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public Setor getSetorById(@PathVariable("id") long id) {
        Setor Setor = setorRepository.findById(id);
        return Setor;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getByNome/{nome}")
    public Setor getSetorByNome(@PathVariable("nome") String nome) {
        Setor Setor = setorRepository.findByNome_setor(nome);
        return Setor;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Setor update(@RequestBody Setor Setor) {
        setorRepository.save(Setor);
        return Setor;
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public Setor deleteSetorById(@PathVariable("id") long id) {
        Setor Setor = setorRepository.findById(id);
        setorRepository.delete(Setor);
        return Setor;
    }

}
