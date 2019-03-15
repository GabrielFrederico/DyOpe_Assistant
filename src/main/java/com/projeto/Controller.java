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

	@RequestMapping("/logingerente")
	public String loginGerente() {

		return "login_gerente";
	}

	@RequestMapping("/loginfuncionario")
	public String loginFuncionario() {

		return "login_funcionario";
	}

	@RequestMapping("/gerenteindex")
	public String indexGerente() {

		return "gerente_index";
	}

	@RequestMapping("/gerenteperfil")
	public String gerentePerfil() {

		return "perfil_gerente";
	}


	@RequestMapping("/operacaorisco")
	public String operacaoRisco() {

		return "operacao_risco";
	}

	@RequestMapping("/controlefuncionarios")
	public String controleFunc() {

		return "controle_funcionarios";
	}

	@RequestMapping("/funcionarioindex")
	public String indeFuncionario() {

		return "funcionario_index";
	}

	@RequestMapping("cadastrogerente")
	public String cadastro() {

		return "cadastro_gerente";
	}

	@RequestMapping(value="gerentes/cadastrargerente", method= RequestMethod.GET)
	public ModelAndView cadastro(Model model) {

			model.addAttribute("gerenteModel", new Gerente());

		return new ModelAndView("login_gerente");
	}





}
