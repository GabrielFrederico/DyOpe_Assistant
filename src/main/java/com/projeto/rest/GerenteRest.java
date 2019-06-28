package com.projeto.rest;

import java.sql.Date;
import java.text.ParseException;
import java.util.Calendar;
import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.Gerente;
import com.projeto.models.Operacao;
import com.projeto.models.Peca;
import com.projeto.models.PlanilhaCusto;
import com.projeto.models.Role;
import com.projeto.models.RoleName;
import com.projeto.models.Setor;
import com.projeto.repository.FuncionarioRepository;
import com.projeto.repository.GerenteRepository;
import com.projeto.repository.RoleRepository;
import com.projeto.repository.SetorRepository;
import com.projeto.repository.UsuarioRepository;
import com.projeto.seguranca.CadastroFormGerente;
import com.projeto.seguranca.JwtResponse;
import com.projeto.seguranca.LoginForm;
import com.projeto.seguranca.ResponseMessage;
import com.projeto.seguranca.jwt.JwtProvider;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("gerentes")
public class GerenteRest {

	@Autowired
	GerenteRepository gerenteRepository;

	@Autowired
	FuncionarioRepository funcionarioRepository;

	@Autowired
	SetorRepository setorRepository;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UsuarioRepository usuarioRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtProvider jwtProvider;

	@RequestMapping(method = RequestMethod.POST, value = "/cadastrargerente")
	public Gerente save(@RequestBody Gerente gerente) {

		gerenteRepository.save(gerente);
		return gerente;
	}

	@RequestMapping(method = RequestMethod.GET)
	@PreAuthorize("hasRole('GERENTE') or hasRole('FUNCIONARIO')")
	public Iterable<Gerente> listAll() {
		return gerenteRepository.findAll();
	}

	@RequestMapping(method = RequestMethod.GET, path = "gerente/{id}")
	@PreAuthorize("hasRole('GERENTE')")
	public Gerente getGerenteById(@PathVariable("id") long id) {
		Gerente gerente = gerenteRepository.findById(id);
		return gerente;
	}

	@RequestMapping(method = RequestMethod.GET, path = "gerente")
	@PreAuthorize("hasRole('GERENTE')")
	public Gerente getGerente(@RequestBody Gerente gerente) {
		return gerente;
	}

	@RequestMapping(method = RequestMethod.GET, path = "getByNomeUsuario/{nomeUsuario}")
	@PreAuthorize("hasRole('GERENTE')")
	public Gerente getGerenteByNomeUsuario(@PathVariable("nomeUsuario") String nomeUsuario) {
		Gerente gerente = gerenteRepository.findByNomeUsuario(nomeUsuario);
		return gerente;
	}

	@RequestMapping(method = RequestMethod.GET, path = "getByNome/{nome}")
	@PreAuthorize("hasRole('GERENTE')")
	public Gerente getGerenteByNome(@PathVariable("nome") String nome) {
		Gerente gerente = gerenteRepository.findByNome(nome);
		return gerente;
	}
	

	Calendar prazo = Calendar.getInstance();
	java.util.Date dataprazo = new java.util.Date();

