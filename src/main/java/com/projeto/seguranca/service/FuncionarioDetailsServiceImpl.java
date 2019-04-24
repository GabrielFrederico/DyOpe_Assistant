package com.projeto.seguranca.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.projeto.models.Funcionario;
import com.projeto.repository.FuncionarioRepository;

@Component
public class FuncionarioDetailsServiceImpl implements UserDetailsService {

    @Autowired
    FuncionarioRepository funcionarioRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Funcionario funcionario = funcionarioRepository.findByNomeUsuario(username).orElseThrow(
                () -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));

        return (UserDetails) FuncionarioPrinciple.build(funcionario);
    }
}
