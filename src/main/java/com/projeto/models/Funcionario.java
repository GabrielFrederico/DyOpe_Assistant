package com.projeto.models;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Funcionario extends Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private String nome;

	private String rg;

	private String cpf;

	@ManyToOne(cascade = CascadeType.ALL)
    private Setor setor;
	
	public Setor getSetor() {
		return setor;
	}

	public void setSetor(Setor setor) {
		this.setor = setor;
	}

	public Set<InfoSetor> getInfosetor() {
		return infosetores;
	}

	public void setInfosetor(Set<InfoSetor> infosetor) {
		this.infosetores = infosetor;
	}

	@OneToMany(mappedBy="funcionario",cascade = CascadeType.ALL)
    private Set<InfoSetor> infosetores;
	

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

	public Funcionario() {
		super();
	}

	public Funcionario(InfoSetor infosetor) {
		super();
		this.infosetores = Stream.of(infosetor).collect(Collectors.toSet());
		this.infosetores.forEach(x -> x.setFuncionario(this));
	}


}
