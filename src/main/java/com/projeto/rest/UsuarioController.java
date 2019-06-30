package com.projeto.rest;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.Gerente;
import com.projeto.models.PasswordResetToken;
import com.projeto.models.Usuario;
import com.projeto.repository.PasswordResetTokenRepository;
import com.projeto.repository.RoleRepository;
import com.projeto.repository.UsuarioRepository;
import com.projeto.seguranca.JwtResponse;
import com.projeto.seguranca.LoginForm;
import com.projeto.seguranca.ResponseMessage;
import com.projeto.seguranca.jwt.JwtProvider;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("usuarios")
public class UsuarioController {

	@Autowired
	UsuarioRepository usuarioRepository;

	@Autowired
	PasswordResetTokenRepository passwordResetTokenRepository;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtProvider jwtProvider;

	@Autowired
	JavaMailSender mailSender;

	@Autowired
	MessageSource messages;

	@Autowired
	org.springframework.core.env.Environment env;

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
	public String validatePasswordResetToken(long id, String token) {
	    PasswordResetToken passToken = 
	      passwordResetTokenRepository.findByToken(token);
	    if ((passToken == null) || (passToken.getUsuario()
	        .getId() != id)) {
	        return "invalidToken";
	    }
	 
	    Calendar cal = Calendar.getInstance();
	    if ((passToken.getExpiryDate()
	        .getTime() - cal.getTime()
	        .getTime()) <= 0) {
	        return "expired";
	    }
	 
	    Usuario user = passToken.getUsuario();
	    Authentication auth = new UsernamePasswordAuthenticationToken(
	      user, null, Arrays.asList(
	      new SimpleGrantedAuthority("CHANGE_PASSWORD_PRIVILEGE")));
	    SecurityContextHolder.getContext().setAuthentication(auth);
	    return null;
	}
	
	public void createPasswordResetTokenForUser(Usuario user, String token) {
		PasswordResetToken myToken = new PasswordResetToken(token, user);
		passwordResetTokenRepository.save(myToken);
	}

	private SimpleMailMessage constructResetTokenEmail(String contextPath, Locale locale, String token, Usuario user) {
		String url = contextPath + "/usuario/atualizarsenha?id=" + user.getId() + "&token=" + token;
		// String message = messages.getMessage("message.resetPassword", null, locale);
		String message = "Link para redefinir sua senha:";
		return constructEmail("Redefinir Senha", message, user);
	}

	private SimpleMailMessage constructEmail(String subject, String body, Usuario user) {
		SimpleMailMessage email = new SimpleMailMessage();
		email.setSubject(subject);
		email.setText(body);
		email.setTo(user.getEmail());
		email.setFrom(env.getProperty("support.email"));
		return email;
	}
	@RequestMapping(method = RequestMethod.PUT, value = "atualizarsenha")
	public ResponseEntity<?> updateSenha(@RequestBody Usuario usuario) {
		
		usuario.setSenha(encoder.encode(usuario.getSenha()));
		usuario.setSenhaConfirm(encoder.encode(usuario.getSenha()));

		usuarioRepository.save(usuario);
		return new ResponseEntity<>(new ResponseMessage("Dados Atualizados com sucesso!"), HttpStatus.OK);
	}
	@RequestMapping(method = RequestMethod.POST, path = "/enviaremailsenha")
	public ResponseEntity<?> emailRedefinirSenha(@RequestBody String email, HttpServletRequest request) {
		if (!usuarioRepository.existsByEmail(email)) {
			return new ResponseEntity<>(new ResponseMessage("Erro -> Email não registrado!"), HttpStatus.BAD_REQUEST);
		} else {
//			(getAppUrl(request), 
//		    	      request.getLocale() constructResetTokenEmail getAppUrl(request)
			Usuario user = usuarioRepository.findByEmail(email);
			String token = UUID.randomUUID().toString();
			createPasswordResetTokenForUser(user, token);
		    mailSender.send(constructResetTokenEmail(request.getContextPath(), 
		    	      request.getLocale(), token, user));
			return new ResponseEntity<>(new ResponseMessage("Email enviado com sucesso!"), HttpStatus.OK);
		}
	}

	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public Usuario deleteUsuarioById(@PathVariable("id") long id) {
		Usuario usuario = usuarioRepository.findById(id);
		usuarioRepository.delete(usuario);
		return usuario;
	}

}