	@RequestMapping(method = RequestMethod.PUT, value = "atualizarsenha")
	@PreAuthorize("hasRole('GERENTE')")
	public ResponseEntity<?> update(@RequestBody Gerente gerente) {
		Calendar inicio = Calendar.getInstance();
		java.util.Date dataini = new java.util.Date();
		for (Peca peca : gerente.getPecas()) {
			for (Operacao operacaoFazer : peca.getOperacoesFazer()) {
				System.out.println("opesAndamento gerente" + operacaoFazer.getDataInicio());
				inicio.setTime(operacaoFazer.getDataInicio());
				inicio.add(Calendar.DAY_OF_MONTH, 1);
				dataini = inicio.getTime();
				Date iniciodata = new Date(dataini.getTime());
				operacaoFazer.setDataInicio(iniciodata);
				
				prazo.setTime(operacaoFazer.getPrazo());
				prazo.add(Calendar.DAY_OF_MONTH,  1);
				dataprazo = prazo.getTime();
				Date prazodate = new Date(dataprazo.getTime());
				operacaoFazer.setPrazo(prazodate);
			}
			for (Operacao operacaoAndamento : peca.getOperacoesAndamento()) {
				System.out.println("opesAndamento gerente" + operacaoAndamento.getDataInicio());
				inicio.setTime(operacaoAndamento.getDataInicio());
				inicio.add(Calendar.DAY_OF_MONTH, 1);
				dataini = inicio.getTime();
				Date iniciodata = new Date(dataini.getTime());
				operacaoAndamento.setDataInicio(iniciodata);
				
				prazo.setTime(operacaoAndamento.getPrazo());
				prazo.add(Calendar.DAY_OF_MONTH,  1);
				dataprazo = prazo.getTime();
				Date prazodate = new Date(dataprazo.getTime());
				operacaoAndamento.setPrazo(prazodate);
			}
			for (Operacao operacaoPrazo : peca.getOperacoesPrazo()) {
				System.out.println("opesAndamento gerente" + operacaoPrazo.getDataInicio());
				inicio.setTime(operacaoPrazo.getDataInicio());
				inicio.add(Calendar.DAY_OF_MONTH, 1);
				dataini = inicio.getTime();
				Date iniciodata = new Date(dataini.getTime());
				operacaoPrazo.setDataInicio(iniciodata);
				
				prazo.setTime(operacaoPrazo.getPrazo());
				prazo.add(Calendar.DAY_OF_MONTH,  1);
				dataprazo = prazo.getTime();
				Date prazodate = new Date(dataprazo.getTime());
				operacaoPrazo.setPrazo(prazodate);
			}
		}
		gerente.setSenha(encoder.encode(gerente.getSenha()));
		gerente.setSenhaConfirm(encoder.encode(gerente.getSenha()));

		gerenteRepository.save(gerente);
		return new ResponseEntity<>(new ResponseMessage("Dados Atualizados com sucesso!"), HttpStatus.OK);
	}

