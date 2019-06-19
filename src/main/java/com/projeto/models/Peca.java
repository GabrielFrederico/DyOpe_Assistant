package com.projeto.models;

import java.util.ArrayList;
import java.util.List;
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
	private List<Operacao> operacoes = new ArrayList<>();
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "peca_operacoesAndamento ",
    joinColumns = @JoinColumn(name = "peca_id"),
    inverseJoinColumns = @JoinColumn(name = "operacao_id"))
	private List<Operacao> operacoesAndamento = new ArrayList<>();
    
	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "peca_operacoesFazer",
    joinColumns = @JoinColumn(name = "peca_id"),
    inverseJoinColumns = @JoinColumn(name = "operacao_id"))
	private List<Operacao> operacoesFazer = new ArrayList<>();
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "peca_operacoesPrazo",
    joinColumns = @JoinColumn(name = "peca_id"),
    inverseJoinColumns = @JoinColumn(name = "operacao_id"))
	private List<Operacao> operacoesPrazo = new ArrayList<>();
	
	public List<Operacao> getOperacoesAndamento() {
		return operacoesAndamento;
	}

	public void setOperacoesAndamento(List<Operacao> operacoesAndamento) {
		this.operacoesAndamento = operacoesAndamento;
	}

	public List<Operacao> getOperacoesFazer() {
		return operacoesFazer;
	}

	public void setOperacoesFazer(List<Operacao> operacoesFazer) {
		this.operacoesFazer = operacoesFazer;
	}

	public List<Operacao> getOperacoesPrazo() {
		return operacoesPrazo;
	}

	public void setOperacoesPrazo(List<Operacao> operacoesPrazo) {
		this.operacoesPrazo = operacoesPrazo;
	}

	public List<Operacao> getOperacoes() {
		return operacoes;
	}

	public void setOperacoes(List<Operacao> operacoes) {
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
