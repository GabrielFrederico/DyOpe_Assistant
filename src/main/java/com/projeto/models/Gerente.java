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
import javax.persistence.OneToOne;

@Entity
public class Gerente extends Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idgerente")
	private long id;

	public InfoSetor getInfosetores() {
		return infosetores;
	}

	public void setInfosetores(InfoSetor infosetores) {
		this.infosetores = infosetores;
	}

	@Column(name = "nome_gerente")
	private String nome;

	@Column(name = "rg_gerente")
	private String rg;

	@Column(name = "cpf_gerente")
	private String cpf;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "gerente_etapas_producao",
    joinColumns = @JoinColumn(name = "gerente_id"),
    inverseJoinColumns = @JoinColumn(name = "etapa_producao_id"))
	private Set<EtapaProducao> etapasproducao = new HashSet<>();

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


	public Gerente(Setor setores) {
		super();
		this.setores = Stream.of(setores).collect(Collectors.toSet());
		this.setores.forEach(x -> x.setGerente(this));
	}
	

	public Gerente() {
		super();
	}

	public Set<EtapaProducao> getEtapasProd() {
		return etapasproducao;
	}

	public void setEtapasProd(Set<EtapaProducao> etapasproducao) {
		this.etapasproducao = etapasproducao;
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
