package com.projeto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.Funcionario;
import com.projeto.repository.FuncionarioRepository;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("funcionarios")
public class FuncionarioController {

    @Autowired
    FuncionarioRepository funcionarioRepoository;

    @RequestMapping(method = RequestMethod.POST, value = "/cadastrarFuncionario")
    public ModelAndView save(Funcionario funcionario) {
        funcionarioRepoository.save(funcionario);
        return new ModelAndView("redirect:/loginFuncionario");
    }

    @RequestMapping(value = "/loginFuncionario", method = RequestMethod.GET)
    public ModelAndView login(ModelAndView model, Model model1, Funcionario funcionario, String error, String logout) {

        funcionarioRepoository.findById(funcionario.getId());

        if (error != null)
            model1.addAttribute("error", "Your username and password is invalid.");

        if (logout != null)
            model1.addAttribute("message", "You have been logged out successfully.");

        return new ModelAndView("redirect:/gerenteIndex");
    }


    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Funcionario> listAll() {
        return funcionarioRepoository.findAll();
    }
}
