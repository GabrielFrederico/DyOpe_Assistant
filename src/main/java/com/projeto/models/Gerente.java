package com.projeto.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;

@Entity
public class Gerente extends Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idgerente")
	private long id;

	@Column(name = "nome_gerente")
	private String nome;

	@Column(name = "rg_gerente")
	private String rg;
    
	private String chaveAcesso;

	public String getChaveAcesso() {
		return chaveAcesso;
	}

	public void setChaveAcesso(String chaveAcesso) {
		this.chaveAcesso = chaveAcesso;
	}

	public List<Operacao> getOperacoes() {
		return operacoes;
	}

	public void setOperacoes(List<Operacao> operacoes) {
		this.operacoes = operacoes;
	}

	@Column(name = "cpf_gerente")
	private String cpf;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "gerente_operacoesAndamento ",
    joinColumns = @JoinColumn(name = "gerente_id"),
    inverseJoinColumns = @JoinColumn(name = "operacao_id"))
	private List<Operacao> operacoesAndamento = new ArrayList<>();
    
	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "gerente_operacoesFazer",
    joinColumns = @JoinColumn(name = "gerente_id"),
    inverseJoinColumns = @JoinColumn(name = "operacao_id"))
	private List<Operacao> operacoesFazer = new ArrayList<>();
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "gerente_operacoes",
    joinColumns = @JoinColumn(name = "gerente_id"),
    inverseJoinColumns = @JoinColumn(name = "operacao_id"))
	private List<Operacao> operacoes = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "gerente_operacoesPrazo",
    joinColumns = @JoinColumn(name = "gerente_id"),
    inverseJoinColumns = @JoinColumn(name = "operacao_id"))
	private List<Operacao> operacoesPrazo = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "gerente_pecas",
    joinColumns = @JoinColumn(name = "gerente_id"),
    inverseJoinColumns = @JoinColumn(name = "peca_id"))
	private List<Peca> pecas = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "gerente_setores",
    joinColumns = @JoinColumn(name = "gerente_id"),
    inverseJoinColumns = @JoinColumn(name = "setor_id"))
	private List<Setor> setores = new ArrayList<>();

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

	public List<Peca> getPecas() {
		return pecas;
	}

	public void setPecas(List<Peca> pecas) {
		this.pecas = pecas;
	}

	public List<Setor> getSetores() {
		return setores;
	}

	public void setSetores(List<Setor> setores) {
		this.setores = setores;
	}

	public Gerente() {
		super();
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

}
