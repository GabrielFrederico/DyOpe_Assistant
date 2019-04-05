package com.projeto.models;


import javax.persistence.*;

@Entity
public class Gerente {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String nomeUsuario;
	private String senha;
	private String nome;
	private String rg;
	private String cpf;

	public Gerente() {
	}

	public Gerente(String nomeUsuario, String senha, String nome, String rg, String cpf, String email, String senhaConfirm) {
		this.nomeUsuario = nomeUsuario;
		this.senha = senha;
		this.nome = nome;
		this.rg = rg;
		this.cpf = cpf;
		this.email = email;
		this.senhaConfirm = senhaConfirm;
	}

	private String email;
	@Transient
	private String senhaConfirm;

	public String getSenhaConfirm() {
		return senhaConfirm;
	}

	public void setSenhaConfirm(String senhaConfirm) {
		this.senhaConfirm = senhaConfirm;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}


	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	
  
	
	
  


}
