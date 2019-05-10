package com.projeto.models;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.*;


@Entity
public class Gerente extends Usuario {


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	public InfoSetor getInfosetores() {
		return infosetores;
	}


	public void setInfosetores(InfoSetor infosetores) {
		this.infosetores = infosetores;
	}

	private String nome;
	private String rg;
	private String cpf;

	@OneToMany(mappedBy = "gerente", cascade = CascadeType.ALL)
    private Set<Operacao> operacoes;
	
	@OneToMany(mappedBy = "gerente", cascade = CascadeType.ALL)
    private Set<Setor> setores;
	
	@OneToOne(mappedBy = "gerenteescolhido", cascade = CascadeType.ALL)
    private InfoSetor infosetores;


	public Set<Setor> getSetores() {
		return setores;
	}


	public void setSetores(Set<Setor> setores) {
		this.setores = setores;
	}


	public Gerente(Operacao operacoes, Setor setores) {
		super();
		this.operacoes =  Stream.of(operacoes).collect(Collectors.toSet());
		this.operacoes.forEach(x -> x.setGerente(this));
		this.setores = Stream.of(setores).collect(Collectors.toSet());
		this.setores.forEach(x -> x.setGerente(this));
	}
	

	public Gerente() {
		super();
	}


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
