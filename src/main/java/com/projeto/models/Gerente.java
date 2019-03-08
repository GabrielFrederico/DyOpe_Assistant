package com.projeto.models;

import javax.persistence.*;


@Entity
public class Gerente {
    
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long idusuario;
	private String nome;
	
	private String rg;
	private char statusSYS;

	public char getStatusSYS() {
		return statusSYS;
	}

	public void setStatusSYS(char statusSYS) {
		this.statusSYS = statusSYS;
	}

	private String cpf;
	
	private String email;

	public String getSenhaConfirm() {
		return senhaConfirm;
	}

	public void setSenhaConfirm(String senhaConfirm) {
		this.senhaConfirm = senhaConfirm;
	}

	@Transient
	private String senhaConfirm;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getIdusuario() {
		return idusuario;
	}

	public void setIdusuario(long idusuario) {
		this.idusuario = idusuario;
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
