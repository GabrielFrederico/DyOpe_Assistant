package com.projeto.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.PlanilhaCusto;
import com.projeto.models.PlanilhaCusto;
import com.projeto.repository.PlanilhaCustoRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("planilhascusto")
public class PlanilhaCustoController {
	@Autowired
	PlanilhaCustoRepository planilhaCustoRepository;

    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasRole('GERENTE') or hasRole('admin')")
    public Iterable<PlanilhaCusto> listAll() {
        return planilhaCustoRepository.findAll();
    }

    
    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    @PreAuthorize("hasRole('GERENTE') or hasRole('admin')")
    public PlanilhaCusto getSPlanilhaById(@PathVariable("id") long id) {
    	PlanilhaCusto planilhaCusto = planilhaCustoRepository.findById(id);
        return planilhaCusto;
    }
    
    @PreAuthorize("hasRole('GERENTE') or hasRole('admin')")
    @RequestMapping(method = RequestMethod.PUT)
    public PlanilhaCusto update(@RequestBody PlanilhaCusto planilhaCusto) {
    	PlanilhaCusto.calcularCusto(planilhaCusto);
        planilhaCustoRepository.save(planilhaCusto);
        return planilhaCusto;
    }
    
    @PreAuthorize("hasRole('GERENTE') or hasRole('admin')")
    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public PlanilhaCusto deletePlanilhaCustoById(@PathVariable("id") long id) {
        PlanilhaCusto planilhaCusto = planilhaCustoRepository.findById(id);
        planilhaCustoRepository.delete(planilhaCusto);
        return planilhaCusto;
    }
}
