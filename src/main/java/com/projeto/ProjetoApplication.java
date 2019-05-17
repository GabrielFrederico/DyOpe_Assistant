package com.projeto;

import java.util.HashSet;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.projeto.models.Funcionario;
import com.projeto.models.Gerente;
import com.projeto.models.Role;
import com.projeto.models.RoleName;
import com.projeto.models.TipoOperacao;
import com.projeto.repository.FuncionarioRepository;
import com.projeto.repository.GerenteRepository;
import com.projeto.repository.RoleRepository;
import com.projeto.repository.TipoOperacaoRepository;

@SpringBootApplication
public class ProjetoApplication {
	@Autowired
	RoleRepository roleRepository;

	@Autowired
	GerenteRepository gerenteRepository;

	@Autowired
	FuncionarioRepository funcionarioRepository;

	@Autowired
	TipoOperacaoRepository tipoOperacaoRepository;

	@Autowired
	PasswordEncoder encoder;

	public static void main(String[] args) {

		SpringApplication.run(ProjetoApplication.class, args);

	}

	@PostConstruct
	private void init() {
		if (!roleRepository.existsByNome(RoleName.ROLE_GERENTE)) {
			Set<Role> rolesgerente = new HashSet<>();
			Set<Role> rolesfuncionario = new HashSet<>();
			Role rolegerente = new Role();
			Role rolefuncionario = new Role();
			rolegerente.setId(1);
			rolegerente.setNome(RoleName.ROLE_GERENTE);
			rolefuncionario.setId(2);
			rolefuncionario.setNome(RoleName.ROLE_FUNCIONARIO);
			roleRepository.save(rolegerente);
			roleRepository.save(rolefuncionario);
			rolesgerente.add(rolegerente);
			rolesfuncionario.add(rolefuncionario);
			TipoOperacao risco = new TipoOperacao();
			TipoOperacao corte = new TipoOperacao();
			TipoOperacao costura = new TipoOperacao();
			TipoOperacao beneficiamento = new TipoOperacao();
			TipoOperacao acabamento = new TipoOperacao();

			risco.setIdTipoOpe(1);
			risco.setTipoOpe("Risco");
			risco.setStatusSYS('A');

			corte.setIdTipoOpe(2);
			corte.setTipoOpe("Corte");
			corte.setStatusSYS('A');

			costura.setIdTipoOpe(3);
			costura.setTipoOpe("Costura");
			costura.setStatusSYS('A');

			beneficiamento.setIdTipoOpe(4);
			beneficiamento.setTipoOpe("Beneficiamento");
			beneficiamento.setStatusSYS('A');

			acabamento.setIdTipoOpe(5);
			acabamento.setTipoOpe("Acabamento");
			acabamento.setStatusSYS('A');

			tipoOperacaoRepository.save(risco);
			tipoOperacaoRepository.save(corte);
			tipoOperacaoRepository.save(costura);
			tipoOperacaoRepository.save(beneficiamento);
			tipoOperacaoRepository.save(acabamento);

			Gerente juanGerente = new Gerente();
			Funcionario juanFuncionario = new Funcionario();

			juanGerente.setCpf("118.810.719-44");
			juanGerente.setRg("7.500.500");
			juanGerente.setEmail("juanbenini123@gmail.com");
			juanGerente.setNome("Juan Gerente Benini");
			juanGerente.setId(1);
			juanGerente.setNomeUsuario("juangerente123");
			juanGerente.setSenha(encoder.encode("qwer4321"));
			juanGerente.setSenhaConfirm(encoder.encode("qwer4321"));
			juanGerente.setRoles(rolesgerente);
			gerenteRepository.save(juanGerente);
			
			juanFuncionario.setCpf("115.811.720-43");
			juanFuncionario.setRg("7.511.511");
			juanFuncionario.setEmail("jugubenini@hotmail.com");
			juanFuncionario.setId(2);
			juanFuncionario.setNome("Juan Funcionário Benini");
			juanFuncionario.setNomeUsuario("juanfuncionario123");
			juanFuncionario.setSenha(encoder.encode("rewq1234"));
			juanFuncionario.setSenhaConfirm(encoder.encode("rewq1234"));
			juanFuncionario.setRoles(rolesfuncionario);
			funcionarioRepository.save(juanFuncionario);

		}
	}

}
