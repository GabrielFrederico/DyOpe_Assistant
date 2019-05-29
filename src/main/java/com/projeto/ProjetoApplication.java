package com.projeto;

import java.util.HashSet;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.projeto.models.EtapaProducao;
import com.projeto.models.Funcionario;
import com.projeto.models.Gerente;
import com.projeto.models.Operacao;
import com.projeto.models.Role;
import com.projeto.models.RoleName;
import com.projeto.repository.EtapaProducaoRepository;
import com.projeto.repository.FuncionarioRepository;
import com.projeto.repository.GerenteRepository;
import com.projeto.repository.OperacaoRepository;
import com.projeto.repository.RoleRepository;

@SpringBootApplication
public class ProjetoApplication {
	@Autowired
	RoleRepository roleRepository;

	@Autowired
	GerenteRepository gerenteRepository;
	
	@Autowired
	OperacaoRepository operacaoRepository;

	@Autowired
	FuncionarioRepository funcionarioRepository;

	@Autowired
	EtapaProducaoRepository etapaProducaoRepository;

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
			EtapaProducao risco = new EtapaProducao();
			EtapaProducao corte = new EtapaProducao();
			EtapaProducao costura = new EtapaProducao();
			EtapaProducao beneficiamento = new EtapaProducao();
			EtapaProducao acabamento = new EtapaProducao();
            Operacao revisar = new Operacao();
            Operacao limpar = new Operacao();
            Operacao passar = new Operacao();
            Operacao tag = new Operacao();
            Operacao embalar = new Operacao();
            revisar.setDescricao("Revisar");
            revisar.setId(26);
            limpar.setDescricao("Limpar");
            limpar.setId(27);
            passar.setDescricao("Passar");
            passar.setId(28);
            tag.setDescricao("Tag");
            tag.setId(29);
            embalar.setDescricao("Embalar");
            embalar.setId(30);
            operacaoRepository.save(revisar);
            operacaoRepository.save(limpar);
            operacaoRepository.save(passar);
            operacaoRepository.save(tag);
            operacaoRepository.save(embalar);
            
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

			etapaProducaoRepository.save(risco);
			etapaProducaoRepository.save(corte);
			etapaProducaoRepository.save(costura);
			etapaProducaoRepository.save(beneficiamento);
			etapaProducaoRepository.save(acabamento);

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