	@Modifying(flushAutomatically = true)
	@RequestMapping(method = RequestMethod.PUT, value = "atualizargerente")
	@PreAuthorize("hasRole('GERENTE')")
	public ResponseEntity<?> update2(@RequestBody Gerente gerente) {

		if (usuarioRepository.existsByNomeUsuario(gerente.getNomeUsuario())
				&& gerenteRepository.findByNomeUsuario(gerente.getNomeUsuario()) != gerente) {
			return new ResponseEntity<>(new ResponseMessage("Erro -> Usuário já está em uso!"), HttpStatus.BAD_REQUEST);
		}
		gerenteRepository.save(gerente);
		return new ResponseEntity<>(new ResponseMessage("Dados Atualizados com sucesso!"), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT, value = "chaveAcesso")
	@PreAuthorize("hasRole('GERENTE')")
	public ResponseEntity<?> chaveAcesso(@RequestBody Gerente gerente) {

		gerente.setChaveAcesso(encoder.encode(gerente.getChaveAcesso()));
		gerenteRepository.save(gerente);
		return new ResponseEntity<>(new ResponseMessage("Dados Atualizados com sucesso!"), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, value = "acessarplanilha")
	@PreAuthorize("hasRole('GERENTE')")
	public ResponseEntity<?> acessarPlanilha(@RequestBody Gerente gerente) {
		if (!encoder.matches(gerente.getVerificarChaveAcesso(), gerente.getChaveAcesso())) {

			return new ResponseEntity<>(new ResponseMessage("Erro -> Acesso inválido!"), HttpStatus.BAD_REQUEST);
		} else {
			gerente.setVerificarChaveAcesso("");
			return new ResponseEntity<>(new ResponseMessage("Acesso Válido!"), HttpStatus.OK);
		}

	}

	@Modifying(clearAutomatically = true)
	@RequestMapping(method = RequestMethod.PUT, value = "cadastraralgo")
	@PreAuthorize("hasRole('GERENTE') or hasRole('FUNCIONARIO') or hasRole('ADMIN')")
	public ResponseEntity<?> cadastrarAlgo(@RequestBody Gerente gerente) {
		Calendar inicio = Calendar.getInstance();
		java.util.Date dataini = new java.util.Date();
		for (Peca peca : gerente.getPecas()) {
			System.out.println("pecas gerente" + peca.getOperacoesFazer());
			for (Operacao operacaoFazer : peca.getOperacoesFazer()) {
				System.out.println("opesAndamento gerente" + operacaoFazer.getDataInicio());
				inicio.setTime(operacaoFazer.getDataInicio());
				inicio.add(Calendar.DAY_OF_MONTH, 1);
				dataini = inicio.getTime();
				Date iniciodata = new Date(dataini.getTime());
				operacaoFazer.setDataInicio(iniciodata);
				
				prazo.setTime(operacaoFazer.getPrazo());
				prazo.add(Calendar.DAY_OF_MONTH,  1);
				dataprazo = prazo.getTime();
				Date prazodate = new Date(dataprazo.getTime());
				operacaoFazer.setPrazo(prazodate);
			}
			for (Operacao operacaoAndamento : peca.getOperacoesAndamento()) {
				System.out.println("opesAndamento gerente" + operacaoAndamento.getDataInicio());
				inicio.setTime(operacaoAndamento.getDataInicio());
				inicio.add(Calendar.DAY_OF_MONTH, 1);
				dataini = inicio.getTime();
				Date iniciodata = new Date(dataini.getTime());
				operacaoAndamento.setDataInicio(iniciodata);
				
				prazo.setTime(operacaoAndamento.getPrazo());
				prazo.add(Calendar.DAY_OF_MONTH,  1);
				dataprazo = prazo.getTime();
				Date prazodate = new Date(dataprazo.getTime());
				operacaoAndamento.setPrazo(prazodate);
			}
			for (Operacao operacaoPrazo : peca.getOperacoesPrazo()) {
				System.out.println("opesAndamento gerente" + operacaoPrazo.getDataInicio());
				inicio.setTime(operacaoPrazo.getDataInicio());
				inicio.add(Calendar.DAY_OF_MONTH, 1);
				dataini = inicio.getTime();
				Date iniciodata = new Date(dataini.getTime());
				operacaoPrazo.setDataInicio(iniciodata);
				
				prazo.setTime(operacaoPrazo.getPrazo());
				prazo.add(Calendar.DAY_OF_MONTH,  1);
				dataprazo = prazo.getTime();
				Date prazodate = new Date(dataprazo.getTime());
				operacaoPrazo.setPrazo(prazodate);
			}
		}

		gerenteRepository.save(gerente);
		for (Peca peca : gerente.getPecas()) {
			System.out.println("pecas gerente" + peca.getOperacoesFazer());
			for (Operacao operacaoAndamento : peca.getOperacoesAndamento()) {
				System.out.println("opesAndamento gerente" + operacaoAndamento.getDataInicio());
			}
		}
		return new ResponseEntity<>(new ResponseMessage("Dados Atualizados com sucesso!"), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT, value = "cadastrarsetor")
	@PreAuthorize("hasRole('GERENTE')")
	public ResponseEntity<?> cadastrarSetor(@RequestBody Gerente gerente) {
		Calendar inicio = Calendar.getInstance();
		java.util.Date dataini = new java.util.Date();
		for (Peca peca : gerente.getPecas()) {
			for (Operacao operacaoFazer : peca.getOperacoesFazer()) {
				System.out.println("opesAndamento gerente" + operacaoFazer.getDataInicio());
				inicio.setTime(operacaoFazer.getDataInicio());
				inicio.add(Calendar.DAY_OF_MONTH, 1);
				dataini = inicio.getTime();
				Date iniciodata = new Date(dataini.getTime());
				operacaoFazer.setDataInicio(iniciodata);
				
				prazo.setTime(operacaoFazer.getPrazo());
				prazo.add(Calendar.DAY_OF_MONTH,  1);
				dataprazo = prazo.getTime();
				Date prazodate = new Date(dataprazo.getTime());
				operacaoFazer.setPrazo(prazodate);
			}
			for (Operacao operacaoAndamento : peca.getOperacoesAndamento()) {
				System.out.println("opesAndamento gerente" + operacaoAndamento.getDataInicio());
				inicio.setTime(operacaoAndamento.getDataInicio());
				inicio.add(Calendar.DAY_OF_MONTH, 1);
				dataini = inicio.getTime();
				Date iniciodata = new Date(dataini.getTime());
				operacaoAndamento.setDataInicio(iniciodata);
				
				prazo.setTime(operacaoAndamento.getPrazo());
				prazo.add(Calendar.DAY_OF_MONTH,  1);
				dataprazo = prazo.getTime();
				Date prazodate = new Date(dataprazo.getTime());
				operacaoAndamento.setPrazo(prazodate);
			}
			for (Operacao operacaoPrazo : peca.getOperacoesPrazo()) {
				System.out.println("opesAndamento gerente" + operacaoPrazo.getDataInicio());
				inicio.setTime(operacaoPrazo.getDataInicio());
				inicio.add(Calendar.DAY_OF_MONTH, 1);
				dataini = inicio.getTime();
				Date iniciodata = new Date(dataini.getTime());
				operacaoPrazo.setDataInicio(iniciodata);
				
				prazo.setTime(operacaoPrazo.getPrazo());
				prazo.add(Calendar.DAY_OF_MONTH,  1);
				dataprazo = prazo.getTime();
				Date prazodate = new Date(dataprazo.getTime());
				operacaoPrazo.setPrazo(prazodate);
			}
		}
		Setor setor = gerente.getSetores().get(gerente.getSetores().size() - 1);

		if (gerente.getSetores().contains(setorRepository.findByNomeSetor(setor.getNomeSetor()))) {
			return new ResponseEntity<>(new ResponseMessage("Erro -> Nome de setor já utilizado!"),
					HttpStatus.BAD_REQUEST);
		}
		gerenteRepository.save(gerente);
		return new ResponseEntity<>(new ResponseMessage("Dados Atualizados com sucesso!"), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT, value = "cadastrarope")
	@PreAuthorize("hasRole('GERENTE')")
	public ResponseEntity<?> cadastrarOpe(@RequestBody Gerente gerente) {
		Operacao ultima = gerente.getOperacoes().get(gerente.getOperacoes().size() - 1);
		try {
			Operacao.calcular(ultima);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		gerenteRepository.save(gerente);
		return new ResponseEntity<>(new ResponseMessage("Dados Atualizados com sucesso!"), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT, value = "cadastrarplanilha")
	@PreAuthorize("hasRole('GERENTE')")
	public ResponseEntity<?> cadastrarPlanilha(@RequestBody Gerente gerente) throws ParseException {
		Calendar inicio = Calendar.getInstance();
		java.util.Date dataini = new java.util.Date();
		for (Peca peca : gerente.getPecas()) {
			for (Operacao operacaoFazer : peca.getOperacoesFazer()) {
				System.out.println("opesAndamento gerente" + operacaoFazer.getDataInicio());
				inicio.setTime(operacaoFazer.getDataInicio());
				inicio.add(Calendar.DAY_OF_MONTH, 1);
				dataini = inicio.getTime();
				Date iniciodata = new Date(dataini.getTime());
				operacaoFazer.setDataInicio(iniciodata);
				
				prazo.setTime(operacaoFazer.getPrazo());
				prazo.add(Calendar.DAY_OF_MONTH,  1);
				dataprazo = prazo.getTime();
				Date prazodate = new Date(dataprazo.getTime());
				operacaoFazer.setPrazo(prazodate);
			}
			for (Operacao operacaoAndamento : peca.getOperacoesAndamento()) {
				System.out.println("opesAndamento gerente" + operacaoAndamento.getDataInicio());
				inicio.setTime(operacaoAndamento.getDataInicio());
				inicio.add(Calendar.DAY_OF_MONTH, 1);
				dataini = inicio.getTime();
				Date iniciodata = new Date(dataini.getTime());
				operacaoAndamento.setDataInicio(iniciodata);
				
				prazo.setTime(operacaoAndamento.getPrazo());
				prazo.add(Calendar.DAY_OF_MONTH,  1);
				dataprazo = prazo.getTime();
				Date prazodate = new Date(dataprazo.getTime());
				operacaoAndamento.setPrazo(prazodate);
			}
			for (Operacao operacaoPrazo : peca.getOperacoesPrazo()) {
				System.out.println("opesAndamento gerente" + operacaoPrazo.getDataInicio());
				inicio.setTime(operacaoPrazo.getDataInicio());
				inicio.add(Calendar.DAY_OF_MONTH, 1);
				dataini = inicio.getTime();
				Date iniciodata = new Date(dataini.getTime());
				operacaoPrazo.setDataInicio(iniciodata);
				
				prazo.setTime(operacaoPrazo.getPrazo());
				prazo.add(Calendar.DAY_OF_MONTH,  1);
				dataprazo = prazo.getTime();
				Date prazodate = new Date(dataprazo.getTime());
				operacaoPrazo.setPrazo(prazodate);
			}
		}
		PlanilhaCusto ultima = gerente.getPlanilhascusto().get(gerente.getPlanilhascusto().size() - 1);
		PlanilhaCusto.calcularCusto(ultima);
		gerenteRepository.save(gerente);
		return new ResponseEntity<>(new ResponseMessage("Dados Atualizados com sucesso!"), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	@PreAuthorize("hasRole('GERENTE')")
	public Gerente deleteGerenteById(@PathVariable("id") long id) {
		Gerente gerente = gerenteRepository.findById(id);
		gerenteRepository.delete(gerente);
		return gerente;
	}

	@RequestMapping(method = RequestMethod.POST, path = "/logar")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getNomeUsuario(), loginRequest.getSenha()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = jwtProvider.generateJwtToken(authentication);
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();

		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
	}

	@RequestMapping(method = RequestMethod.POST, path = "/cadastrar")
	public ResponseEntity<?> registerUser(@Valid @RequestBody CadastroFormGerente signUpRequest) {

		if (usuarioRepository.existsByNomeUsuario(signUpRequest.getNomeUsuario())) {
			return new ResponseEntity<>(new ResponseMessage("Erro -> Usuário já está em uso!"), HttpStatus.BAD_REQUEST);
		}

		if (usuarioRepository.existsByEmail(signUpRequest.getEmail())) {
			return new ResponseEntity<>(new ResponseMessage("Erro -> Email Já está em uso !"), HttpStatus.BAD_REQUEST);
		}
		if (gerenteRepository.existsByNome(signUpRequest.getNome())
				|| funcionarioRepository.existsByNome(signUpRequest.getNome())) {
			return new ResponseEntity<>(new ResponseMessage("Erro -> Nome Já está em uso !"), HttpStatus.BAD_REQUEST);
		}
		if (gerenteRepository.existsByCpf(signUpRequest.getCpf())
				|| funcionarioRepository.existsByCpf(signUpRequest.getCpf())) {
			return new ResponseEntity<>(new ResponseMessage("Erro -> CPF Já está em uso !"), HttpStatus.BAD_REQUEST);
		}
		if (gerenteRepository.existsByRg(signUpRequest.getRg())
				|| funcionarioRepository.existsByRg(signUpRequest.getRg())) {
			return new ResponseEntity<>(new ResponseMessage("Erro -> RG Já está em uso !"), HttpStatus.BAD_REQUEST);
		}
		if (usuarioRepository.existsBySenha(signUpRequest.getSenha())
				|| funcionarioRepository.existsBySenha(signUpRequest.getSenha())) {
			return new ResponseEntity<>(new ResponseMessage("Erro -> Senha Já está em uso !"), HttpStatus.BAD_REQUEST);
		}

		// Creating user's account
		Gerente user = new Gerente();
		user.setNome(signUpRequest.getNome());
		user.setCpf(signUpRequest.getCpf());
		user.setEmail(signUpRequest.getEmail());
		user.setRg(signUpRequest.getRg());
		user.setNomeUsuario(signUpRequest.getNomeUsuario());
		user.setSenhaConfirm(encoder.encode(signUpRequest.getSenhaConfirm()));
		user.setSenha(encoder.encode(signUpRequest.getSenha()));

		String strRoles = signUpRequest.getRole();

		Set<Role> roles = new HashSet<>();

		if (strRoles.equals("gerente")) {
			Role gerenterole = roleRepository.findByNome(RoleName.ROLE_GERENTE)
					.orElseThrow(() -> new RuntimeException("Fail! ->  Cause: Gerente Role not find."));
			roles.add(gerenterole);

		} else {
			Role userRole = roleRepository.findByNome(RoleName.ROLE_ADMIN)
					.orElseThrow(() -> new RuntimeException("Fail! ->    Cause: Gerente Role not find."));
			roles.add(userRole);

		}

		user.setRoles(roles);
		gerenteRepository.save(user);

		return new ResponseEntity<>(new ResponseMessage("Gerente Cadastrado com sucesso!"), HttpStatus.OK);
	}

}
