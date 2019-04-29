package com.projeto.seguranca.service;

import javax.transaction.Transactional;

import org.springframework.core.annotation.Order;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.projeto.models.Usuario;
import com.projeto.repository.UsuarioRepository;

@Component
public class UsuarioDetailsServiceImpl implements UserDetailsService {

	private final UsuarioRepository usuarioRepository;

	public UsuarioDetailsServiceImpl(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}

	   @Override
	  @Transactional
	  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

	    Usuario usuario = usuarioRepository.findByNomeUsuario(username).orElseThrow(
	        () -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));

          return UsuarioPrinciple.build(usuario);
	  }

}
