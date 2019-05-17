package com.projeto;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.projeto.models.Role;
import com.projeto.models.RoleName;
import com.projeto.repository.RoleRepository;

@SpringBootApplication
public class ProjetoApplication {
	@Autowired
	RoleRepository roleRepository;

	public static void main(String[] args) {
	
		SpringApplication.run(ProjetoApplication.class, args);
		
	}

	@PostConstruct
	private void roleinit() {
		if (!roleRepository.existsByNome(RoleName.ROLE_GERENTE)) {
			Role rolegerente = new Role();
			Role rolefuncionario = new Role();
			rolegerente.setId(1);
			rolegerente.setNome(RoleName.ROLE_GERENTE);
			rolefuncionario.setId(2);
			rolefuncionario.setNome(RoleName.ROLE_FUNCIONARIO);
			roleRepository.save(rolegerente);
			roleRepository.save(rolefuncionario);

		}
	}
	
	@PostConstruct
	private void tiposOpeinit() {
		
		
	}
	
	
}
