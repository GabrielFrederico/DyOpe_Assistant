package com.projeto;

import com.projeto.models.Gerente;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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

	@RequestMapping("/loginGerente")
	public String loginGerente() {

		return "login_gerente";
	}

	@RequestMapping("/loginFuncionario")
	public String loginFuncionario() {

		return "login_funcionario";
	}

	@RequestMapping("/gerenteIndex")
	public String indexGerente() {

		return "gerente_index";
	}

	@RequestMapping("/gerentePerfil")
	public String gerentePerfil() {

		return "perfil";
	}

	@RequestMapping("/hello")
	public String hello(Model model, @RequestParam(value="name", required=false, defaultValue="World") String name) {
		model.addAttribute("name", name);
		return "hello";
	}

	@RequestMapping("/operacaoRisco")
	public String operacaoRisco() {

		return "operacao_risco";
	}

	@RequestMapping("/controleFuncionarios")
	public String controleFunc() {

		return "controle_funcionarios";
	}


	@RequestMapping("/funcionarioIndex")
	public String indeFuncionario() {

		return "funcionario_index";
	}

	@RequestMapping("cadastroGerente")
	public String cadastro() {

		return "cadastro_gerente";
	}

	@RequestMapping(value="gerentes/cadastrarGerente", method= RequestMethod.GET)
	public ModelAndView cadastro(Model model) {

			model.addAttribute("gerenteModel", new Gerente());

		return new ModelAndView("login_gerente");
	}





}
