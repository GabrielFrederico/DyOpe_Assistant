package com.projeto.rest;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.Funcionario;
import com.projeto.models.Role;
import com.projeto.models.RoleName;
import com.projeto.repository.FuncionarioRepository;
import com.projeto.repository.GerenteRepository;
import com.projeto.repository.RoleRepository;
import com.projeto.repository.UsuarioRepository;
import com.projeto.seguranca.CadastroFormFuncionario;
import com.projeto.seguranca.JwtResponse;
import com.projeto.seguranca.LoginForm;
import com.projeto.seguranca.ResponseMessage;
import com.projeto.seguranca.jwt.JwtProvider;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("funcionarios")
public class FuncionarioController {

    @Autowired
    FuncionarioRepository funcionarioRepository;
    
    @Autowired
    GerenteRepository gerenteRepository;
    

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

    @RequestMapping(method = RequestMethod.POST, value = "/cadastrarfuncionario")
    public Funcionario save(@RequestBody Funcionario funcionario) {
        funcionarioRepository.save(funcionario);
        return funcionario;
    }
    
    @RequestMapping(method = RequestMethod.GET, path = "getByNomeUsuario/{nomeUsuario}")
	@PreAuthorize("hasRole('FUNCIONARIO')")
	public Funcionario getFuncionarioByNomeUsuario(@PathVariable("nomeUsuario") String nomeUsuario) {
		Funcionario funcionario = funcionarioRepository.findByNomeUsuario(nomeUsuario);
		return funcionario;
	}
    
    @RequestMapping(method = RequestMethod.GET, path = "getById/{id}")
	@PreAuthorize("hasRole('FUNCIONARIO')")
    public Funcionario getFuncionarioById(@PathVariable("id") long id) {
		Funcionario funcionario = funcionarioRepository.findById(id);
		return funcionario;
	}
    @RequestMapping(method = RequestMethod.POST, path = "/cadastrar")
    public ResponseEntity<?> registerUser(@Valid @RequestBody CadastroFormFuncionario signUpRequest) {
 

        if (usuarioRepository.existsByNomeUsuario(signUpRequest.getNomeUsuario())) {
            return new ResponseEntity<>(new ResponseMessage("Erro -> Usuário já está em uso!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (funcionarioRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Erro -> Email Já está em uso !"),
                    HttpStatus.BAD_REQUEST);
        }
        if (funcionarioRepository.existsByNome(signUpRequest.getNome())) {
            return new ResponseEntity<>(new ResponseMessage("Erro -> Nome Já está em uso !"),
                    HttpStatus.BAD_REQUEST);
        }
        if (funcionarioRepository.existsByCpf((signUpRequest.getCpf()))) {
            return new ResponseEntity<>(new ResponseMessage("Erro -> CPF Já está em uso !"),
                    HttpStatus.BAD_REQUEST);
        }
        if (funcionarioRepository.existsByRg(signUpRequest.getRg())) {
            return new ResponseEntity<>(new ResponseMessage("Erro -> RG Já está em uso !"),
                    HttpStatus.BAD_REQUEST);
        }
        if (funcionarioRepository.existsBySenha(signUpRequest.getSenha())) {
            return new ResponseEntity<>(new ResponseMessage("Erro -> Senha Já está em uso !"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        Funcionario user = new Funcionario();
        user.setNome(signUpRequest.getNome());
        user.setCpf(signUpRequest.getCpf());
        user.setEmail(signUpRequest.getEmail());
        user.setRg(signUpRequest.getRg());
        user.setNomeUsuario(signUpRequest.getNomeUsuario());
        user.setSenhaConfirm(encoder.encode(signUpRequest.getSenhaConfirm()));
        user.setSenha(encoder.encode(signUpRequest.getSenha()));


        String strRoles = signUpRequest.getRole();

        Set<Role> roles = new HashSet<>();

        if(strRoles.equals("funcionario")) {
            Role funcionariorole =
                    roleRepository.findByNome(RoleName.ROLE_FUNCIONARIO)
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


    @RequestMapping(method = RequestMethod.POST, path = "/logar")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getNomeUsuario(), loginRequest.getSenha()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
    }


    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasRole('FUNCIONARIO') or hasRole('ADMIN')")
    public Iterable<Funcionario> listAll() {
        return funcionarioRepository.findAll();
    }

    
    @RequestMapping(method = RequestMethod.DELETE, path = "deletar/{id}")
    @PreAuthorize("hasRole('FUNCIONARIO') or hasRole('ADMIN')")
    public Funcionario deleteFuncionarioById(@PathVariable("id") long id) {
        Funcionario funcionario = funcionarioRepository.findById(id);
        funcionarioRepository.delete(funcionario);
        return funcionario;
    }


    @RequestMapping(method = RequestMethod.PUT, value = "atualizar")
    @PreAuthorize("hasRole('FUNCIONARIO')")
    public Funcionario update(@RequestBody Funcionario funcionario) {
        funcionarioRepository.save(funcionario);
        return funcionario;
    }
    
    @RequestMapping(method = RequestMethod.PUT, value = "atualizarsenha")
    @PreAuthorize("hasRole('FUNCIONARIO')")
    public Funcionario update2(@RequestBody Funcionario funcionario) {
    	
    	funcionario.setSenha(encoder.encode(funcionario.getSenha()));
    	funcionario.setSenha(encoder.encode(funcionario.getSenhaConfirm()));
        funcionarioRepository.save(funcionario);
        return funcionario;
    }
    
}
