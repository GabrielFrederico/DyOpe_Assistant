package com.projeto.models;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
public class Funcionario extends Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idfuncionario")
	private long id;

	@Column(name = "nome_funcionario")
	private String nome;

	@Column(name = "rg_funcionario")
	private String rg;

	@Column(name = "cpf_funcionario")
	private String cpf;


	public Set<InfoSetor> getInfosetor() {
		return infosetores;
	}

	public void setInfosetor(Set<InfoSetor> infosetor) {
		this.infosetores = infosetor;
	}

	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "funcionario_infosetores",
    joinColumns = @JoinColumn(name = "funcionario_id"),
    inverseJoinColumns = @JoinColumn(name = "infosetor_id"))
	private Set<InfoSetor> infosetores = new HashSet<>();
    

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

	public Set<InfoSetor> getInfosetores() {
		return infosetores;
	}

	public void setInfosetores(Set<InfoSetor> infosetores) {
		this.infosetores = infosetores;
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
	}


}
