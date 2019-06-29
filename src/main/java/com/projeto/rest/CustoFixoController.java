package com.projeto.rest;


import com.projeto.models.CustoFixo;
import com.projeto.repository.CustoFixoRepository;
import com.projeto.seguranca.ResponseMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("custosFixo")

public class CustoFixoController {

    @Autowired
    CustoFixoRepository custoFixoRepository;

    @RequestMapping(method = RequestMethod.POST, value = "/cadastrarcustoFixo")
    public ResponseEntity<?> save(@RequestBody CustoFixo custoFixo, ModelAndView model) {
   
        custoFixoRepository.save(custoFixo);
        return new ResponseEntity<>(new ResponseMessage("CustoFixo Cadastrado com sucesso!"), HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasRole('GERENTE') or hasRole('admin')")
    public Iterable<CustoFixo> listAll() {
        return custoFixoRepository.findAll();
    }

    
    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    @PreAuthorize("hasRole('GERENTE') or hasRole('admin')")
    public CustoFixo getCustoFixoById(@PathVariable("id") long id) {
        CustoFixo custoFixo = custoFixoRepository.findById(id);
        return custoFixo;
    }
    
//    @PreAuthorize("hasRole('GERENTE') or hasRole('admin')")
//    @RequestMapping(method = RequestMethod.GET, path = "/getByNome/{nomeCustoFixo}")
//    public CustoFixo getCustoFixoByNome(@PathVariable("nomeCustoFixo") String nomeCustoFixo) {
//        CustoFixo custoFixo = custoFixoRepository.findByNomeCustoFixo(nomeCustoFixo);
//        return custoFixo;
//    }

    @PreAuthorize("hasRole('GERENTE') or hasRole('admin')")
    @RequestMapping(method = RequestMethod.PUT)
    public CustoFixo update(@RequestBody CustoFixo custoFixo) {
        custoFixoRepository.save(custoFixo);
        return custoFixo;
    }
    @PreAuthorize("hasRole('GERENTE') or hasRole('admin')")
    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public CustoFixo deleteCustoFixoById(@PathVariable("id") long id) {
        CustoFixo custoFixo = custoFixoRepository.findById(id);
        custoFixoRepository.delete(custoFixo);
        return custoFixo;
    }

}
