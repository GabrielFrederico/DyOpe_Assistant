package com.projeto.rest;

import com.projeto.models.Usuario;
import com.projeto.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("usuarios")
public class UsuarioController {

    @Autowired
    UsuarioRepository usuarioRepository;

    @RequestMapping(method = RequestMethod.POST, value = "/cadastrarUsuario")
    public ModelAndView save(Usuario usuario) {
        usuarioRepository.save(usuario);
        return new ModelAndView("redirect:/gerenteIndex");
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

    @RequestMapping(method = RequestMethod.GET, path = "/getByNome/{nomeUsuario}")
    public Usuario getUsuarioByNome(@PathVariable("nomeUsuario") String nomeUsuario) {
        Usuario usuario = usuarioRepository.findByNomeUsuario(nomeUsuario);
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
