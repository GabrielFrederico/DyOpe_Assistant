package com.projeto.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;

@Entity	
public class Peca {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	public String descricao;
    
	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "peca_operacoes",
    joinColumns = @JoinColumn(name = "peca_id"),
    inverseJoinColumns = @JoinColumn(name = "operacao_id"))
	private Set<Operacao> operacoes= new HashSet<>();
    
	
	public Set<Operacao> getOperacoes() {
		return operacoes;
	}

	public void setOperacoes(Set<Operacao> operacoes) {
		this.operacoes = operacoes;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	

}
 