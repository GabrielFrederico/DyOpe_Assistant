package com.projeto.rest;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.models.Usuario;
import com.projeto.repository.UsuarioRepository;

@RestController
@RequestMapping("usuarios")
public class UsuarioController {

    @Autowired
    UsuarioRepository usuarioRepository;

    @RequestMapping(method = RequestMethod.POST, value = "/cadastrarusuario")
    public Usuario save(@RequestBody Usuario usuario) {
        usuarioRepository.save(usuario);
        return usuario;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Usuario> listAll() {
        return usuarioRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public Usuario getUsuarioById(@PathVariable("id") long id) {
        Usuario usuario = usuarioRepository.findById(id);
        return usuario;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getByNome/{nomeusuario}")
    public Optional<Usuario> getUsuarioByNome(@PathVariable("nomeUsuario") String nomeUsuario) {
        Optional<Usuario> usuario = usuarioRepository.findByNomeUsuario(nomeUsuario);
        return usuario;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Usuario update(@RequestBody Usuario usuario) {
        usuarioRepository.save(usuario);
        return usuario;
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public Usuario deleteUsuarioById(@PathVariable("id") long id) {
        Usuario usuario = usuarioRepository.findById(id);
        usuarioRepository.delete(usuario);
        return usuario;
    }

}
