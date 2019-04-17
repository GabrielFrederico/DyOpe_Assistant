package com.projeto.seguranca.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.projeto.models.Gerente;
import com.projeto.repository.GerenteRepository;
@Component
public class GerenteDetailsServiceImpl implements UserDetailsService {

	 @Autowired
	  GerenteRepository gerenteRepository;
	 
	  @Override
	  @Transactional
	  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	 
	    Gerente gerente = gerenteRepository.findByNomeUsuario(username).orElseThrow(
	        () -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));
	 
	    return GerentePrinciple.build(gerente);
	  }
}
