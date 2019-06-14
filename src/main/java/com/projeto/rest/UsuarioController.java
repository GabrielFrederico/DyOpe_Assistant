package com.projeto.rest;

import java.util.Optional;

import com.projeto.repository.RoleRepository;
import com.projeto.seguranca.JwtResponse;
import com.projeto.seguranca.LoginForm;
import com.projeto.seguranca.ResponseMessage;
import com.projeto.seguranca.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.projeto.models.Usuario;
import com.projeto.repository.UsuarioRepository;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("usuarios")
public class UsuarioController {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    AuthenticationManager authenticationManager;


    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtProvider jwtProvider;
    
    

    @RequestMapping(method = RequestMethod.POST, path = "/logar")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getNomeUsuario(), loginRequest.getSenha()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
   
        return ResponseEntity.ok(new JwtResponse(jwt,userDetails.getUsername(),userDetails.getAuthorities()));
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Usuario> listAll() {
        return usuarioRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Usuario getUsuarioById(@PathVariable("id") long id) {
        Usuario usuario = usuarioRepository.findById(id);
        return usuario;
    }
    
    @RequestMapping(method = RequestMethod.GET, path = "/getByNome/{nomeusuario}")
    @PreAuthorize("hasRole('ADMIN')")
    public Optional<Usuario> getUsuarioByNome(@PathVariable("nomeUsuario") String nomeUsuario) {
        Optional<Usuario> usuario = usuarioRepository.findByNomeUsuario(nomeUsuario);
        return usuario;
    }
    
    @RequestMapping(method = RequestMethod.PUT)
    @PreAuthorize("hasRole('ADMIN')")
    public Usuario update(@RequestBody Usuario usuario) {
        usuarioRepository.save(usuario);
        return usuario;
    }
   
    @RequestMapping(method = RequestMethod.POST, path="/enviaremailsenha")
    public ResponseEntity<?> emailRedefinirSenha(@RequestBody String email) {
    	if(!usuarioRepository.existsByEmail(email)) {
    		return new ResponseEntity<>(new ResponseMessage("Erro -> Email não registrado!"), HttpStatus.BAD_REQUEST);
    	}
    	
    	return new ResponseEntity<>(new ResponseMessage("Email enviado com sucesso!"), HttpStatus.OK);
    }
    
    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Usuario deleteUsuarioById(@PathVariable("id") long id) {
        Usuario usuario = usuarioRepository.findById(id);
        usuarioRepository.delete(usuario);
        return usuario;
    }

}
