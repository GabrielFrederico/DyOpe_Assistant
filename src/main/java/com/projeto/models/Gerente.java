package com.projeto.models;

import java.util.HashSet;
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


	@Column(name = "cpf_gerente")
	private String cpf;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "gerente_operacoesAndamento ",
    joinColumns = @JoinColumn(name = "gerente_id"),
    inverseJoinColumns = @JoinColumn(name = "operacao_id"))
	private Set<Operacao> operacoesAndamento = new HashSet<>();
    
	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "gerente_operacoesFazer",
    joinColumns = @JoinColumn(name = "gerente_id"),
    inverseJoinColumns = @JoinColumn(name = "operacao_id"))
	private Set<Operacao> operacoesFazer = new HashSet<>();

	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "gerente_operacoesPrazo",
    joinColumns = @JoinColumn(name = "gerente_id"),
    inverseJoinColumns = @JoinColumn(name = "operacao_id"))
	private Set<Operacao> operacoesPrazo = new HashSet<>();

	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "gerente_pecas",
    joinColumns = @JoinColumn(name = "gerente_id"),
    inverseJoinColumns = @JoinColumn(name = "peca_id"))
	private Set<Peca> pecas = new HashSet<>();

	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "gerente_setores",
    joinColumns = @JoinColumn(name = "gerente_id"),
    inverseJoinColumns = @JoinColumn(name = "setor_id"))
	private Set<Setor> setores = new HashSet<>();

	public Set<Operacao> getOperacoesAndamento() {
		return operacoesAndamento;
	}

	public void setOperacoesAndamento(Set<Operacao> operacoesAndamento) {
		this.operacoesAndamento = operacoesAndamento;
	}

	public Set<Operacao> getOperacoesFazer() {
		return operacoesFazer;
	}

	public void setOperacoesFazer(Set<Operacao> operacoesFazer) {
		this.operacoesFazer = operacoesFazer;
	}

	public Set<Operacao> getOperacoesPrazo() {
		return operacoesPrazo;
	}

	public void setOperacoesPrazo(Set<Operacao> operacoesPrazo) {
		this.operacoesPrazo = operacoesPrazo;
	}

	public Set<Peca> getPecas() {
		return pecas;
	}

	public void setPecas(Set<Peca> pecas) {
		this.pecas = pecas;
	}

	public Set<Setor> getSetores() {
		return setores;
	}

	public void setSetores(Set<Setor> setores) {
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
