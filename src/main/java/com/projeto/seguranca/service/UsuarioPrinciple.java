package com.projeto.seguranca.service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projeto.models.Usuario;

import io.jsonwebtoken.lang.Objects;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


public class UsuarioPrinciple implements UserDetails {
	
	private static final long serialVersionUID = 1L;
	 
	  private Long id;
	 
	    private String nomeUsuario;
	 
	    private String email;
	 
	    @JsonIgnore
	    private String senha;
	 
	    private Collection<? extends GrantedAuthority> authorities;
	    
	

		public UsuarioPrinciple(Long id, String nomeUsuario, String email, String senha,
								Collection<? extends GrantedAuthority> authorities) {
			super();
			this.id = id;
			this.nomeUsuario = nomeUsuario;
			this.email = email;
			this.senha = senha;
			this.authorities = authorities;
		}

		public static long getSerialversionuid() {
			return serialVersionUID;
		}

		public void setId(Long id) {
			this.id = id;
		}


		public void setNomeUsuario(String nomeUsuario) {
			this.nomeUsuario = nomeUsuario;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public void setSenha(String senha) {
			this.senha = senha;
		}

		public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
			this.authorities = authorities;
		}

		public static UsuarioPrinciple build(Usuario usuario) {
	        List<GrantedAuthority> authorities = usuario.getRoles().stream().map(role ->
	                new SimpleGrantedAuthority(role.getNome().name())
	        ).collect(Collectors.toList());
	 
	        return new UsuarioPrinciple(
	               usuario.getId(),
	                usuario.getNomeUsuario(),
	                usuario.getEmail(),
	                usuario.getSenha(),
	                authorities
	        );
	    }
	    
	    public Long getId() {
	        return id;
	    }
	 
	    public String getEmail() {
	        return email;
	    }
	 
	    public String getNomeUsuario() {
	        return nomeUsuario;
	    }
	 
	    public String getSenha() {
	        return senha;
	    }

	    @Override
	    public Collection<? extends GrantedAuthority> getAuthorities() {
	        return authorities;
	    }
	 
	    @Override
	    public boolean isAccountNonExpired() {
	        return true;
	    }
	 
	    @Override
	    public boolean isAccountNonLocked() {
	        return true;
	    }
	 
	    @Override
	    public boolean isCredentialsNonExpired() {
	        return true;
	    }
	 
	    @Override
	    public boolean isEnabled() {
	        return true;
	    }
	 
	    @Override
	    public boolean equals(Object o) {
	        if (this == o) return true;
	        if (o == null || getClass() != o.getClass()) return false;
	        
	        UsuarioPrinciple user = (UsuarioPrinciple) o;
	        return Objects.nullSafeEquals(id, user.id);
	    
}

		@Override
		public String getPassword() {
			// TODO Auto-generated method stub
			return senha;
		}

		@Override
		public String getUsername() {
			// TODO Auto-generated method stub
			return nomeUsuario;
		}
}