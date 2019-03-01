package com.projeto;

import com.projeto.models.Gerente;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@org.springframework.stereotype.Controller
public class Controller {
	   @RequestMapping("/")
	    public String index() {

	        return "index";
	    }

	@RequestMapping("gerentes/cadastroGerente")
	public String cadastro() {

		return "cadastro_gerente";
	}

	@RequestMapping(value="gerentes/cadastrarGerente", method= RequestMethod.GET)
	public ModelAndView cadastro(Model model) {

			model.addAttribute("gerenteModel", new Gerente());

		return new ModelAndView("login_gerente");
	}





}
