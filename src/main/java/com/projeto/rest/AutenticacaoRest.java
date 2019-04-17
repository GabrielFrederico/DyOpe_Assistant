package com.projeto.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.repository.RoleRepository;
import com.projeto.repository.UsuarioRepository;

@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
@RequestMapping("/autenticacao")
public class AutenticacaoRest {

	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	
	

}
