package com.projeto.rest;

import com.projeto.models.Role;
import com.projeto.models.RoleName;
import com.projeto.repository.RoleRepository;
import com.projeto.seguranca.CadastroForm;
import com.projeto.seguranca.JwtResponse;
import com.projeto.seguranca.LoginForm;
import com.projeto.seguranca.ResponseMessage;
import com.projeto.seguranca.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.Funcionario;
import com.projeto.repository.FuncionarioRepository;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("funcionarios")
public class FuncionarioController {

    @Autowired
    FuncionarioRepository funcionarioRepository;

    @Autowired
    AuthenticationManager authenticationManager;


    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtProvider jwtProvider;

    @RequestMapping(method = RequestMethod.POST, value = "/cadastrarfuncionario")
    public Funcionario save(@RequestBody Funcionario funcionario) {
        funcionarioRepository.save(funcionario);
        return funcionario;
    }

    @RequestMapping(method = RequestMethod.POST, path = "/cadastrar")
    public ResponseEntity<?> registerUser(@Valid @RequestBody CadastroForm signUpRequest) {



        if (funcionarioRepository.existsByNomeUsuario(signUpRequest.getNomeUsuario())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (funcionarioRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Erro -> Email Já está em uso !"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        Funcionario user = new Funcionario();
        user.setNome(signUpRequest.getNome());
        user.setCpf(signUpRequest.getCpf());
        user.setEmail(signUpRequest.getEmail());
        user.setRg(signUpRequest.getRg());
        user.setNomeUsuario(signUpRequest.getNomeUsuario());
        user.setSenhaConfirm(signUpRequest.getSenhaConfirm());
        user.setSenha(encoder.encode(signUpRequest.getSenha()));


        String strRoles = signUpRequest.getRole();

        Set<Role> roles = new HashSet<>();

        if(strRoles.equals("funcionario")) {
            Role funcionariorole =
                    roleRepository.findByNome(RoleName.ROLE_GERENTE)
                            .orElseThrow(() -> new RuntimeException("Fail! ->  Cause: Funcionario Role not find."));
            roles.add(funcionariorole);

        }else {
            Role userRole = roleRepository.findByNome(RoleName.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Fail! ->    Cause: Funcionario Role not find."));
            roles.add(userRole);

        }

        user.setRoles(roles);
        funcionarioRepository.save(user);

        return new ResponseEntity<>(new ResponseMessage("Funcionario Cadastrado com sucesso!"), HttpStatus.OK);
    }



    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Funcionario> listAll() {
        return funcionarioRepository.findAll();
    }
}
