package com.projeto.rest;

import java.util.Enumeration;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.Gerente;
import com.projeto.models.Role;
import com.projeto.models.RoleName;
import com.projeto.repository.GerenteRepository;
import com.projeto.repository.RoleRepository;
import com.projeto.seguranca.CadastroForm;
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
    AuthenticationManager authenticationManager;


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


    @RequestMapping(method = RequestMethod.GET, value = "/perfilGerente.{id}")
    public Gerente teste(@PathVariable("id") long id) {
        Gerente gerente = gerenteRepository.findById(id);
        return gerente;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/redefinirPerfilGerente")
    public Gerente redefinirPerfilGerente(Gerente gerente) {
        gerenteRepository.save(gerente);
        return gerente;
    }


    @RequestMapping(value = "/gerentelogado", method = RequestMethod.GET)
    public Gerente login(Gerente gerente, String error, String logout) {
        gerenteRepository.findById(gerente.getId());

        return gerente;
    }


    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Gerente> listAll() {
        return gerenteRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "gerente.{id}")
    public Gerente getGerenteById(@PathVariable("id") long id) {
        Gerente gerente = gerenteRepository.findById(id);
        return gerente;
    }


    @RequestMapping(method = RequestMethod.GET, path = "gerente/getByNome/{nome}")
    public Gerente getGerenteByNome(@PathVariable("nome") String nome) {
        Gerente gerente = gerenteRepository.findByNome(nome);
        return gerente;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "gerente")
    public Gerente update(@RequestBody Gerente gerente) {
        gerenteRepository.save(gerente);
        return gerente;
    }


    @RequestMapping(method = RequestMethod.POST, value = "/redefinirsenhaperfilgerente")
    public Gerente redefinirSenhaPerfilGerente(Gerente gerente) {
        gerenteRepository.save(gerente);
        return gerente;
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public Gerente deleteGerenteById(@PathVariable("id") long id) {
        Gerente gerente = gerenteRepository.findById(id);
        gerenteRepository.delete(gerente);
        return gerente;
    }


    @RequestMapping(method = RequestMethod.POST, path = "/cadastrar")
    public ResponseEntity<?> registerUser(@Valid @RequestBody CadastroForm signUpRequest) {
        if (gerenteRepository.existsByNomeUsuario(signUpRequest.getNomeUsuario())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (gerenteRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Erro -> Email Já está em uso !"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        Gerente user = new Gerente();
        user.setNome(signUpRequest.getNome());
        user.setCpf(signUpRequest.getCpf());
        user.setEmail(signUpRequest.getEmail());
        user.setRg(signUpRequest.getRg());
        user.setNomeUsuario(signUpRequest.getNomeUsuario());
        user.setSenhaConfirm(signUpRequest.getSenhaConfirm());
        user.setSenha(encoder.encode(signUpRequest.getSenha()));


        String strRoles = signUpRequest.getRole();

        Set<Role> roles = new HashSet<>();

        if(strRoles.equals("gerente")) {
            Role gerenterole =
                    roleRepository.findByNome(RoleName.ROLE_GERENTE)
                            .orElseThrow(() -> new RuntimeException("Fail! ->  Cause: Gerente Role not find."));
            roles.add(gerenterole);

        }else {
                    Role userRole = roleRepository.findByNome(RoleName.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Fail! ->    Cause: Gerente Role not find."));
                    roles.add(userRole);

        }

        user.setRoles(roles);
        gerenteRepository.save(user);

        return new ResponseEntity<>(new ResponseMessage("Gerente Cadastrado com sucesso!"), HttpStatus.OK);
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


}
